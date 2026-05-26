import { useState, useEffect } from 'react'

export default function ProjectOverlay({ p, c, onClose }) {
  const [closing, setClosing] = useState(false)
  const accents = [
    { bg: c.a1l, col: c.a1 },
    { bg: c.a2l, col: c.a2 },
    { bg: c.a3l, col: c.a3 },
    { bg: c.a4l, col: c.a4 },
  ]
  const ac = accents[p.accent % 3]

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => { setClosing(false); onClose() }, 380)
  }

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: ac.bg,
      animation: `${closing ? 'takeoverOut' : 'takeoverIn'} 0.38s cubic-bezier(0.22,1,0.36,1) both`,
      display: 'flex', flexDirection: 'column',
      overflowY: 'auto',
    }}>
      {/* Decorative rings */}
      <div style={{ position: 'fixed', right: '-80px', top: '-80px', width: 340, height: 340, border: `2px dashed ${ac.col}44`, borderRadius: '50%', animation: 'spin 22s linear infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', right: '5%', bottom: '10%', width: 140, height: 140, background: `${ac.col}18`, borderRadius: '60% 40% 55% 45%', animation: 'floatY 6s ease-in-out infinite', pointerEvents: 'none' }} />

      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px clamp(24px, 6vw, 80px)',
        animation: 'contentIn 0.45s 0.1s cubic-bezier(0.22,1,0.36,1) both',
        flexShrink: 0,
      }}>
        <button onClick={handleClose} data-hover style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          background: 'rgba(26,22,20,0.08)', color: '#1a1614',
          border: 'none', cursor: 'pointer', padding: '9px 20px', borderRadius: '100px',
          transition: 'background 0.2s, transform 0.2s, opacity 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(26,22,20,0.15)'
          e.currentTarget.style.transform = 'translateX(-3px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(26,22,20,0.08)'
          e.currentTarget.style.transform = 'none'
        }}>
          <span style={{ fontSize: '16px', lineHeight: 1 }}>←</span> back to work
        </button>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 700, color: 'rgba(26,22,20,0.28)', letterSpacing: '0.1em' }}>{p.id} / 04</span>
      </div>

      {/* Content grid */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 5vw, 72px)',
        padding: '16px clamp(24px, 6vw, 80px) 60px',
        maxWidth: '1200px', width: '100%', margin: '0 auto',
        alignItems: 'start',
      }}>
        {/* Left — text */}
        <div style={{ animation: 'contentIn 0.5s 0.15s cubic-bezier(0.22,1,0.36,1) both' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', animation: 'bop 2.5s ease-in-out infinite', display: 'inline-block' }}>{p.emoji}</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ac.col, marginBottom: '10px' }}>{p.tag} · {p.year}</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 700, letterSpacing: '-0.05em', color: '#1a1614', lineHeight: 0.92, marginBottom: '18px' }}>{p.title}</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '17px', color: 'rgba(26,22,20,0.55)', fontStyle: 'italic', marginBottom: '22px', lineHeight: 1.6 }}>{p.tagline || p.desc.split('.')[0] + '.'}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'rgba(26,22,20,0.65)', lineHeight: 1.78, marginBottom: '20px', textWrap: 'pretty' }}>{p.desc}</p>
          {p.longDesc && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(26,22,20,0.44)', lineHeight: 1.75, textWrap: 'pretty' }}>{p.longDesc}</p>}

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
            {[{ k: 'Role', v: p.role || 'Solo project' }, { k: 'Duration', v: p.duration || 'Side project' }].map((m) => (
              <div key={m.k} style={{ background: 'rgba(26,22,20,0.07)', borderRadius: '12px', padding: '10px 18px' }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)', marginBottom: '3px' }}>{m.k}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600, color: '#1a1614' }}>{m.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — preview + tech + ctas */}
        <div style={{ animation: 'contentIn 0.5s 0.25s cubic-bezier(0.22,1,0.36,1) both' }}>
          <div style={{
            aspectRatio: '16/10', borderRadius: '20px',
            background: `linear-gradient(140deg, rgba(255,255,255,0.75), ${ac.col}18)`,
            border: `1.5px solid ${ac.col}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '22px', position: 'relative', overflow: 'hidden',
            boxShadow: `0 24px 64px ${ac.col}28`,
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.10, backgroundImage: `repeating-linear-gradient(45deg, ${ac.col} 0px, ${ac.col} 1px, transparent 1px, transparent 16px)` }} />
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: ac.col, opacity: 0.55, zIndex: 1 }}>project preview / screenshot</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {p.tech.map((t) => (
              <span key={t} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 600, background: 'rgba(26,22,20,0.08)', color: '#1a1614', borderRadius: '100px', padding: '6px 16px' }}>{t}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="#" data-hover style={{
              flex: 1, textAlign: 'center', padding: '14px 20px',
              background: '#1a1614', color: '#f7f3ee',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '14px',
              borderRadius: '12px', textDecoration: 'none', letterSpacing: '-0.01em',
              transition: 'background 0.2s, transform 0.15s', display: 'block',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = ac.col; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1614'; e.currentTarget.style.transform = 'none' }}>
              View live →
            </a>
            <a href="#" data-hover style={{
              flex: 1, textAlign: 'center', padding: '14px 20px',
              background: 'rgba(26,22,20,0.08)', color: '#1a1614',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px',
              borderRadius: '12px', textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s', display: 'block',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(26,22,20,0.14)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(26,22,20,0.08)'; e.currentTarget.style.transform = 'none' }}>
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
