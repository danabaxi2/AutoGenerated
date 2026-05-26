import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Matter from 'matter-js'
import Scene from '../components/Scene'

const base = import.meta.env.BASE_URL

// ── Story ─────────────────────────────────────────────────────────────────
const STORY_WORDS = `The iron walls of the submarine groaned under the immense pressure of the Atlantic Ocean. Inside the control room, Professor Arthur, a specialist in medieval history who suffered from a lifelong, paralyzing phobia of water, stared in horror at the leaking pipes. Standing right next to him was Antoinette, a professional circus acrobat who spoke absolutely no English, only frantic, rapid French. For reasons never fully explained by the narrative, the two sat in front of a heavy, wooden grandfather clock that had been bolted to the submarine's floor. According to their orders, they had to decipher a secret corporate message hidden inside the clock's pendulum. However, Antoinette refused to assist; she was utterly convinced, based on Arthur's tweed jacket, that the trembling professor was actually an undercover pirate leader seeking to hijack the vessel. Suddenly, the metal door burst open. A wild Bengal tiger, which had mysteriously escaped its cage in the torpedo room, charged into the main cabin. Chaos ensued. In the panic, a corrupt diplomat who happened to be on board drew a bow and challenged the hydrophobic professor to a formal duel using poisoned arrows. With arrows flying and the tiger roaring, the submarine's main engine suddenly died, plunging them into darkness. Seizing the moment, Antoinette used her supreme acrobatic skills to flip over the tiger, pull a wire hairclip from her head, and jam it into the fuse box, instantly repairing the entire nuclear engine. The submarine surfaced safely within seconds. The grandfather clock was immediately sold at a local auction for three hundred dollars, and Arthur and Antoinette used the profit to open a highly successful French bakery in Ohio.`.split(' ')

const FONT = '24px "IBM Plex Mono", monospace'
const PAD_X = 14
const PAD_Y = 10
const BOX_RADIUS = 6

// Draw a rounded rect path (supports browsers without native roundRect)
function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r)
  } else {
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.arcTo(x + w, y, x + w, y + r, r)
    ctx.lineTo(x + w, y + h - r)
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
    ctx.lineTo(x + r, y + h)
    ctx.arcTo(x, y + h, x, y + h - r, r)
    ctx.lineTo(x, y + r)
    ctx.arcTo(x, y, x + r, y, r)
    ctx.closePath()
  }
}

// Measure a word box using an offscreen canvas
function measureWord(text) {
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  ctx.font = FONT
  const tw = ctx.measureText(text).width
  return { w: tw + PAD_X * 2, h: 24 * 1.35 + PAD_Y * 2 }
}

export default function ThePlotGenieInteractive() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const wordBodiesRef = useRef([])   // [{ body, text, w, h }]
  const wordIndexRef = useRef(0)
  const rafRef = useRef(null)

  // ── Physics + render loop setup ─────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const { Engine, World, Bodies } = Matter
    const engine = Engine.create()
    engineRef.current = engine
    engine.gravity.y = 1

    const addWalls = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      const T = 100
      World.clear(engine.world)
      engine.world.gravity.y = 1
      World.add(engine.world, [
        Bodies.rectangle(W / 2, H + T / 2, W, T, { isStatic: true, label: 'ground' }),
        Bodies.rectangle(-T / 2, H / 2, T, H, { isStatic: true, label: 'left' }),
        Bodies.rectangle(W + T / 2, H / 2, T, H, { isStatic: true, label: 'right' }),
      ])
      // Re-add existing word bodies after resize
      wordBodiesRef.current.forEach(({ body }) => World.add(engine.world, body))
    }
    addWalls()

    const tick = () => {
      Engine.update(engine, 1000 / 60)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = FONT
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (const { body, text, w, h } of wordBodiesRef.current) {
        const { x, y } = body.position
        const angle = body.angle
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle)
        roundRectPath(ctx, -w / 2, -h / 2, w, h, BOX_RADIUS)
        ctx.fillStyle = '#000'
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.fillText(text, 0, 0)
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    // Wait for fonts before starting loop
    document.fonts.ready.then(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      World.clear(engine.world)
      Engine.clear(engine)
    }
  }, [])

  // ── Spawn next word on button click ─────────────────────────────────────
  const spawnWord = useCallback(() => {
    if (wordIndexRef.current >= STORY_WORDS.length) return
    const text = STORY_WORDS[wordIndexRef.current++]

    const { World, Bodies } = Matter
    const engine = engineRef.current
    const { w, h } = measureWord(text)

    const x = Math.random() * (window.innerWidth - w - 40) + w / 2 + 20
    const body = Bodies.rectangle(x, -50, w, h, {
      restitution: 0.15,
      friction: 0.7,
      frictionAir: 0.015,
    })

    World.add(engine.world, body)
    wordBodiesRef.current.push({ body, text, w, h })
  }, [])

  // ── RedButtonGenie exact color from Figma ──────────────────────────────
  // fill: r=0.9087 g=0.0131 b=0.0131 → #E80303, stroke: #000
  const btnStyle = {
    position: 'absolute',
    left: 765,
    top: 415,
    width: 52,
    height: 49,
    borderRadius: '50%',
    background: '#E80303',
    border: '1px solid #000',
    cursor: 'pointer',
    transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out',
  }

  return (
    <>
      {/* ── Full-viewport physics canvas (pointer-events off so clicks reach Scene) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      {/* ── Figma Scene ──────────────────────────────────────────────────── */}
      <Scene bg="#000">

        {/* Genie prototype image */}
        <img
          src={`${base}images/genie_prototype.png`}
          alt=""
          style={{ position: 'absolute', left: 442, top: 220, width: 490, height: 459, display: 'block' }}
        />

        {/* RedButtonGenie — from Figma, triggers physics word spawn */}
        <div
          style={btnStyle}
          onClick={spawnWord}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)'
            e.currentTarget.style.boxShadow = '0 0 16px rgba(232,3,3,0.6)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />

        {/* Right sidebar */}
        <div style={{ position: 'absolute', left: 1372, top: 248, width: 38, height: 330, background: '#fff' }} />
        <div style={{
          position: 'absolute', left: 1347, top: 590,
          fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#fff',
          lineHeight: '16px', whiteSpace: 'pre-wrap',
        }}>
          {'Money\nMaking $'}
        </div>

        {/* Next button */}
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
          <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 14, color: '#fff' }}>Next</span>
        </div>

      </Scene>
    </>
  )
}
