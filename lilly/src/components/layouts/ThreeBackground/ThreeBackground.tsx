import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
// import FOG from 'vanta/dist/vanta.fog.min'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FOG: any = require('vanta/dist/vanta.fog.min')

const ThreeBackground = () => {
  const myRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let vantaEffect: any = null
    if (myRef.current) {
      vantaEffect = FOG({
        el: myRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0xceffe8,
        midtoneColor: 0xffd6e3,
        lowlightColor: 0x67b2ff,
        baseColor: 0xffffff,
        blurFactor: 0.88,
        speed: 3.8,
        zoom: 0.4,
      })
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [])

  return <div ref={myRef} className="gThreeBg" />
}

export default ThreeBackground
