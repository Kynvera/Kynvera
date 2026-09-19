import { useEffect, useRef, useCallback } from 'react'

const SENSITIVITY = 0.8
const MIN_SEEK_DELTA = 0.3

export function useVideoScrub(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const targetTimeRef = useRef(0)
  const rafRef = useRef(0)
  const readyRef = useRef(false)

  const seekToTarget = useCallback(() => {
    const video = videoRef.current
    if (!video || !readyRef.current || document.hidden) return
    if (Math.abs(video.currentTime - targetTimeRef.current) < MIN_SEEK_DELTA) return
    try {
      video.currentTime = targetTimeRef.current
    } catch {
      /* seeking while the stream is still buffering — the next frame retries */
    }
  }, [videoRef])

  const scheduleSeek = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(seekToTarget)
  }, [seekToTarget])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const markReady = () => {
      readyRef.current = true
      targetTimeRef.current = video.currentTime || 0
    }
    if (video.readyState >= 1) markReady()

    const handleMouseMove = (event: MouseEvent) => {
      if (!readyRef.current || !video.duration || document.hidden) return
      const timeOffset = (event.movementX / window.innerWidth) * SENSITIVITY * video.duration
      if (Math.abs(timeOffset) < 0.001) return
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset))
      scheduleSeek()
    }

    video.addEventListener('loadedmetadata', markReady)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadedmetadata', markReady)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [videoRef, scheduleSeek])
}
