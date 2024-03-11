declare module '@studio-freight/lenis' {
  interface LenisOptions {
    duration?: number
    easing?: (t: number) => number
    direction?: 'vertical' | 'horizontal'
    gestureDirection?: 'vertical' | 'horizontal'
    smooth?: boolean
    smoothTouch?: boolean
    touchMultiplier?: number
  }

  export default class Lenis {
    constructor(options?: LenisOptions)
    raf(time: DOMHighResTimeStamp): void
    destroy(): void
  }
}
