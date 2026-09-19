import { useEffect, useRef } from 'react'

/* Hero film follows the cursor: absolute pointer-X → video time.
   When idle, the film drifts slowly on its own so touch users and
   still cursors still see motion. Playback never runs free — the
   cursor (or the drift) owns currentTime at all times. */
const IDLE_RESUME_MS = 2500
const SEEK_EPSILON = 0.04

export function useVideoScrub(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const targetRef = useRef(0)
  const smoothRef = useRef(0)
  const lastMoveRef = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let ready = false
    let raf = 0

    const tick = () => {
      if (ready && !document.hidden && video.duration) {
        if (performance.now() - lastMoveRef.current > IDLE_RESUME_MS) {
          targetRef.current += video.duration / 1200
          if (targetRef.current >= video.duration) {
            targetRef.current = 0
            smoothRef.current = 0
          }
        }
        // Critically-damped follow: ease the displayed time toward the
        // target so seeks stay small, sparse, and decoder-friendly.
        smoothRef.current += (targetRef.current - smoothRef.current) * 0.14
        if (Math.abs(smoothRef.current - targetRef.current) < SEEK_EPSILON) {
          smoothRef.current = targetRef.current
        } else if (Math.abs(video.currentTime - smoothRef.current) > SEEK_EPSILON) {
          try {
            video.currentTime = smoothRef.current
          } catch {
            /* stream still buffering — retried on the next frame */
          }
        }
      }
      raf = requestAnimationFrame(tick)
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
      raf = requestAnimationFrame(tick)
    }
    if (video.readyState >= 1) markReady()

    const pointTo = (clientX: number) => {
      if (!ready || !video.duration) return
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
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', markReady)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [videoRef])
}
