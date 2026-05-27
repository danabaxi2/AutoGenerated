import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const jet = "'JetBrains Mono', monospace"
const inter = "'Inter', sans-serif"

// 38px dot grid matching Figma #0126ca panel
function DotGrid({ width, height }) {
  const spacing = 38
  const cols = Math.ceil(width / spacing)
  const rows = Math.ceil(height / spacing)
  return (
    <svg
      style={{ position: 'absolute', left: 0, top: 0, width, height, pointerEvents: 'none' }}
      width={width}
      height={height}
    >
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * spacing + spacing / 2}
            cy={r * spacing + spacing / 2}
            r={1.5}
            fill="rgba(255,255,255,0.25)"
          />
        ))
      )}
    </svg>
  )
}

export default function OpeningScreen() {
  const navigate = useNavigate()
  const [transitioning, setTransitioning] = useState(false)

  const handleEnter = () => {
    setTransitioning(true)
    setTimeout(() => navigate('/timeline'), 500)
  }

  return (
    <Scene bg="#060d22">
      {/* Left sidebar */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 237, height: 900, background: '#060d22' }}>
        {/* Title text */}
        <div style={{
          position: 'absolute', left: 20, top: 26,
          fontFamily: jet, fontWeight: 400, fontSize: 28, lineHeight: '36px', color: '#fff',
          whiteSpace: 'pre',
        }}>
          {'AUTOMATED\nIMAGINATION\n'}
          <span style={{ fontWeight: 700, fontStyle: 'italic', color: '#2663f2' }}>ARCHIVE.</span>
        </div>

        {/* Subtitle */}
        <div style={{
          position: 'absolute', left: 20, top: 134,
          fontFamily: jet, fontWeight: 300, fontSize: 12, lineHeight: '18px', color: '#fff',
          whiteSpace: 'pre-wrap', width: 197,
        }}>
          {'A collection of tools,\nsystems, and artifacts\nthat automate the act\nof human imagination.'}
        </div>

        {/* Session ID */}
        <div style={{
          position: 'absolute', left: 20, top: 875,
          fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#fff', letterSpacing: '0.05em',
        }}>
          SESSION ID 000-00-00000
        </div>
      </div>

      {/* Main blue panel with dot grid */}
      <div style={{ position: 'absolute', left: 237, top: 0, width: 1085, height: 743, background: '#0126ca', overflow: 'hidden' }}>
        <DotGrid width={1085} height={743} />
      </div>

      {/* Right panel (light blue) */}
      <div style={{ position: 'absolute', left: 1322, top: 0, width: 118, height: 743, background: '#c2d9fb' }} />

      {/* Nav label — absolute in scene at Figma position */}
      <div style={{
        position: 'absolute', left: 558, top: 21, zIndex: 2,
        fontFamily: inter, fontWeight: 600, fontSize: 12, color: '#cddefd', letterSpacing: '0.08em',
        whiteSpace: 'nowrap', pointerEvents: 'none',
      }}>
        AUTOMATED IMAGINATION ARCHIVE
      </div>

      {/* Bottom panel (light blue) */}
      <div style={{ position: 'absolute', left: 237, top: 743, width: 1085, height: 157, background: '#dae9ff' }}>
        {/* Timeline ruler bars */}
        <div style={{ position: 'absolute', left: 69, top: 83, width: 311, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 380, top: 83, width: 326, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 706, top: 83, width: 310, height: 7, background: '#759cf4' }} />

        {/* Era labels */}
        <div style={{ position: 'absolute', left: 159, top: 27, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#060d22' }}>
          INDUSTRIAL AGE 1930–1959
        </div>
        <div style={{ position: 'absolute', left: 470, top: 27, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#060d22' }}>
          INFORMATION AGE 1960–1999
        </div>
        <div style={{ position: 'absolute', left: 798, top: 27, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#060d22' }}>
          SYNTHETIC AGE 2000–2030
        </div>
      </div>

      {/* Bottom-right dark panel */}
      <div style={{ position: 'absolute', left: 1322, top: 743, width: 118, height: 157, background: '#060d22' }} />

      {/* Dark overlay (opacity 0.8 over full frame) */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 1440, height: 900,
        background: '#060d22',
        opacity: transitioning ? 1 : 0.8,
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: 'none',
        zIndex: 5,
      }} />

      {/* Dialog box */}
      <div style={{
        position: 'absolute', left: 491, top: 288, width: 458, height: 324,
        background: '#dae9ff',
        zIndex: 10,
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
      }}>
        {/* Dialog title */}
        <div style={{
          position: 'absolute', left: 24, top: 24,
          fontFamily: jet, fontWeight: 400, fontSize: 22, lineHeight: '30px', color: '#000',
        }}>
          AUTOMATED<br />IMAGINATION<br />ARCHIVE.
        </div>

        {/* Dialog body */}
        <div style={{
          position: 'absolute', left: 24, top: 138,
          fontFamily: jet, fontWeight: 300, fontSize: 10, lineHeight: '16px', color: '#000',
          width: 410, whiteSpace: 'pre-wrap',
        }}>
          {'A digital archive documenting the history of tools, systems, and artifacts that automate the act of human imagination — from mechanical plot generators to neural image synthesis.'}
        </div>

        {/* ENTER THE ARCHIVE button */}
        <div
          onClick={handleEnter}
          style={{
            position: 'absolute', left: 133, top: 270, width: 192, height: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #0024c8',
            cursor: 'pointer',
            transition: 'background 0.15s ease-out',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,36,200,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontFamily: jet, fontWeight: 400, fontSize: 12, color: '#0024c8', letterSpacing: '0.1em' }}>
            ENTER THE ARCHIVE
          </span>
        </div>
      </div>
    </Scene>
  )
}
