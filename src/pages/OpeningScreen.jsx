import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const base = import.meta.env.BASE_URL
const jet = "'JetBrains Mono', monospace"
const inter = "'Inter', sans-serif"

// CSS line grid matching Figma GRID group (39×39 outlined rects, stroke #3052eb 0.5px)
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

export default function OpeningScreen() {
  const navigate = useNavigate()
  const [transitioning, setTransitioning] = useState(false)

  const handleEnter = () => {
    setTransitioning(true)
    setTimeout(() => navigate('/timeline'), 500)
  }

  return (
    <Scene bg="#060d22">

      {/* ── Left sidebar ── */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 237, height: 900, background: '#060d22', borderRight: '0.5px solid #6d90f7' }}>
        {/* Title block */}
        <div style={{ position: 'absolute', left: 20, top: 26, width: 193 }}>
          <div style={{ fontFamily: jet, fontWeight: 400, fontSize: 28, lineHeight: '36px', color: '#fff', whiteSpace: 'pre' }}>
            {'AUTOMATED\nIMAGINATION\n'}
            <span style={{ fontWeight: 700, fontStyle: 'italic', color: '#2663f2' }}>ARCHIVE.</span>
          </div>
          <div style={{
            fontFamily: jet, fontWeight: 300, fontSize: 12, lineHeight: '17px',
            color: '#fff', marginTop: 3, whiteSpace: 'pre-wrap',
          }}>
            THE ENTIRE HISTORY OF GENERATED MEANING
          </div>
        </div>

        {/* Category dividers + items */}
        {DIVIDERS.map(y => (
          <div key={y} style={{ position: 'absolute', left: 29, top: y, width: 176, height: 0.5, background: '#1f326b' }} />
        ))}
        {CATEGORIES.map(cat => (
          <div key={cat.y} style={{ position: 'absolute', left: 15, top: cat.y, width: 190, display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2663f2', flexShrink: 0, marginTop: 3 }} />
            <div>
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '14px' }}>{cat.label}</div>
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 10, color: 'rgba(255,255,255,0.45)', lineHeight: '14px' }}>{cat.count}</div>
            </div>
          </div>
        ))}

        {/* VIEW MODE label */}
        <div style={{ position: 'absolute', left: 29, top: 784, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#dae9ff' }}>VIEW MODE</div>

        {/* Session ID */}
        <div style={{ position: 'absolute', left: 20, top: 875, fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#fff', letterSpacing: '0.05em' }}>
          SESSION ID 000-00-00000
        </div>
      </div>

      {/* ── Main blue area with CSS line grid ── */}
      <div style={{
        position: 'absolute', left: 237, top: 0, width: 1085, height: 743,
        background: '#0126ca', ...GRID_STYLE,
        borderRight: '0.5px solid #6d90f7', overflow: 'hidden',
      }}>
        {/* Background image 17 (decorative waveform/bg) */}
        <img
          src={`${base}images/bg_image17a.png`}
          alt=""
          style={{ position: 'absolute', left: 420 - 237, top: 150, width: 600, height: 600, pointerEvents: 'none', opacity: 0.5 }}
        />
        {/* Nav text */}
        <div style={{
          position: 'absolute', left: 558 - 237, top: 21,
          fontFamily: inter, fontWeight: 600, fontSize: 12, color: '#cddefd', letterSpacing: '0.06em',
        }}>
          ABOUT    ·    ARCHIVE PROTOCOL    ·    SYSTEM STATUS
        </div>
        {/* "1930 — 2030" date range above dialog */}
        <div style={{
          position: 'absolute', left: 647 - 237, top: 296,
          fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#171717',
        }}>
          1930       —       2030
        </div>
        {/* Vertical era separators */}
        <div style={{ position: 'absolute', left: 617 - 237, top: 762, width: 0.5, height: 42, background: '#b4d2ff' }} />
        <div style={{ position: 'absolute', left: 943 - 237, top: 762, width: 0.5, height: 42, background: '#b4d2ff' }} />
      </div>

      {/* ── Right panel ── */}
      <div style={{ position: 'absolute', left: 1322, top: 0, width: 118, height: 743, background: '#c2d9fb', borderLeft: '0.5px solid #6d90f7' }}>
        {/* MEANING label */}
        <div style={{ position: 'absolute', left: 1350 - 1322, top: 60, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#171717' }}>MEANING</div>
        {/* Track bar */}
        <div style={{ position: 'absolute', left: 1378 - 1322, top: 115, width: 5, height: 510, background: '#89a6cf' }} />
        {/* Top arrow */}
        <div style={{
          position: 'absolute', left: 1367 - 1322, top: 88,
          width: 0, height: 0,
          borderLeft: '13.5px solid transparent',
          borderRight: '13.5px solid transparent',
          borderBottom: '15px solid #050c1f',
        }} />
        {/* Bottom arrow */}
        <div style={{
          position: 'absolute', left: 1367 - 1322, top: 639,
          width: 0, height: 0,
          borderLeft: '13.5px solid transparent',
          borderRight: '13.5px solid transparent',
          borderTop: '15px solid #050c1f',
        }} />
        {/* MONEY label */}
        <div style={{ position: 'absolute', left: 1357 - 1322, top: 670, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#171717' }}>MONEY</div>
      </div>

      {/* ── Bottom panel ── */}
      <div style={{ position: 'absolute', left: 237, top: 743, width: 1085, height: 157, background: '#dae9ff', borderTop: '0.5px solid #6d90f7' }}>
        {/* Era labels */}
        <div style={{ position: 'absolute', left: 396 - 237, top: 770 - 743, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '17px', whiteSpace: 'pre' }}>
          {'INDUSTRIAL AGE\n1930 — 1959'}
        </div>
        <div style={{ position: 'absolute', left: 707 - 237, top: 770 - 743, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '17px', whiteSpace: 'pre' }}>
          {'INFORMATION AGE\n1960 — 1999'}
        </div>
        <div style={{ position: 'absolute', left: 1035 - 237, top: 770 - 743, fontFamily: inter, fontWeight: 600, fontSize: 10, color: '#fff', lineHeight: '17px', whiteSpace: 'pre' }}>
          {'SYNTHETIC AGE\n2000 — 2030'}
        </div>

        {/* '1930 — 2030' text */}
        <div style={{ position: 'absolute', left: 682 - 237, top: 875 - 743, fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#171717' }}>
          1930           —           2030
        </div>

        {/* Three ruler bars */}
        <div style={{ position: 'absolute', left: 306 - 237, top: 826 - 743, width: 311, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 617 - 237, top: 826 - 743, width: 326, height: 7, background: '#759cf4' }} />
        <div style={{ position: 'absolute', left: 943 - 237, top: 826 - 743, width: 310, height: 7, background: '#759cf4' }} />

        {/* 62 timeline ticks */}
        {TICKS.map((x, i) => {
          const isMajor = x === 617 || x === 943
          return (
            <div key={i} style={{
              position: 'absolute',
              left: x - 237,
              top: 824 - 743,
              width: 0.5,
              height: isMajor ? 16 : 4,
              background: isMajor ? '#4d77d5' : '#759cf4',
            }} />
          )
        })}

        {/* < > arrow controls */}
        <div style={{ position: 'absolute', left: 303 - 237, top: 804 - 743, fontFamily: jet, fontWeight: 600, fontSize: 10, color: '#171717' }}>&lt;</div>
        <div style={{ position: 'absolute', left: 1250 - 237, top: 804 - 743, fontFamily: jet, fontWeight: 600, fontSize: 10, color: '#171717' }}>&gt;</div>
      </div>

      {/* ── Bottom-right dark corner ── */}
      <div style={{ position: 'absolute', left: 1322, top: 743, width: 118, height: 157, background: '#060d22' }}>
        {/* VIEW MODE buttons */}
        <div style={{ position: 'absolute', left: 29 - 1322 + 1322, top: 802 - 743 }}>
          {/* We put view mode in sidebar already */}
        </div>
      </div>

      {/* VIEW MODE buttons (in scrubber left area) */}
      <div style={{ position: 'absolute', left: 29, top: 802, width: 59, height: 33, background: '#081a42', border: '0.5px solid #1f326b' }} />
      <div style={{ position: 'absolute', left: 88, top: 802, width: 58, height: 33, background: '#060d22', border: '0.5px solid #1f326b' }} />
      <div style={{ position: 'absolute', left: 146, top: 802, width: 59, height: 33, background: '#060d22', border: '0.5px solid #1f326b' }} />

      {/* ── Dark overlay (0.8 opacity) ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 1440, height: 900,
        background: '#060d22',
        opacity: transitioning ? 1 : 0.8,
        transition: transitioning ? 'opacity 0.5s ease-in' : 'none',
        pointerEvents: 'none',
        zIndex: 8,
      }} />

      {/* ── Dialog box ── */}
      <div style={{
        position: 'absolute', left: 491, top: 288, width: 458, height: 324,
        background: '#dae9ff',
        zIndex: 10,
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.4s ease-out',
        pointerEvents: transitioning ? 'none' : 'auto',
      }}>
        {/* Dialog title */}
        <div style={{
          position: 'absolute', left: 559 - 491, top: 327 - 288,
          fontFamily: jet, fontWeight: 400, fontSize: 22, lineHeight: '35px', color: '#000',
        }}>
          WELCOME TO THE<br />AUTOMATED IMAGINATION<br />ARCHIVE.
        </div>

        {/* Separator line below title */}
        <div style={{ position: 'absolute', left: 630 - 491, top: 419 - 288, width: 180, height: 0.5, background: '#759cf4' }} />

        {/* Body text */}
        <div style={{
          position: 'absolute', left: 576 - 491, top: 432 - 288,
          fontFamily: jet, fontWeight: 300, fontSize: 10, lineHeight: '16px', color: '#000', width: 288,
        }}>
          An Interactive Archive of machines, patents, and systems built to automate stories, poetry, images and attention.
        </div>

        {/* ENTER THE ARCHIVE button */}
        <div
          onClick={handleEnter}
          style={{
            position: 'absolute', left: 624 - 491, top: 491 - 288, width: 192, height: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #0024c8',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,36,200,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontFamily: jet, fontWeight: 400, fontSize: 12, color: '#0024c8', letterSpacing: '0.06em' }}>
            ENTER THE ARCHIVE
          </span>
        </div>

        {/* Separator line above instruction */}
        <div style={{ position: 'absolute', left: 577 - 491, top: 576 - 288, width: 286, height: 0.5, background: '#759cf4' }} />

        {/* Instruction text */}
        <div style={{
          position: 'absolute', left: 569 - 491, top: 581 - 288,
          fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#0024c8', letterSpacing: '0.02em',
        }}>
          DRAG THE TIMELINE / SELECT AN ARTIFACT / GENERATE OUTPUT
        </div>
      </div>

    </Scene>
  )
}
