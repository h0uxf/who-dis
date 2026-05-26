import { useState, useEffect } from 'react'
import { useScramble } from '../hooks.js'

export default function Hero({ c }) {
  const [hovered, setHovered] = useState(false)
  const name = useScramble('Julia Moe', hovered)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80)
    return () => clearInterval(id)
  }, [])

  const blinkChars = ['✦', '◯', '△', '◇', '×', '+', ' ̈', '~']
  const blink = blinkChars[tick % blinkChars.length]

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      padding: '80px clamp(20px, 6vw, 80px) 60px',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Floating blobs */}
      <div style={{
        position: 'absolute', top: '12%', right: '8%', width: 180, height: 180,
        background: c.a1l, borderRadius: '60% 40% 55% 45% / 50% 60% 40% 55%',
        animation: 'floatY 5s ease-in-out infinite', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '18%', right: '18%', width: 110, height: 110,
        background: c.a2l, borderRadius: '45% 55% 40% 60% / 60% 45% 55% 40%',
        animation: 'floatYR 6s ease-in-out 1s infinite', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: '30%', left: '2%', width: 70, height: 70,
        background: c.a3l, borderRadius: '50%',
        animation: 'floatY 4s ease-in-out 0.5s infinite', zIndex: 0,
      }} />

      {/* Spinning ring */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%', width: 220, height: 220,
        border: `2px dashed ${c.a1}44`, borderRadius: '50%',
        animation: 'spin 24s linear infinite', zIndex: 0,
      }} />

      {/* Top label */}
      <div className="sr d1" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        marginBottom: '28px', position: 'relative', zIndex: 1,
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em',
          color: c.a1, textTransform: 'uppercase',
          background: c.a1l, padding: '5px 14px', borderRadius: '4px',
        }}>Available for internships</span>
        <span style={{ fontSize: '12px', color: 'rgba(26,22,20,0.4)' }}>📍 Singapore</span>
      </div>

      {/* Big name */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="sr d1" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(72px, 13vw, 180px)',
          fontWeight: 700, letterSpacing: '-0.05em',
          lineHeight: 0.9, color: '#1a1614',
          marginBottom: '8px', userSelect: 'none',
        }}>
          VER<span style={{ color: c.a1, position: 'relative' }}>U</span>M
          <span style={{
            display: 'inline-block',
            animation: 'bop 0.8s ease-in-out infinite',
            color: c.a2, marginLeft: '4px',
          }}>{blink}</span>
        </div>

        <div className="sr d2" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(16px, 2.2vw, 26px)',
          fontWeight: 300, color: 'rgba(26,22,20,0.55)',
          letterSpacing: '0.01em', marginBottom: '12px',
        }}>
          aka{' '}
          <span
            data-hover
            style={{
              fontStyle: 'italic', color: '#1a1614', fontWeight: 400,
              cursor: 'default', borderBottom: `2px solid ${c.a2}`,
              paddingBottom: '1px',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            {name}
          </span>
        </div>

        <div className="sr d3" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          color: 'rgba(26,22,20,0.50)',
          maxWidth: '520px', lineHeight: 1.7, marginBottom: '44px',
        }}>
          student developer · IT @ SP
        </div>

        {/* CTA row */}
        <div className="sr d4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <a href="#work" data-hover style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600, fontSize: '15px',
            background: '#1a1614', color: '#f7f3ee',
            padding: '14px 32px', borderRadius: '8px',
            textDecoration: 'none', letterSpacing: '-0.01em',
            transition: 'transform 0.2s, background 0.2s',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) rotate(-1deg)'
            e.currentTarget.style.background = c.a1
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none'
            e.currentTarget.style.background = '#1a1614'
          }}>
            see my work →
          </a>
          <a href="#about" data-hover style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500, fontSize: '15px',
            background: 'transparent', color: '#1a1614',
            padding: '14px 28px', borderRadius: '8px',
            textDecoration: 'none', letterSpacing: '-0.01em',
            border: '1.5px solid rgba(26,22,20,0.18)',
            transition: 'transform 0.2s, border-color 0.2s',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) rotate(1deg)'
            e.currentTarget.style.borderColor = c.a2
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none'
            e.currentTarget.style.borderColor = 'rgba(26,22,20,0.18)'
          }}>
            who am i?
          </a>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="sr d5" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        overflow: 'hidden', borderTop: '1px solid rgba(26,22,20,0.08)',
        padding: '10px 0', background: 'rgba(247,243,238,0.7)',
        backdropFilter: 'blur(4px)',
      }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'marquee 18s linear infinite',
          width: 'max-content',
        }}>
          {Array(8).fill(['React ✦', 'TypeScript ◯', 'Python △', 'Node.js ×', 'PostgreSQL ◇', 'Tailwind ✦', 'GitHub Actions ◯', 'Playwright △']).flat().map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '12px', fontWeight: 500,
              color: i % 3 === 0 ? c.a1 : i % 3 === 1 ? c.a2 : c.a3,
              padding: '0 20px', letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
