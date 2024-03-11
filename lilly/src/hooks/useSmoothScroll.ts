import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Lenis from '@studio-freight/lenis'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const useSmoothScroll = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const reqIdRef = useRef<ReturnType<typeof requestAnimationFrame>>()

  useEffect(() => {
    const animate = (time: DOMHighResTimeStamp) => {
      if (lenis) {
        lenis.raf(time)
        reqIdRef.current = requestAnimationFrame(animate)
      }
    }
    reqIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current)
      }
    }
  }, [lenis])

  useIsomorphicLayoutEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })
    setLenis(lenisInstance)

    return () => {
      lenisInstance.destroy()
    }
  }, [])

  return lenis
}
