import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const base = import.meta.env.BASE_URL
const jet = "'JetBrains Mono', monospace"
const inter = "'Inter', sans-serif"

// 39px line grid — matches Figma GRID group (39×39 outlined rects, stroke #3052eb 0.5px)
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
      {/* ── MAP FRAME: full 1440×900, electric blue + grid ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 1440, height: 900,
        background: '#0126ca', ...GRID, overflow: 'hidden',
      }}>
        {/* image 17 — decorative background texture */}
        <img
          src={`${base}images/bg_image17a.png`}
          alt=""
          style={{
            position: 'absolute', left: 420, top: 150, width: 600, height: 600,
            opacity: 0.18, mixBlendMode: 'screen', pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Dark overlay for dialog legibility ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(1,10,35,0.72)',
        opacity: leaving ? 1 : 1,
        transition: leaving ? 'opacity 0.5s ease-in-out' : 'none',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* ── Fade-to-blue on exit ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#0126ca',
        opacity: leaving ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: 'none',
        zIndex: 9,
      }} />

      {/* ── Dialog: Group 26 at (369,202) 702×496 ── */}
      <div style={{
        position: 'absolute', left: 369, top: 202, width: 702, height: 496,
        zIndex: 5,
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.35s ease-in-out',
      }}>
        {/* Dialog background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(240,246,255,0.97)',
        }} />

        {/* "WELCOME TO:" — Inter 20px #0126ca at dialog-relative (23, 25) */}
        <div style={{
          position: 'absolute', left: 23, top: 25,
          fontFamily: inter, fontWeight: 400, fontSize: 20, color: '#0126ca',
          letterSpacing: '0.02em',
        }}>
          WELCOME TO:
        </div>

        {/* Logo title — LOGO group at (393,268) → dialog-relative (24,66) */}
        <div style={{ position: 'absolute', left: 24, top: 66 }}>
          <div style={{ fontFamily: jet, fontWeight: 700, fontSize: 34, lineHeight: '46px', color: '#000' }}>AUTOMATED</div>
          <div style={{ fontFamily: jet, fontWeight: 700, fontSize: 34, lineHeight: '46px', color: '#000' }}>IMAGINATION</div>
          <div style={{ fontFamily: jet, fontWeight: 700, fontStyle: 'italic', fontSize: 34, lineHeight: '46px', color: '#ff55f4' }}>ARCHIVE.</div>
        </div>

        {/* Body text — at dialog-relative (25,247) */}
        <div style={{
          position: 'absolute', left: 25, top: 247,
          fontFamily: jet, fontWeight: 300, fontSize: 10, lineHeight: '16px',
          color: '#000', width: 274,
        }}>
          An Interactive Archive of machines, patents, and systems built to automate stories, poetry, images and attention.
        </div>

        {/* Separator line above button (approx at dialog-relative y=200) */}
        <div style={{
          position: 'absolute', left: 25, top: 395,
          width: 270, height: 0.5, background: '#759cf4',
        }} />

        {/* ENTER THE ARCHIVE button — at dialog-relative (255,411) 192×30 */}
        <div
          onClick={enter}
          style={{
            position: 'absolute', left: 255, top: 411, width: 192, height: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #0024c8',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,36,200,0.07)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontFamily: jet, fontWeight: 400, fontSize: 12, color: '#0024c8', letterSpacing: '0.08em' }}>
            ENTER THE ARCHIVE
          </span>
        </div>

        {/* Separator line above instruction */}
        <div style={{
          position: 'absolute', left: 200, top: 458,
          width: 286, height: 0.5, background: '#759cf4',
        }} />

        {/* "DRAG THE TIMELINE..." — at dialog-relative (200,470) */}
        <div style={{
          position: 'absolute', left: 200, top: 464,
          fontFamily: jet, fontWeight: 300, fontSize: 8, color: '#0024c8',
          letterSpacing: '0.02em',
        }}>
          DRAG THE TIMELINE / SELECT AN ARTIFACT / GENERATE OUTPUT
        </div>
      </div>

    </Scene>
  )
}
