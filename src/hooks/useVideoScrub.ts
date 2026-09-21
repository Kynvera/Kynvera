import { useEffect, useRef } from 'react'

/* Hero film follows the cursor: absolute pointer-X → video frame, so the
 * character's head tracks the cursor position directly. The film eases
 * toward the target each frame (buttery, never snappy). When idle, it
 * drifts slowly on its own so touch users and still cursors still see
 * motion. Seeks only commit past a small epsilon and pause off-screen —
 * no per-mousemove seek spam.
 */
const IDLE_RESUME_MS = 2500
const SEEK_EPSILON = 0.02
const EASE = 0.32

export function useVideoScrub(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const targetRef = useRef(0)
  const lastMoveRef = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ready = false
    let raf = 0
    let heroVisible = true
    const observer = new IntersectionObserver(
      (entries) => { heroVisible = entries[0]?.isIntersecting ?? true },
      { threshold: 0 },
    )
    observer.observe(video)

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!ready || document.hidden || !heroVisible || !video.duration) return
      if (performance.now() - lastMoveRef.current > IDLE_RESUME_MS) {
        targetRef.current += video.duration / 420
        if (targetRef.current >= video.duration) targetRef.current -= video.duration
      }
      const diff = targetRef.current - video.currentTime
      if (Math.abs(diff) > SEEK_EPSILON) {
        try {
          video.currentTime = video.currentTime + diff * EASE
        } catch {
          /* stream still buffering — retried on the next frame */
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
      lastMoveRef.current = performance.now()
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }
    if (video.readyState >= 1) markReady()

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
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', markReady)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [videoRef])
}
