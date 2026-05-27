import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const base = import.meta.env.BASE_URL
const jet = "'JetBrains Mono', monospace"
const inter = "'Inter', sans-serif"

const GRID_STYLE = {
  backgroundImage: `
    linear-gradient(to right, #3052eb 0.5px, transparent 0.5px),
    linear-gradient(to bottom, #3052eb 0.5px, transparent 0.5px)
  `,
  backgroundSize: '39px 39px',
}

const CATEGORIES = [
  { label: 'NARRATIVE AUTOMATION', count: '1,246', y: 216 },
  { label: 'CHARACTER SYSTEMS', count: '893', y: 284 },
  { label: 'COMPUTER POETRY', count: '612', y: 352 },
  { label: 'CORPORATE LANGUAGE', count: '1,305', y: 420 },
  { label: 'IMAGE SYNTHESIS', count: '2,317', y: 488 },
  { label: 'ENGAGEMENT BAIT', count: '1,542', y: 556 },
  { label: 'SLOP ECONOMY', count: '973', y: 624 },
  { label: 'SYNTHETIC MEMORY', count: '842', y: 692 },
]
const DIVIDERS = [199, 267, 335, 403, 471, 539, 607, 675, 743]
const TICKS = Array.from({ length: 62 }, (_, i) => Math.round(307 + i * (945 / 61)))

// Dot-matrix acoustic waveform — Group 5 in Figma: x=238–1321, centered at y=382
function Waveform() {
  const W = 1083
  const CY = 85   // 382 - 297 = 85 within the group (group top = y=297)
  const DOT_R = 1.5
  const SPACING = 4

  const dots = useMemo(() => {
    const out = []
    for (let xi = 0; xi <= W; xi += SPACING) {
      const t = xi / W
      const raw =
        Math.sin(t * Math.PI * 3.2) * 44 +
        Math.sin(t * Math.PI * 9.1) * 20 +
        Math.sin(t * Math.PI * 17.3) * 11 +
        Math.sin(t * Math.PI * 1.5) * 32 +
        Math.sin(t * Math.PI * 26) * 6
      const amp = Math.round(Math.abs(raw))
      for (let dy = -amp; dy <= amp; dy += SPACING) {
        out.push(`${xi},${CY + dy}`)
      }
    }
    return out
  }, [])

  return (
    // Group 5: absolute left offset = 238-237 = 1 (within blue area div)
    <svg
      style={{ position: 'absolute', left: 1, top: 297, pointerEvents: 'none' }}
      width={W} height={163}
    >
      {dots.map((pt, i) => {
        const [x, y] = pt.split(',').map(Number)
        return <circle key={i} cx={x} cy={y} r={DOT_R} fill="#dae9ff" />
      })}
    </svg>
  )
}

// NodeCard — HTML card floated near an artifact node (rendered as foreignObject)
function NodeCard({ x, y, w, h, imgSrc, title, year }) {
  return (
    <foreignObject x={x} y={y} width={w} height={h}>
      <div style={{
        width: w, height: h, boxSizing: 'border-box',
        background: 'rgba(1,38,202,0.85)',
        border: '0.5px solid rgba(218,233,255,0.35)',
        padding: '7px 8px',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        {imgSrc && (
          <img src={imgSrc} alt="" style={{
            width: 36, height: 36, display: 'block',
            filter: 'grayscale(100%) brightness(1.5) contrast(1.1)',
          }} />
        )}
        <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 9, color: '#fff', lineHeight: '13px', whiteSpace: 'pre-wrap' }}>
          {title}
        </div>
        <div style={{ fontFamily: jet, fontWeight: 300, fontSize: 8, color: 'rgba(218,233,255,0.65)' }}>
          {year}
        </div>
      </div>
    </foreignObject>
  )
}

export default function TimelineScreen() {
  const navigate = useNavigate()

  // All SVG coordinates are relative to the blue area (x - 237 from Figma absolute)
  // y coordinates are the same as Figma frame-relative y values

  return (
    <Scene bg="#060d22">

      {/* ── Left sidebar ── */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 237, height: 900, background: '#060d22', borderRight: '0.5px solid #6d90f7' }}>
        <div style={{ position: 'absolute', left: 20, top: 26, width: 193 }}>
          <div style={{ fontFamily: jet, fontWeight: 400, fontSize: 28, lineHeight: '36px', color: '#fff', whiteSpace: 'pre' }}>
            {'AUTOMATED\nIMAGINATION\n'}
            <span style={{ fontWeight: 700, fontStyle: 'italic', color: '#2663f2' }}>ARCHIVE.</span>
          </div>
          <div style={{ fontFamily: jet, fontWeight: 300, fontSize: 12, lineHeight: '17px', color: '#fff', marginTop: 3, whiteSpace: 'pre-wrap' }}>
            THE ENTIRE HISTORY OF GENERATED MEANING
          </div>
        </div>

        {DIVIDERS.map(y => (
          <div key={y} style={{ position: 'absolute', left: 29, top: y, width: 176, height: 0.5, background: '#1f326b' }} />
        ))}
        {CATEGORIES.map(cat => (
          <div key={cat.y} style={{ position: 'absolute', left: 15, top: cat.y, width: 190, display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2663f2', flexShrink: 0, marginTop: 3 }} />
            <div>
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '14px' }}>{cat.label}</div>
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 10, color: 'rgba(255,255,255,0.4)', lineHeight: '14px' }}>{cat.count}</div>
            </div>
          </div>
        ))}

        <div style={{ position: 'absolute', left: 29, top: 784, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#dae9ff' }}>
          VIEW MODE
        </div>
        <div style={{ position: 'absolute', left: 20, top: 875, fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#fff', letterSpacing: '0.05em' }}>
          SESSION ID 207-32-31508
        </div>
      </div>

      {/* ── Main blue area ── */}
      <div style={{
        position: 'absolute', left: 237, top: 0, width: 1085, height: 743,
        background: '#0126ca', ...GRID_STYLE,
        borderRight: '0.5px solid #6d90f7', overflow: 'hidden',
      }}>
        {/* Nav */}
        <div style={{
          position: 'absolute', left: 321, top: 21,
          fontFamily: inter, fontWeight: 600, fontSize: 12, color: '#cddefd', letterSpacing: '0.06em',
        }}>
          ABOUT    ·    ARCHIVE PROTOCOL    ·    SYSTEM STATUS
        </div>

        {/* Background image 17 */}
        <img
          src={`${base}images/bg_image17a.png`}
          alt=""
          style={{ position: 'absolute', left: 183, top: 150, width: 600, height: 600, pointerEvents: 'none', opacity: 0.4, mixBlendMode: 'screen' }}
        />

        {/* Dot-matrix waveform */}
        <Waveform />

        {/* Vertical era separators (extending from bottom of blue area to bottom panel) */}
        <div style={{ position: 'absolute', left: 380, top: 762, width: 0.5, height: 42, background: '#b4d2ff' }} />
        <div style={{ position: 'absolute', left: 706, top: 762, width: 0.5, height: 42, background: '#b4d2ff' }} />

        {/* ── Artifact nodes (SVG) ── */}
        <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width={1085} height={743}>

          {/* NODE 1 — The Plot Genie (1930) — dot on baseline, card ABOVE */}
          {/* Dot: Figma (316,375) → SVG (79,375) */}
          {/* Line: Figma (323,258)–(323,375) → SVG (86,258)–(86,375) */}
          {/* Card: Figma (271,183) 102×142 → SVG (34,183) */}
          <line x1={86} y1={258} x2={86} y2={375} stroke="#dae9ff" strokeWidth={0.5} />
          <circle cx={79} cy={375} r={8} fill="#dae9ff" style={{ cursor: 'pointer' }} onClick={() => navigate('/plot-genie')} />
          <NodeCard
            x={34} y={183} w={102} h={135}
            imgSrc={`${base}images/timeline_img1.png`}
            title="THE PLOT GENIE"
            year="1930"
          />

          {/* NODE 2 — The Auto-Beatnik (1962) — dot on baseline, card BELOW */}
          {/* Dot: Figma (615,376) → SVG (378,376) */}
          {/* Line: Figma (624,392)–(624,503) → SVG (387,392)–(387,503) */}
          {/* Card: Figma (574,436) 102×142 → SVG (337,436) */}
          <line x1={387} y1={376} x2={387} y2={503} stroke="#dae9ff" strokeWidth={0.5} />
          <circle cx={378} cy={376} r={8} fill="#dae9ff" />
          <NodeCard
            x={337} y={436} w={102} h={135}
            imgSrc={`${base}images/timeline_img2.png`}
            title="THE AUTO-BEATNIK"
            year="1962"
          />

          {/* NODE 3 — Rectar The Policeman Beard (1974) — large circle above baseline */}
          {/* Circle: Figma (767,155) 76×76 → SVG cx=568, cy=193, r=38 */}
          {/* Dot: Figma (797,375) → SVG (560,375) */}
          {/* Line from circle edge to dot */}
          {/* Text: Figma (730,245) → SVG (493,245) */}
          <line x1={568} y1={231} x2={560} y2={375} stroke="#dae9ff" strokeWidth={0.5} />
          <circle cx={568} cy={193} r={38} fill="#1e44ed" />
          <image
            href={`${base}images/timeline_img3.png`}
            x={530} y={155} width={76} height={76}
            style={{ mixBlendMode: 'luminosity', opacity: 0.7 }}
            clipPath="inset(0 0 0 0 round 38px)"
          />
          <circle cx={560} cy={375} r={8} fill="#dae9ff" />
          <foreignObject x={493} y={245} width={149} height={55}>
            <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '14px', whiteSpace: 'pre-wrap' }}>
              {'RECTAR THE\nPOLICEMAN BEARD'}
            </div>
            <div style={{ fontFamily: jet, fontWeight: 300, fontSize: 8, color: 'rgba(218,233,255,0.65)', marginTop: 2 }}>1974</div>
          </foreignObject>

          {/* NODE 4 — Synthetic Image Model (2026) — large circle above baseline */}
          {/* Circle: Figma (1142,89) 76×76 → SVG cx=943, cy=127, r=38 */}
          {/* Dot: Figma (1172,387) → SVG (935,387) */}
          {/* Text: Figma (1123,179) → SVG (886,179) */}
          <line x1={943} y1={165} x2={935} y2={387} stroke="#dae9ff" strokeWidth={0.5} />
          <circle cx={943} cy={127} r={38} fill="#1e44ed" />
          <image
            href={`${base}images/timeline_img4.png`}
            x={905} y={89} width={76} height={76}
            style={{ mixBlendMode: 'luminosity', opacity: 0.7 }}
            clipPath="inset(0 0 0 0 round 38px)"
          />
          <circle cx={935} cy={387} r={8} fill="#dae9ff" />
          <foreignObject x={886} y={179} width={120} height={55}>
            <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '14px', whiteSpace: 'pre-wrap' }}>
              {'SYNTHETIC\nIMAGE MODEL'}
            </div>
            <div style={{ fontFamily: jet, fontWeight: 300, fontSize: 8, color: 'rgba(218,233,255,0.65)', marginTop: 2 }}>2026</div>
          </foreignObject>

        </svg>
      </div>

      {/* ── Right panel ── */}
      <div style={{ position: 'absolute', left: 1322, top: 0, width: 118, height: 743, background: '#c2d9fb', borderLeft: '0.5px solid #6d90f7' }}>
        <div style={{ position: 'absolute', left: 28, top: 60, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#171717' }}>MEANING</div>
        <div style={{ position: 'absolute', left: 56, top: 115, width: 5, height: 510, background: '#89a6cf' }} />
        {/* Up arrow */}
        <div style={{ position: 'absolute', left: 45, top: 88, width: 0, height: 0, borderLeft: '13.5px solid transparent', borderRight: '13.5px solid transparent', borderBottom: '15px solid #050c1f' }} />
        {/* Down arrow */}
        <div style={{ position: 'absolute', left: 45, top: 639, width: 0, height: 0, borderLeft: '13.5px solid transparent', borderRight: '13.5px solid transparent', borderTop: '15px solid #050c1f' }} />
        <div style={{ position: 'absolute', left: 35, top: 670, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#171717' }}>MONEY</div>
      </div>

      {/* ── Bottom panel ── */}
      <div style={{ position: 'absolute', left: 237, top: 743, width: 1085, height: 157, background: '#dae9ff', borderTop: '0.5px solid #6d90f7' }}>
        {/* Era labels */}
        <div style={{ position: 'absolute', left: 159, top: 27, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#060d22', lineHeight: '15px', whiteSpace: 'pre' }}>
          {'INDUSTRIAL AGE\n1930 — 1959'}
        </div>
        <div style={{ position: 'absolute', left: 470, top: 27, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#060d22', lineHeight: '15px', whiteSpace: 'pre' }}>
          {'INFORMATION AGE\n1960 — 1999'}
        </div>
        <div style={{ position: 'absolute', left: 798, top: 27, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#060d22', lineHeight: '15px', whiteSpace: 'pre' }}>
          {'SYNTHETIC AGE\n2000 — 2030'}
        </div>

        {/* 1930 — 2030 date range */}
        <div style={{ position: 'absolute', left: 445, top: 132, fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#171717' }}>
          1930           —           2030
        </div>

        {/* Three ruler bars */}
        <div style={{ position: 'absolute', left: 69, top: 83, width: 311, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 380, top: 83, width: 326, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 706, top: 83, width: 310, height: 7, background: '#759cf4' }} />

        {/* 62 timeline ticks */}
        {TICKS.map((x, i) => {
          const isMajor = x === 617 || x === 943
          return (
            <div key={i} style={{
              position: 'absolute',
              left: x - 237,
              top: isMajor ? 75 : 79,
              width: 0.5,
              height: isMajor ? 16 : 8,
              background: isMajor ? '#4d77d5' : '#759cf4',
            }} />
          )
        })}

        {/* < > controls */}
        <div style={{ position: 'absolute', left: 66, top: 61, fontFamily: jet, fontWeight: 600, fontSize: 10, color: '#171717' }}>&lt;</div>
        <div style={{ position: 'absolute', left: 1013, top: 61, fontFamily: jet, fontWeight: 600, fontSize: 10, color: '#171717' }}>&gt;</div>
      </div>

      {/* ── Bottom-right dark corner ── */}
      <div style={{ position: 'absolute', left: 1322, top: 743, width: 118, height: 157, background: '#060d22' }} />

      {/* VIEW MODE toggle buttons (in left bottom area) */}
      <div style={{ position: 'absolute', left: 29, top: 802, width: 59, height: 33, background: '#081a42', border: '0.5px solid #1f326b' }} />
      <div style={{ position: 'absolute', left: 88, top: 802, width: 58, height: 33, background: '#060d22', border: '0.5px solid #1f326b' }} />
      <div style={{ position: 'absolute', left: 146, top: 802, width: 59, height: 33, background: '#060d22', border: '0.5px solid #1f326b' }} />

    </Scene>
  )
}
