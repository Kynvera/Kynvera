import { useEffect } from 'react'

/* Smooth cursor-follow for the hero background.
 *
 * Lerps a normalized cursor position (0..1) toward the pointer and exposes
 * it as `--mx` / `--my` CSS vars on <html>. CSS then drives the video
 * parallax + a soft gold glow — no React re-renders, rAF only runs while
 * the cursor is settling, and touch / reduced-motion users are skipped.
 */
const LERP = 0.075
const STOP_EPS = 0.0004

export function useHeroCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    let targetX = 0.5
    let targetY = 0.42
    let currentX = 0.5
    let currentY = 0.42
    let raf = 0
    let queued = false

    const tick = () => {
      queued = false
      currentX += (targetX - currentX) * LERP
      currentY += (targetY - currentY) * LERP
      root.style.setProperty('--mx', currentX.toFixed(4))
      root.style.setProperty('--my', currentY.toFixed(4))
      if (Math.abs(targetX - currentX) > STOP_EPS || Math.abs(targetY - currentY) > STOP_EPS) {
        raf = requestAnimationFrame(tick)
        queued = true
      }
    }

    const kick = () => {
      if (!queued && !document.hidden) {
        raf = requestAnimationFrame(tick)
        queued = true
      }
    }

    const onMove = (event: MouseEvent) => {
      targetX = Math.min(1, Math.max(0, event.clientX / window.innerWidth))
      targetY = Math.min(1, Math.max(0, event.clientY / window.innerHeight))
      kick()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
}
