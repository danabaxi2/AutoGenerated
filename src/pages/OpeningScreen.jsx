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
          width: 1440,
          height: 900,
          background: '#0126ca',
          ...GRID,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 369,
            top: 202,
            width: 702,
            height: 496,
            background: '#c7d2e6',
            boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
            opacity: leaving ? 0 : 1,
            transition: 'opacity 220ms ease',
          }}
        >
          <div style={{ position: 'absolute', left: 23, top: 25, fontFamily: inter, fontSize: 31, fontWeight: 400, color: '#0126ca' }}>
            WELCOME TO:
          </div>

          <div style={{ position: 'absolute', left: 24, top: 66 }}>
            <div style={{ fontFamily: jet, fontWeight: 500, fontSize: 67, lineHeight: '88px', color: '#000' }}>AUTOMATED</div>
            <div style={{ fontFamily: jet, fontWeight: 500, fontSize: 67, lineHeight: '88px', color: '#000' }}>IMAGINATION</div>
            <div style={{ fontFamily: jet, fontWeight: 700, fontStyle: 'italic', fontSize: 67, lineHeight: '88px', color: '#e35ae6' }}>
              ARCHIVE.
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 25,
              top: 247,
              width: 274,
              fontFamily: jet,
              fontWeight: 300,
              fontSize: 10,
              lineHeight: '16px',
              color: '#171717',
            }}
          >
            An Interactive Archive of machines, patents, and system built to automate stories, poetry, images and attention.
          </div>

          <button
            type="button"
            onClick={enter}
            style={{
              position: 'absolute',
              left: 255,
              top: 411,
              width: 192,
              height: 30,
              border: '1px solid #1f4da0',
              background: 'transparent',
              fontFamily: jet,
              fontWeight: 400,
              fontSize: 12,
              color: '#214ca2',
              letterSpacing: '0.06em',
              cursor: 'pointer',
            }}
          >
            ENTER THE ARCHIVE
          </button>

          <div
            style={{
              position: 'absolute',
              left: 200,
              top: 464,
              fontFamily: jet,
              fontWeight: 300,
              fontSize: 8,
              color: '#214ca2',
              letterSpacing: '0.02em',
            }}
          >
            DRAG THE TIMELINE / SELECT AN ARTIFACT / GENERATE OUTPUT
          </div>
        </div>
      </div>
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
