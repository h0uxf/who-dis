import { useState, useEffect } from 'react'

export default function Nav({ c }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(16px, 5vw, 64px)', height: '60px',
      background: scrolled ? 'rgba(247,243,238,0.90)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.4s',
    }}>
      <a href="#hero" data-hover style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700, fontSize: 'clamp(14px, 4vw, 18px)',
        color: '#1a1614', textDecoration: 'none',
        letterSpacing: '-0.03em',
      }}>
        verum<span style={{ color: c.a1 }}>.</span>
      </a>

      {/* Desktop nav */}
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {['work', 'about', 'skills'].map((l) => (
          <a key={l} href={`#${l}`} data-hover style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13.5px', fontWeight: 500,
            color: 'rgba(26,22,20,0.55)', textDecoration: 'none',
            transition: 'color 0.2s',
            display: 'none',
          }}
          className="nav-link"
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
          display: 'none',
        }}
        className="nav-cta"
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

      {/* Hamburger menu button */}
      <button onClick={() => setMenuOpen(!menuOpen)} data-hover style={{
        display: 'none',
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '8px', zIndex: 101,
      }}
      className="hamburger-btn">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{
            width: '24px', height: '2px', background: '#1a1614',
            transition: 'transform 0.3s',
            transform: menuOpen ? 'rotate(45deg) translateY(9px)' : 'none',
          }} />
          <div style={{
            width: '24px', height: '2px', background: '#1a1614',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.3s',
          }} />
          <div style={{
            width: '24px', height: '2px', background: '#1a1614',
            transition: 'transform 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none',
          }} />
        </div>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0,
          background: 'rgba(247,243,238,0.98)', backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'none',
          flexDirection: 'column', gap: '0', zIndex: 99,
        }}
        className="mobile-menu">
          {['work', 'about', 'skills', 'contact'].map((l) => (
            <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)} data-hover style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px', fontWeight: 500,
              color: 'rgba(26,22,20,0.55)', textDecoration: 'none',
              padding: '16px clamp(16px, 4vw, 24px)',
              borderBottom: '1px solid rgba(26,22,20,0.06)',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(26,22,20,0.03)'
              e.currentTarget.style.color = c.a1
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'rgba(26,22,20,0.55)'
            }}>
              {l}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn { display: block !important; }
          .nav-link { display: none !important; }
          .nav-cta { display: none !important; }
          .mobile-menu { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
          .nav-link { display: block !important; }
          .nav-cta { display: block !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
