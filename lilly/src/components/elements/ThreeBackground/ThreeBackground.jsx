import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import FOG from 'vanta/dist/vanta.fog.min'

function ThreeBackground() {
  const myRef = useRef()

  useEffect(() => {
    let vantaEffect = null // nullで初期化
    if (myRef.current !== null) {
      // nullの場合のチェックを追加
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
        // nullの場合のチェックを追加
        vantaEffect.destroy()
      }
    }
  }, [myRef.current]) // 依存配列にmyRef.currentを追加

  return (
    <div
      ref={myRef}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  )
}

export default ThreeBackground
