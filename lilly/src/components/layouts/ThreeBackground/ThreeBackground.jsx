import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import FOG from 'vanta/dist/vanta.fog.min'

function ThreeBackground() {
  const myRef = useRef(null)

  useEffect(() => {
    let vantaEffect = null
    if (myRef.current !== null) {
      // 明示的なnullチェック
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
      if (vantaEffect !== null) {
        vantaEffect.destroy()
      }
    }
  }, [])

  return <div ref={myRef} className="gThreeBg" />
}

export default ThreeBackground
