import { useState, useEffect } from 'react'

export default function Nav({ c }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(20px, 5vw, 64px)', height: '60px',
      background: scrolled ? 'rgba(247,243,238,0.90)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.4s',
    }}>
      <a href="#hero" data-hover style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700, fontSize: '18px',
        color: '#1a1614', textDecoration: 'none',
        letterSpacing: '-0.03em',
      }}>
        verum<span style={{ color: c.a1 }}>.</span>
      </a>

      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {['work', 'about', 'skills'].map((l) => (
          <a key={l} href={`#${l}`} data-hover style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13.5px', fontWeight: 500,
            color: 'rgba(26,22,20,0.55)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.color = c.a1)}
          onMouseLeave={(e) => (e.target.style.color = 'rgba(26,22,20,0.55)')}>
            {l}
          </a>
        ))}
        <a href="#contact" data-hover style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '13px', fontWeight: 600,
          background: '#1a1614', color: '#f7f3ee',
          padding: '8px 20px', borderRadius: '6px',
          textDecoration: 'none', letterSpacing: '0.01em',
          transition: 'background 0.2s, transform 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = c.a1
          e.currentTarget.style.transform = 'translateY(-2px) rotate(-1deg)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#1a1614'
          e.currentTarget.style.transform = 'none'
        }}>
          let's talk
        </a>
      </div>
    </nav>
  )
}
