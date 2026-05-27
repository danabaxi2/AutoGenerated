import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const jet = "'JetBrains Mono', monospace"
const inter = "'Inter', sans-serif"

const GRID = {
  backgroundImage: `
    linear-gradient(to right, rgba(48,82,235,0.55) 0.5px, transparent 0.5px),
    linear-gradient(to bottom, rgba(48,82,235,0.55) 0.5px, transparent 0.5px)
  `,
  backgroundSize: '39px 39px',
}

function CenterWave() {
  const width = 1191
  const baselineY = 422
  const startX = 96
  const dots = []
  for (let x = 0; x <= width; x += 4) {
    const t = x / width
    const amplitude = Math.round(Math.abs(
      Math.sin(t * Math.PI * 3.2) * 45 +
      Math.sin(t * Math.PI * 8.7) * 20 +
      Math.sin(t * Math.PI * 15.5) * 11
    ))
    for (let y = -amplitude; y <= amplitude; y += 4) {
      dots.push({ x: startX + x, y: baselineY + y })
    }
  }
  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width={1440} height={900}>
      {dots.map((dot, index) => (
        <circle key={index} cx={dot.x} cy={dot.y} r={1.5} fill="#dbe9ff" />
      ))}
    </svg>
  )
}

function RightSidebar() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 1322,
        top: 0,
        width: 118,
        height: 900,
        background: '#d9e5fb',
        borderLeft: '1px solid #6d90f7',
      }}
    >
      <div style={{ position: 'absolute', left: 30, top: 40, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#171717' }}>
        MEANING
      </div>
      <div
        style={{
          position: 'absolute',
          left: 45,
          top: 70,
          width: 0,
          height: 0,
          borderLeft: '13.5px solid transparent',
          borderRight: '13.5px solid transparent',
          borderBottom: '15px solid #050c1f',
        }}
      />
      <div style={{ position: 'absolute', left: 56, top: 100, width: 5, height: 695, background: '#89a6cf' }} />
      <div
        style={{
          position: 'absolute',
          left: 45,
          bottom: 70,
          width: 0,
          height: 0,
          borderLeft: '13.5px solid transparent',
          borderRight: '13.5px solid transparent',
          borderTop: '15px solid #050c1f',
        }}
      />
      <div style={{ position: 'absolute', left: 39, bottom: 40, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#171717' }}>
        MONEY
      </div>
    </div>
  )
}

export default function OpeningScreen() {
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)

  const enter = () => {
    setLeaving(true)
    setTimeout(() => navigate('/timeline'), 500)
  }

  return (
    <Scene bg="#0126ca">
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1322,
          height: 900,
          background: '#0126ca',
          ...GRID,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', left: 20, top: 25, color: '#fff', zIndex: 4 }}>
          <div style={{ fontFamily: jet, fontWeight: 700, fontSize: 34, lineHeight: '38px' }}>AUTOMATED</div>
          <div style={{ fontFamily: jet, fontWeight: 700, fontSize: 34, lineHeight: '38px' }}>IMAGINATION</div>
          <div style={{ fontFamily: jet, fontWeight: 700, fontStyle: 'italic', fontSize: 34, lineHeight: '38px', color: '#8ab2ff' }}>
            ARCHIVE.
          </div>
        </div>

        <div style={{ position: 'absolute', left: 96, top: 421, width: 1191, height: 2, background: '#ffffff', zIndex: 3 }} />
        <CenterWave />

        <button
          type="button"
          onClick={enter}
          style={{
            position: 'absolute',
            left: 565,
            top: 598,
            width: 192,
            height: 30,
            border: '1px solid #ffffff',
            background: 'transparent',
            color: '#ffffff',
            cursor: 'pointer',
            fontFamily: jet,
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: '0.08em',
            zIndex: 6,
          }}
        >
          ENTER THE ARCHIVE
        </button>
      </div>
      <RightSidebar />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0126ca',
          opacity: leaving ? 1 : 0,
          transition: 'opacity 500ms ease',
          pointerEvents: 'none',
          zIndex: 8,
        }}
      />
    </Scene>
  )
}
