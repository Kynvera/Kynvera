import { useEffect, useRef, useCallback } from 'react'

const SENSITIVITY = 0.8

export function useVideoScrub(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const prevXRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)

  const seekToTarget = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration) return

    seekingRef.current = true
    video.currentTime = targetTimeRef.current
  }, [videoRef])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleSeeked = () => {
      seekingRef.current = false
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        seekToTarget()
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration) return

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX
        return
      }

      const delta = e.clientX - prevXRef.current
      prevXRef.current = e.clientX

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset))

      if (!seekingRef.current) {
        seekToTarget()
      }
    }

    video.addEventListener('seeked', handleSeeked)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      video.removeEventListener('seeked', handleSeeked)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [videoRef, seekToTarget])
}
