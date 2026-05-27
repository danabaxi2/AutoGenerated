import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const base = import.meta.env.BASE_URL
const jet = "'JetBrains Mono', monospace"
const inter = "'Inter', sans-serif"

const GRID = {
  backgroundImage: `
    linear-gradient(to right, rgba(48,82,235,0.55) 0.5px, transparent 0.5px),
    linear-gradient(to bottom, rgba(48,82,235,0.55) 0.5px, transparent 0.5px)
  `,
  backgroundSize: '39px 39px',
}

// DOTS TIMELINE FRAME: x=96, y=341, w=1191, h=163. Baseline at y=81 within frame (y=422 absolute).
function Waveform() {
  const W = 1191
  const H = 163
  const CY = 81  // center within frame = baseline
  const SPACING = 4

  const circles = useMemo(() => {
    const out = []
    for (let xi = 0; xi <= W; xi += SPACING) {
      const t = xi / W
      const amp = Math.round(Math.abs(
        Math.sin(t * Math.PI * 3.4) * 46 +
        Math.sin(t * Math.PI * 9.7) * 22 +
        Math.sin(t * Math.PI * 17.1) * 12 +
        Math.sin(t * Math.PI * 1.6) * 34 +
        Math.sin(t * Math.PI * 27) * 7
      ))
      for (let dy = -amp; dy <= amp; dy += SPACING) {
        out.push([xi, CY + dy])
      }
    }
    return out
  }, [])

  return (
    <svg
      style={{ position: 'absolute', left: 96, top: 341, pointerEvents: 'none' }}
      width={W} height={H}
    >
      {circles.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.5} fill="#dae9ff" />
      ))}
    </svg>
  )
}

// Timeline ticks — Group 4 from Figma: x=307–1252 at y=836 (relative to frame)
const TICK_XS = Array.from({ length: 62 }, (_, i) => Math.round(307 + i * (945 / 61)))

export default function TimelineScreen() {
  const navigate = useNavigate()

  return (
    <Scene bg="#0126ca">

      {/* ── MAP FRAME: 1322×900, electric blue with grid ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 1322, height: 900,
        background: '#0126ca', ...GRID, overflow: 'hidden',
      }}>
        {/* Background texture */}
        <img
          src={`${base}images/bg_image17a.png`}
          alt=""
          style={{
            position: 'absolute', left: 420, top: 150, width: 600, height: 600,
            opacity: 0.15, mixBlendMode: 'screen', pointerEvents: 'none',
          }}
        />

        {/* ── LOGO at (20,25) ── */}
        <div style={{ position: 'absolute', left: 20, top: 25 }}>
          <div style={{ fontFamily: jet, fontWeight: 400, fontSize: 28, lineHeight: '36px', color: '#fff', whiteSpace: 'pre' }}>
            {'AUTOMATED\nIMAGINATION\n'}
            <span style={{ fontWeight: 700, fontStyle: 'italic', color: '#2663f2' }}>ARCHIVE.</span>
          </div>
          <div style={{ fontFamily: jet, fontWeight: 300, fontSize: 12, lineHeight: '17px', color: '#fff', marginTop: 2 }}>
            THE ENTIRE HISTORY OF GENERATED MEANING
          </div>
        </div>

        {/* ── Nav text at (498,21) ── */}
        <div style={{
          position: 'absolute', left: 498, top: 21,
          fontFamily: inter, fontWeight: 600, fontSize: 12, color: '#cddefd', letterSpacing: '0.06em',
        }}>
          ABOUT    ·    ARCHIVE PROTOCOL    ·    SYSTEM STATUS
        </div>

        {/* ── Dot-matrix waveform (DOTS TIMELINE FRAME) ── */}
        <Waveform />

        {/* ── Artifact nodes: all coordinates are frame-relative ── */}
        {/*
          NODE 1 — THE PLOT GENIE (card ABOVE baseline)
            image "Genie-prototype" at (234,229) 72×72
            text at (224,317) → card above baseline
            line from (269,302) DOWN 117px to (269,419)
        */}
        <div style={{ position: 'absolute', left: 234, top: 229, width: 72, height: 72 }}>
          <img src={`${base}images/timeline_img1.png`} alt=""
            style={{ width: 72, height: 72, display: 'block', borderRadius: '50%', filter: 'grayscale(80%) brightness(0.8)', background: '#0126ca' }} />
        </div>
        <div style={{ position: 'absolute', left: 224, top: 317, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '16px' }}>
          THE PLOT<br />GENIE<br /><span style={{ fontFamily: jet, fontWeight: 300, fontSize: 8, color: 'rgba(218,233,255,0.7)' }}>1930</span>
        </div>
        {/* Vertical connector + dot */}
        <svg style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', overflow: 'visible' }} width={1322} height={900}>
          <line x1={269} y1={302} x2={269} y2={419} stroke="#dae9ff" strokeWidth={2} />
          <circle cx={269} cy={420} r={5} fill="#dae9ff" style={{ cursor: 'pointer' }} onClick={() => navigate('/plot-genie')} />
        </svg>

        {/*
          NODE 2 — THE AUTO-BEATNIK (card BELOW baseline)
            line from (570,436) DOWN 111px to (570,547)
            card at (520,480) 102×142
            image "image 18" at (533,548) 72×72
            text at (527,483)
        */}
        <div style={{ position: 'absolute', left: 527, top: 483, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '16px' }}>
          THE AUTO-<br />BEATNIK<br /><span style={{ fontFamily: jet, fontWeight: 300, fontSize: 8, color: 'rgba(218,233,255,0.7)' }}>1962</span>
        </div>
        <div style={{ position: 'absolute', left: 533, top: 548, width: 72, height: 72 }}>
          <img src={`${base}images/timeline_img2.png`} alt=""
            style={{ width: 72, height: 72, display: 'block', borderRadius: '50%', filter: 'grayscale(80%) brightness(0.8)', background: '#0126ca' }} />
        </div>
        <svg style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', overflow: 'visible' }} width={1322} height={900}>
          <line x1={570} y1={422} x2={570} y2={547} stroke="#dae9ff" strokeWidth={2} />
          <circle cx={570} cy={422} r={5} fill="#dae9ff" />
        </svg>

        {/*
          NODE 3 — RECTAR THE POLICEMAN BEARD (card ABOVE baseline)
            image "image 28" at (715,201) 72×72
            text at (676,289) 149×49
            line from (750,274) DOWN 146px to (750,420)
        */}
        <div style={{ position: 'absolute', left: 715, top: 201, width: 72, height: 72 }}>
          <img src={`${base}images/timeline_img3.png`} alt=""
            style={{ width: 72, height: 72, display: 'block', borderRadius: '50%', filter: 'grayscale(80%) brightness(0.8)', background: '#0126ca' }} />
        </div>
        <div style={{ position: 'absolute', left: 676, top: 289, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '16px' }}>
          RECTAR THE<br />POLICEMAN BEARD<br /><span style={{ fontFamily: jet, fontWeight: 300, fontSize: 8, color: 'rgba(218,233,255,0.7)' }}>1974</span>
        </div>
        <svg style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', overflow: 'visible' }} width={1322} height={900}>
          <line x1={750} y1={274} x2={750} y2={420} stroke="#dae9ff" strokeWidth={2} />
          <circle cx={750} cy={420} r={5} fill="#dae9ff" />
        </svg>

        {/*
          NODE 4 — SYNTHETIC IMAGE MODEL (card ABOVE baseline)
            image "image 29" at (1090,135) 72×72
            text at (1069,223) 109×49
            line from (1125,208) DOWN 224px to (1125,432)
        */}
        <div style={{ position: 'absolute', left: 1090, top: 135, width: 72, height: 72 }}>
          <img src={`${base}images/timeline_img4.png`} alt=""
            style={{ width: 72, height: 72, display: 'block', borderRadius: '50%', filter: 'grayscale(80%) brightness(0.8)', background: '#0126ca' }} />
        </div>
        <div style={{ position: 'absolute', left: 1069, top: 223, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '16px' }}>
          SYNTHETIC<br />IMAGE MODEL<br /><span style={{ fontFamily: jet, fontWeight: 300, fontSize: 8, color: 'rgba(218,233,255,0.7)' }}>2026</span>
        </div>
        <svg style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', overflow: 'visible' }} width={1322} height={900}>
          <line x1={1125} y1={208} x2={1125} y2={432} stroke="#dae9ff" strokeWidth={2} />
          <circle cx={1125} cy={432} r={5} fill="#dae9ff" />
        </svg>

        {/* ── TIMELINE group: y=762–886 ── */}
        {/* Era separator verticals */}
        <div style={{ position: 'absolute', left: 617, top: 762, width: 1, height: 42, background: '#b4d2ff' }} />
        <div style={{ position: 'absolute', left: 943, top: 762, width: 1, height: 42, background: '#b4d2ff' }} />

        {/* Era labels */}
        <div style={{ position: 'absolute', left: 396, top: 770, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '17px', whiteSpace: 'pre' }}>
          {'INDUSTRIAL AGE\n1930 — 1959'}
        </div>
        <div style={{ position: 'absolute', left: 707, top: 770, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '17px', whiteSpace: 'pre' }}>
          {'INFORMATION AGE\n1960 — 1999'}
        </div>
        <div style={{ position: 'absolute', left: 1035, top: 770, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '17px', whiteSpace: 'pre' }}>
          {'SYNTHETIC AGE\n2000 — 2030'}
        </div>

        {/* < > scrubber arrows — color #c2d9fb */}
        <div style={{ position: 'absolute', left: 303, top: 804, fontFamily: jet, fontWeight: 600, fontSize: 10, color: '#c2d9fb' }}>&lt;</div>
        <div style={{ position: 'absolute', left: 1250, top: 804, fontFamily: jet, fontWeight: 600, fontSize: 10, color: '#c2d9fb' }}>&gt;</div>

        {/* Three ruler bars at y=826 */}
        <div style={{ position: 'absolute', left: 307, top: 826, width: 310, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 617, top: 826, width: 326, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 943, top: 826, width: 309, height: 7, background: '#759cf4' }} />

        {/* 62 ticks at y=836 (4px short / 16px major) */}
        {TICK_XS.map((x, i) => {
          const major = x === 617 || x === 943
          return (
            <div key={i} style={{
              position: 'absolute',
              left: x,
              top: major ? 824 : 832,
              width: 1,
              height: major ? 16 : 4,
              background: major ? '#4d77d5' : '#759cf4',
            }} />
          )
        })}

        {/* "1930 — 2030" */}
        <div style={{ position: 'absolute', left: 682, top: 875, fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#fff' }}>
          1930           —           2030
        </div>

        {/* ── VIEW MODE at (29,784) ── */}
        <div style={{ position: 'absolute', left: 29, top: 784 }}>
          <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#dae9ff', marginBottom: 6 }}>VIEW MODE</div>
          <div style={{ display: 'flex', gap: 0 }}>
            {/* Active box */}
            <div style={{ width: 59, height: 33, background: '#081a42', border: '0.5px solid rgba(109,144,247,0.5)' }} />
            {/* Inactive */}
            <div style={{ width: 58, height: 33, background: 'rgba(6,13,34,0.6)', border: '0.5px solid rgba(109,144,247,0.5)' }} />
            <div style={{ width: 59, height: 33, background: 'rgba(6,13,34,0.6)', border: '0.5px solid rgba(109,144,247,0.5)' }} />
          </div>
        </div>

      </div>

      {/* ── RIGHT SIDEBAR at x=1322, width=118 ── */}
      {/* Top: #c2d9fb light panel (743px) */}
      <div style={{
        position: 'absolute', left: 1322, top: 0, width: 118, height: 743,
        background: '#c2d9fb', borderLeft: '1px solid #6d90f7',
      }}>
        {/* MONEY MAKING at top (y=51 relative to frame → y=51) */}
        <div style={{
          position: 'absolute', left: 1355 - 1322, top: 51,
          fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#171717',
          lineHeight: '13px', whiteSpace: 'pre',
        }}>
          {'MONEY\nMAKING'}
        </div>
        {/* Up arrow (Polygon 2 at y=88) */}
        <div style={{
          position: 'absolute', left: 1367 - 1322, top: 88,
          width: 0, height: 0,
          borderLeft: '13.5px solid transparent', borderRight: '13.5px solid transparent',
          borderBottom: '15px solid #050c1f',
        }} />
        {/* Track bar at (1378,115) 5×510 #89a6cf */}
        <div style={{ position: 'absolute', left: 1378 - 1322, top: 115, width: 5, height: 510, background: '#89a6cf' }} />
        {/* Down arrow (Polygon 1 at y=639) */}
        <div style={{
          position: 'absolute', left: 1367 - 1322, top: 639,
          width: 0, height: 0,
          borderLeft: '13.5px solid transparent', borderRight: '13.5px solid transparent',
          borderTop: '15px solid #050c1f',
        }} />
        {/* MEANING at bottom (y=670) */}
        <div style={{
          position: 'absolute', left: 1350 - 1322, top: 670,
          fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#171717',
        }}>
          MEANING
        </div>
      </div>

      {/* Bottom-right dark corner (Rectangle 14 at 1322,743, 142×167 → cap at 118×157) */}
      <div style={{
        position: 'absolute', left: 1322, top: 743, width: 118, height: 157,
        background: '#060d22', borderLeft: '1px solid #6d90f7',
      }} />

    </Scene>
  )
}
