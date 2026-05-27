import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const base = import.meta.env.BASE_URL
const jet = "'JetBrains Mono', monospace"
const inter = "'Inter', sans-serif"

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

const CATEGORIES = [
  { label: 'NARRATIVE AUTOMATION', count: '1,246' },
  { label: 'CHARACTER SYSTEMS', count: '893' },
  { label: 'COMPUTER POETRY', count: '612' },
  { label: 'CORPORATE LANGUAGE', count: '1,305' },
  { label: 'IMAGE SYNTHESIS', count: '2,317' },
  { label: 'ENGAGEMENT BAIT', count: '1,542' },
  { label: 'SLOP ECONOMY', count: '973' },
  { label: 'SYNTHETIC MEMORY', count: '842' },
]

const ARTIFACTS = [
  { title: 'THE PLOT GENIE', year: '1930', x: 41, y: 273, img: 'timeline_img1.png', route: '/plot-genie' },
  { title: 'THE AUTO-BEATNIK', year: '1962', x: 343, y: 439, img: 'timeline_img2.png', route: null },
  { title: 'RECTAR THE POLICEMAN BEARD', year: '1984', x: 493, y: 245, img: 'timeline_img3.png', route: null },
  { title: 'SYNTHETIC IMAGE MODEL', year: '2024', x: 886, y: 179, img: 'timeline_img4.png', route: null },
]

// 62 ticks from x=306 to x=1252 (absolute), mapped relative to main area (left=237)
const TICK_START = 306 - 237  // = 69
const TICK_END   = 1252 - 237 // = 1015
const TICK_COUNT = 62
const TICK_SPACING = (TICK_END - TICK_START) / (TICK_COUNT - 1)

export default function TimelineScreen() {
  const navigate = useNavigate()

  return (
    <Scene bg="#060d22">
      {/* Left sidebar */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 237, height: 900, background: '#060d22' }}>
        {/* Title */}
        <div style={{
          position: 'absolute', left: 20, top: 26,
          fontFamily: jet, fontWeight: 400, fontSize: 28, lineHeight: '36px', color: '#fff',
          whiteSpace: 'pre',
        }}>
          {'AUTOMATED\nIMAGINATION\n'}
          <span style={{ fontWeight: 700, fontStyle: 'italic', color: '#2663f2' }}>ARCHIVE.</span>
        </div>

        {/* Category list */}
        <div style={{ position: 'absolute', left: 20, top: 160, width: 197 }}>
          {CATEGORIES.map((cat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 18, cursor: 'pointer' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2663f2', flexShrink: 0, marginRight: 8 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: jet, fontWeight: 300, fontSize: 9, color: '#fff', lineHeight: '13px', letterSpacing: '0.04em' }}>
                  {cat.label}
                </div>
                <div style={{ fontFamily: jet, fontWeight: 300, fontSize: 8, color: 'rgba(255,255,255,0.5)', lineHeight: '12px' }}>
                  {cat.count}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Session ID */}
        <div style={{
          position: 'absolute', left: 20, top: 875,
          fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#fff', letterSpacing: '0.05em',
        }}>
          SESSION ID 207-32-31508
        </div>
      </div>

      {/* Main blue panel */}
      <div style={{ position: 'absolute', left: 237, top: 0, width: 1085, height: 743, background: '#0126ca', overflow: 'hidden' }}>
        <DotGrid width={1085} height={743} />

        {/* Artifact nodes */}
        {ARTIFACTS.map((art, i) => (
          <div
            key={i}
            onClick={() => art.route && navigate(art.route)}
            style={{
              position: 'absolute',
              left: art.x,
              top: art.y,
              cursor: art.route ? 'pointer' : 'default',
            }}
          >
            {/* Thumbnail */}
            <img
              src={`${base}images/${art.img}`}
              alt={art.title}
              style={{ width: 72, height: 72, display: 'block', objectFit: 'cover' }}
            />
            {/* Label below */}
            <div style={{
              marginTop: 6,
              fontFamily: jet, fontWeight: 300, fontSize: 9, color: '#fff',
              lineHeight: '13px', letterSpacing: '0.04em', maxWidth: 100,
            }}>
              {art.title}
            </div>
            <div style={{
              fontFamily: jet, fontWeight: 300, fontSize: 8,
              color: 'rgba(255,255,255,0.6)', lineHeight: '12px',
            }}>
              {art.year}
            </div>
          </div>
        ))}
      </div>

      {/* Right panel */}
      <div style={{ position: 'absolute', left: 1322, top: 0, width: 118, height: 743, background: '#c2d9fb' }} />

      {/* Bottom panel */}
      <div style={{ position: 'absolute', left: 237, top: 743, width: 1085, height: 157, background: '#dae9ff' }}>
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

        {/* Timeline ruler bars */}
        <div style={{ position: 'absolute', left: 69, top: 83, width: 311, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 380, top: 83, width: 326, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 706, top: 83, width: 310, height: 7, background: '#759cf4' }} />

        {/* 62 timeline ticks */}
        {Array.from({ length: TICK_COUNT }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: Math.round(TICK_START + i * TICK_SPACING),
              top: 75,
              width: 1,
              height: 23,
              background: '#0126ca',
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Bottom-right dark panel */}
      <div style={{ position: 'absolute', left: 1322, top: 743, width: 118, height: 157, background: '#060d22' }} />
    </Scene>
  )
}
