import { useEffect, useRef } from 'react'

/* Hero film follows the cursor: absolute pointer-X → video frame, so the
 * character's head tracks the cursor position directly.
 *
 * Performance design (the lag fix):
 * - A virtual `smooth` position eases toward the target every frame — this
 *   is pure math, no DOM/video work.
 * - Real `currentTime` seeks commit at most every COMMIT_MS and only past
 *   COMMIT_EPSILON, and never while a previous seek is still decoding.
 *   A video seek = network + decode + full-screen repaint, so ~8 seeks/s
 *   during motion and ~1 seek/s idle is the whole budget.
 * - Idle drift sweeps the full film over ~150s (was ~7s: the page could
 *   never rest, seeking 60x/sec with zero mouse input).
 * - Everything pauses off-screen, when the tab hides, or for
 *   reduced-motion users.
 */
const IDLE_RESUME_MS = 2500
const DRIFT_SWEEP_SECONDS = 150
const EASE = 0.3
const COMMIT_MS = 120
const COMMIT_EPSILON = 0.06

export function useVideoScrub(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const targetRef = useRef(0)
  const smoothRef = useRef(0)
  const lastMoveRef = useRef(0)
  const lastSeekRef = useRef(0)
  const seekingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ready = false
    let raf = 0
    let lastFrame = performance.now()
    let heroVisible = true
    const observer = new IntersectionObserver(
      (entries) => { heroVisible = entries[0]?.isIntersecting ?? true },
      { threshold: 0 },
    )
    observer.observe(video)

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!ready || document.hidden || !heroVisible || !video.duration) return

      // Slow idle drift keeps the character alive with no input.
      if (now - lastMoveRef.current > IDLE_RESUME_MS) {
        const dt = Math.min((now - lastFrame) / 1000, 0.1)
        targetRef.current += (video.duration / DRIFT_SWEEP_SECONDS) * dt
        if (targetRef.current >= video.duration) targetRef.current -= video.duration
      }
      lastFrame = now

      // Cheap virtual easing — no video work here.
      const gap = targetRef.current - smoothRef.current
      if (Math.abs(gap) > 0.0005) smoothRef.current += gap * EASE

      // Commit a real seek only when due, needed, and the decoder is free.
      if (
        !seekingRef.current &&
        now - lastSeekRef.current > COMMIT_MS &&
        Math.abs(video.currentTime - smoothRef.current) > COMMIT_EPSILON
      ) {
        lastSeekRef.current = now
        try {
          video.currentTime = smoothRef.current
        } catch {
          /* stream still buffering — retried on the next window */
        }
      }
    }

    const markReady = () => {
      if (ready) return
      ready = true
      try {
        video.pause()
      } catch {
        /* already paused */
      }
      targetRef.current = video.currentTime || 0
      smoothRef.current = targetRef.current
      lastMoveRef.current = performance.now()
      lastFrame = lastMoveRef.current
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }
    if (video.readyState >= 1) markReady()

    const onSeeking = () => { seekingRef.current = true }
    const onSeeked = () => { seekingRef.current = false }

    const pointTo = (clientX: number) => {
      if (!ready || !video.duration || Number.isNaN(video.duration)) return
      lastMoveRef.current = performance.now()
      targetRef.current = Math.max(0, Math.min(video.duration, (clientX / window.innerWidth) * video.duration))
    }
    const onMouseMove = (event: MouseEvent) => pointTo(event.clientX)
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) pointTo(touch.clientX)
    }

    video.addEventListener('loadedmetadata', markReady)
    video.addEventListener('seeking', onSeeking)
    video.addEventListener('seeked', onSeeked)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', markReady)
      video.removeEventListener('seeking', onSeeking)
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [videoRef])
}
