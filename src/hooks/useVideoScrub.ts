import { useEffect, useRef, useCallback } from 'react'

const SENSITIVITY = 0.35
// Only commit a seek when the accumulated target drifted this far (seconds).
// Prevents a `currentTime` assignment on every mousemove, which was the
// main source of jank (network seeks + decode on a remote mp4).
const SEEK_THRESHOLD = 0.18

export function useVideoScrub(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const prevXRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)
  const rafRef = useRef(0)
  const pendingRef = useRef(false)

  const seekToTarget = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration || Number.isNaN(video.duration)) return
    // Don't fight the browser while hidden or while the hero is off-screen.
    if (document.hidden) { pendingRef.current = false; return }

    const drift = Math.abs(video.currentTime - targetTimeRef.current)
    if (drift < SEEK_THRESHOLD) { pendingRef.current = false; return }

    seekingRef.current = true
    pendingRef.current = false
    try {
      // fastSeek avoids keyframe-accurate (slow) seeks where supported.
      const seekable = video as HTMLVideoElement & { fastSeek?: (t: number) => void }
      if (typeof seekable.fastSeek === 'function') seekable.fastSeek(targetTimeRef.current)
      else video.currentTime = targetTimeRef.current
    } catch {
      seekingRef.current = false
    }
  }, [videoRef])

  const scheduleSeek = useCallback(() => {
    if (pendingRef.current) return
    pendingRef.current = true
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(seekToTarget)
  }, [seekToTarget])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Skip the effect entirely on touch devices / reduced motion —
    // scrub is a mouse-driven enhancement, not core content.
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarsePointer || reducedMotion) return

    let heroVisible = true
    const observer = new IntersectionObserver(
      (entries) => { heroVisible = entries[0]?.isIntersecting ?? true },
      { threshold: 0 },
    )
    observer.observe(video)

    const handleSeeked = () => {
      seekingRef.current = false
      if (Math.abs(video.currentTime - targetTimeRef.current) > SEEK_THRESHOLD) {
        scheduleSeek()
      }
    }

    let lastMove = 0
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle to ~1 sample per frame and ignore scrub while hero is off-screen.
      const now = performance.now()
      if (now - lastMove < 32 || !heroVisible || document.hidden) {
        prevXRef.current = e.clientX
        return
      }
      lastMove = now
      if (!video.duration || Number.isNaN(video.duration)) return

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX
        // Lazily initialise the target to the middle so the first
        // movement doesn't jump from 0.
        if (targetTimeRef.current === 0 && video.duration > 0) {
          targetTimeRef.current = Math.min(video.duration / 2, video.currentTime || video.duration / 2)
        }
        return
      }

      const delta = e.clientX - prevXRef.current
      prevXRef.current = e.clientX
      if (delta === 0 || seekingRef.current) return

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset))
      scheduleSeek()
    }

    const handleLeave = () => { prevXRef.current = null }

    video.addEventListener('seeked', handleSeeked)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('seeked', handleSeeked)
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [videoRef, seekToTarget, scheduleSeek])
}
