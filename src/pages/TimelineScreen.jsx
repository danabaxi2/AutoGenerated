import { useMemo } from 'react'
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

function Waveform() {
  const width = 1191
  const baselineY = 422
  const startX = 96
  const spacing = 4

  const circles = useMemo(() => {
    const out = []
    for (let xi = 0; xi <= width; xi += spacing) {
      const t = xi / width
      const amp = Math.round(Math.abs(
        Math.sin(t * Math.PI * 3.2) * 45 +
        Math.sin(t * Math.PI * 8.7) * 20 +
        Math.sin(t * Math.PI * 15.5) * 11
      ))
      for (let dy = -amp; dy <= amp; dy += spacing) {
        out.push([startX + xi, baselineY + dy])
      }
    }
    return out
  }, [])

  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width={1440} height={900}>
      {circles.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.5} fill="#dae9ff" />
      ))}
    </svg>
  )
}

function Node({ x, y, label }) {
  return (
    <>
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width={1440} height={900}>
        <line x1={x} y1={422} x2={x} y2={y} stroke="#dae9ff" strokeWidth={2} />
        <circle cx={x} cy={422} r={5} fill="#dae9ff" />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: x - 36,
          top: y - 36,
          width: 72,
          height: 72,
          borderRadius: '50%',
          border: '1px solid rgba(218,233,255,0.8)',
          background: '#0b2a8f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#dbe9ff',
          fontFamily: inter,
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </div>
    </>
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

export default function TimelineScreen() {
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
        <div style={{ position: 'absolute', left: 20, top: 25 }}>
          <div style={{ fontFamily: jet, fontWeight: 700, fontSize: 34, lineHeight: '38px', color: '#fff' }}>
            AUTOMATED
          </div>
          <div style={{ fontFamily: jet, fontWeight: 700, fontSize: 34, lineHeight: '38px', color: '#fff' }}>
            IMAGINATION
          </div>
          <div style={{ fontFamily: jet, fontWeight: 700, fontStyle: 'italic', fontSize: 34, lineHeight: '38px', color: '#8ab2ff' }}>
            ARCHIVE.
          </div>
        </div>

        <div style={{ position: 'absolute', left: 96, top: 421, width: 1191, height: 2, background: '#ffffff', zIndex: 2 }} />
        <Waveform />

        <Node x={269} y={570} label="Node 1" />
        <Node x={570} y={622} label="Node 2" />
        <Node x={750} y={274} label="Node 3" />
        <Node x={1125} y={208} label="Node 4" />
      </div>
      <RightSidebar />
    </Scene>
  )
}
