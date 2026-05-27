import { useMemo } from 'react'
import Scene from '../components/Scene'

const jet = "'JetBrains Mono', monospace"
const inter = "'Inter', sans-serif"

const GRID = {
  backgroundImage: `
    linear-gradient(to right, #3052eb 0.5px, transparent 0.5px),
    linear-gradient(to bottom, #3052eb 0.5px, transparent 0.5px)
  `,
  backgroundSize: '39px 39px',
}

function Waveform() {
  const width = 1191
  const baselineY = 422
  const startX = 96
  const spacing = 3

  const circles = useMemo(() => {
    const out = []
    for (let xi = 0; xi <= width; xi += spacing) {
      const t = xi / width
      const centerRightBurst = Math.exp(-Math.pow((t - 0.78) / 0.12, 2)) * 120
      const midEnvelope = Math.exp(-Math.pow((t - 0.53) / 0.24, 2)) * 58
      const detail =
        Math.sin(t * Math.PI * 8.3) * 12 +
        Math.sin(t * Math.PI * 17.9) * 8 +
        Math.sin(t * Math.PI * 31.5) * 5
      const amp = Math.max(8, Math.round(centerRightBurst + midEnvelope + Math.abs(detail)))

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

function NodeCard({ connectorX, dotY, cardX, cardY, text }) {
  const isBelow = cardY > 422
  const imageY = isBelow ? cardY + 65 : cardY - 88

  return (
    <>
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width={1440} height={900}>
        <line x1={connectorX} y1={422} x2={connectorX} y2={dotY} stroke="#dae9ff" strokeWidth={2} />
        <circle cx={connectorX} cy={dotY} r={8} fill="none" stroke="#dae9ff" strokeWidth={2} />
        <circle cx={connectorX} cy={422} r={5} fill="#dae9ff" />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: cardX,
          top: cardY,
          width: 164,
          minHeight: 55,
          border: '1px solid rgba(218,233,255,0.7)',
          background: 'rgba(8,28,87,0.46)',
          color: '#ffffff',
          fontFamily: jet,
          fontWeight: 600,
          fontSize: 10,
          lineHeight: '16px',
          padding: '4px 8px',
          letterSpacing: '0.02em',
          whiteSpace: 'pre-line',
        }}
      >
        {text}
      </div>

      <div
        style={{
          position: 'absolute',
          left: connectorX - 36,
          top: imageY,
          width: 72,
          height: 72,
          borderRadius: '50%',
          border: '1px solid rgba(218,233,255,0.9)',
          background: '#022099',
        }}
      />
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
          <div style={{ fontFamily: jet, fontWeight: 700, fontSize: 34, lineHeight: '38px', color: '#fff' }}>AUTOMATED</div>
          <div style={{ fontFamily: jet, fontWeight: 700, fontSize: 34, lineHeight: '38px', color: '#fff' }}>IMAGINATION</div>
          <div style={{ fontFamily: jet, fontWeight: 700, fontStyle: 'italic', fontSize: 34, lineHeight: '38px', color: '#8ab2ff' }}>ARCHIVE.</div>
        </div>

        <div style={{ position: 'absolute', left: 96, top: 421, width: 1191, height: 2, background: '#ffffff', zIndex: 2 }} />
        <Waveform />

        <NodeCard connectorX={269} dotY={427} cardX={224} cardY={483} text={'THE PLOT GENIE\n1930'} />
        <NodeCard connectorX={570} dotY={444} cardX={527} cardY={483} text={'THE AUTO-\nBEATNIK\n1962'} />
        <NodeCard connectorX={750} dotY={427} cardX={676} cardY={289} text={'RECTAR THE\nPOLICEMAN BEARD\n1974'} />
        <NodeCard connectorX={1125} dotY={439} cardX={1069} cardY={223} text={'SYNTHETIC\nIMAGE MODEL\n2026'} />
      </div>
      <RightSidebar />
    </Scene>
  )
}
