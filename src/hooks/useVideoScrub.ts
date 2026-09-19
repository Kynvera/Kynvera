import { useEffect, useRef } from 'react'

/* Hero film flows on its own and yields to the cursor: moving the pointer
   grabs the film (pauses + eases to the pointer-X time); releasing it for
   a beat hands playback back. Touch-drag grabs the same way. */
const GRAB_MS = 1200
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

    const resume = () => {
      targetRef.current = video.currentTime || 0
      smoothRef.current = targetRef.current
      if (video.paused) {
        const attempt = video.play()
        if (attempt) attempt.catch(() => undefined)
      }
    }

    const tick = () => {
      if (ready && !document.hidden && video.duration) {
        if (performance.now() - lastMoveRef.current > GRAB_MS) {
          // Hands off: flow freely and track live time so the next grab
          // starts exactly where the film is.
          resume()
        } else {
          // Grabbed: hold still and ease toward the pointer's frame.
          if (!video.paused) {
            try {
              video.pause()
            } catch {
              /* already paused */
            }
          }
          smoothRef.current += (targetRef.current - smoothRef.current) * 0.16
          if (Math.abs(smoothRef.current - targetRef.current) < SEEK_EPSILON) {
            smoothRef.current = targetRef.current
          }
          if (Math.abs(video.currentTime - smoothRef.current) > SEEK_EPSILON) {
            try {
              video.currentTime = smoothRef.current
            } catch {
              /* stream still buffering — retried on the next frame */
            }
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const markReady = () => {
      if (ready) return
      ready = true
      targetRef.current = video.currentTime || 0
      smoothRef.current = targetRef.current
      lastMoveRef.current = 0
      const attempt = video.play()
      if (attempt) attempt.catch(() => undefined)
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
