import { useEffect, useRef, useState } from 'react'

const W = 1440
const H = 900

export default function Scene({ children, bg = '#000' }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const calc = () => {
      const s = Math.min(window.innerWidth / W, window.innerHeight / H)
      setScale(s)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#000',
      overflow: 'hidden',
    }}>
      <div style={{
        width: W,
        height: H,
        position: 'relative',
        background: bg,
        transformOrigin: 'center center',
        transform: `scale(${scale})`,
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {children}
      </div>
    </div>
  )
}
