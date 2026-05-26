import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const base = import.meta.env.BASE_URL
const mono = "'IBM Plex Mono', monospace"

export default function ThePlotGenie() {
  const navigate = useNavigate()

  return (
    <Scene bg="#000">

      {/* ── Text block ─────────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 61, top: 92, width: 327 }}>
        <div style={{
          fontFamily: mono,
          fontSize: 40,
          fontWeight: 400,
          color: '#fff',
          lineHeight: '52px',
          marginBottom: 8,
        }}>
          The Plot Genie.
        </div>
        <div style={{
          fontFamily: mono,
          fontSize: 13,
          fontWeight: 200,
          color: '#fff',
          lineHeight: '20px',
          whiteSpace: 'pre-wrap',
        }}>
          {`Developed in 1930 by Wycliffe A. Hill, the Plot Genie was a mechanical, cardboard-based device designed to automate narrative construction during the pulp fiction boom of the Great Depression.
The system operated via a spinning dial that revealed randomized numerical codes through a slot. Writers matched these numbers with an index of standardized character archetypes, conflicts, and settings.
By relying on mathematical permutations instead of individual composition, the device allowed publishers to mass-produce narrative outlines rapidly and at a minimal cost.`}
        </div>
      </div>

      {/* ── Images — transparent PNGs, no objectFit fill ─────── */}
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

      {/* ── Red start button ───────────────────────────────────── */}
      <div
        onClick={() => navigate('/plot-genie-interactive')}
        style={{
          position: 'absolute',
          left: 765,
          top: 415,
          width: 52,
          height: 49,
          borderRadius: '50%',
          background: '#E70303',
          cursor: 'pointer',
          transition: 'transform 0.15s ease-out',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />

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

      {/* ── Timeline ────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 384, top: 805, width: 672, height: 1, background: '#fff' }} />
      <div style={{
        position: 'absolute', left: 359, top: 784, width: 50, height: 50,
        borderRadius: '50%', border: '1px solid #fff',
      }} />
      <div style={{ position: 'absolute', left: 384, top: 788, width: 1, height: 41, background: '#fff' }} />
      <div style={{ position: 'absolute', left: 720, top: 788, width: 1, height: 41, background: '#fff' }} />
      <div style={{ position: 'absolute', left: 1057, top: 784, width: 1, height: 41, background: '#fff' }} />
      <div style={{ position: 'absolute', left: 369, top: 841, fontFamily: mono, fontSize: 11, color: '#fff' }}>1930</div>
      <div style={{ position: 'absolute', left: 705, top: 830, fontFamily: mono, fontSize: 11, color: '#fff' }}>1962</div>
      <div style={{ position: 'absolute', left: 1042, top: 830, fontFamily: mono, fontSize: 11, color: '#fff' }}>2026</div>

    </Scene>
  )
}
