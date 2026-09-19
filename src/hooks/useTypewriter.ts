import { useState, useEffect, useRef } from 'react'

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    let interval: ReturnType<typeof setInterval> | undefined
    const delayTimer = setTimeout(() => {
      interval = setInterval(() => {
        indexRef.current += 1
        if (indexRef.current >= text.length) {
          setDisplayed(text)
          setDone(true)
          clearInterval(interval)
        } else {
          setDisplayed(text.slice(0, indexRef.current))
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => {
      clearTimeout(delayTimer)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}
