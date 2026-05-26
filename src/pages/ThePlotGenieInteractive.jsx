import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const base = import.meta.env.BASE_URL

export default function ThePlotGenieInteractive() {
  const navigate = useNavigate()

  return (
    <Scene bg="#000">

      {/* ── Images — transparent PNGs, exact Figma dims ─────── */}
      <img
        src={`${base}images/genie_image23.png`}
        alt=""
        style={{ position: 'absolute', left: 556, top: 216, width: 372, height: 459, display: 'block' }}
      />
      <img
        src={`${base}images/genie_image22.png`}
        alt=""
        style={{ position: 'absolute', left: 438, top: 272, width: 203, height: 383, display: 'block' }}
      />
      <img
        src={`${base}images/genie_vector19.png`}
        alt=""
        style={{ position: 'absolute', left: 673, top: 272, width: 249, height: 394, display: 'block' }}
      />

      {/* ── Red button ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: 765,
        top: 415,
        width: 52,
        height: 49,
        borderRadius: '50%',
        background: '#E70303',
      }} />

      {/* ── Right sidebar ──────────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 1372, top: 248, width: 38, height: 330, background: '#fff',
      }} />
      <div style={{
        position: 'absolute', left: 1347, top: 590,
        fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#fff', lineHeight: '16px', whiteSpace: 'pre-wrap',
      }}>
        {'Money\nMaking $'}
      </div>

      {/* ── Next button ────────────────────────────────────────── */}
      <div
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          left: 1347,
          top: 810,
          width: 70,
          height: 70,
          borderRadius: '50%',
          border: '1px solid #fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease-out',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 14, color: '#fff' }}>
          Next
        </span>
      </div>

    </Scene>
  )
}
