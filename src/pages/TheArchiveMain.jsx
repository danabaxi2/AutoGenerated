import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'

const base = import.meta.env.BASE_URL

export default function TheArchiveMain() {
  const navigate = useNavigate()

  return (
    <Scene bg="#000">
      {/* Title */}
      <div style={{
        position: 'absolute',
        left: 513,
        top: 276,
        width: 414,
        fontFamily: "'Cutive Mono', monospace",
        fontSize: 48,
        fontWeight: 400,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 1.1,
        userSelect: 'none',
      }}>
        Auto Generated
      </div>

      {/* Clickable image — navigates to The Plot Genie */}
      <img
        src={`${base}images/archive_image22.png`}
        alt="The Plot Genie"
        onClick={() => navigate('/plot-genie')}
        style={{
          position: 'absolute',
          left: 576,
          top: 341,
          width: 295,
          height: 230,
          objectFit: 'cover',
          cursor: 'pointer',
          transition: 'opacity 0.3s ease-out',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      />
    </Scene>
  )
}
