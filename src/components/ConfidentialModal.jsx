import { useState, useEffect } from 'react'

export default function ConfidentialModal({ project, accentCol, accentBg, onClose }) {
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 300)
  }

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(26,22,20,0.72)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: `${closing ? 'modalOut' : 'modalIn'} 0.28s cubic-bezier(0.22,1,0.36,1) both`,
      }}>

      <style>{`
        @keyframes modalIn  { from { opacity:0; transform:scale(0.94) } to { opacity:1; transform:none } }
        @keyframes modalOut { from { opacity:1; transform:none } to { opacity:0; transform:scale(0.96) } }
        @keyframes spin403  { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
      `}</style>

      <div style={{
        position: 'relative',
        width: '100%', maxWidth: '420px',
        background: '#f7f3ee',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: `0 40px 100px rgba(26,22,20,0.35), 0 0 0 1.5px ${accentCol}44`,
      }}>

        {/* Spinning dashed ring — decorative, bleeds off top-right */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: 180, height: 180,
          border: `2px dashed ${accentCol}44`,
          borderRadius: '50%',
          animation: 'spin403 20s linear infinite',
          pointerEvents: 'none',
        }} />

        {/* Accent header strip */}
        <div style={{
          background: accentBg,
          padding: '28px 32px 24px',
          borderBottom: `1px solid ${accentCol}22`,
        }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: accentCol,
              background: 'rgba(255,255,255,0.55)',
              padding: '4px 12px', borderRadius: '4px',
            }}>
              {project.tag}
            </span>
            <button onClick={handleClose} data-hover style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(26,22,20,0.08)', border: 'none',
              cursor: 'pointer', fontSize: '13px', color: '#1a1614',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(26,22,20,0.16)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(26,22,20,0.08)')}>
              ✕
            </button>
          </div>

          {/* 403 */}
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '72px', fontWeight: 700, letterSpacing: '-0.06em',
            lineHeight: 0.88, color: accentCol, opacity: 0.9,
            marginBottom: '10px', userSelect: 'none',
          }}>
            403
          </div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(26,22,20,0.40)',
          }}>
            access denied
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 32px 28px' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px', lineHeight: 1.7,
            color: '#1a1614', marginBottom: '8px',
          }}>
            <strong style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</strong> is an industry client project.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px', lineHeight: 1.7,
            color: 'rgba(26,22,20,0.55)', marginBottom: '28px',
          }}>
            The repo and live deployment are covered by client confidentiality — not mine to share publicly. Happy to talk through the work in person though.
          </p>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(26,22,20,0.07)', marginBottom: '20px' }} />

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            {[
              { k: 'role', v: project.role },
              { k: 'year', v: project.year },
            ].map((m) => (
              <div key={m.k} style={{ background: 'rgba(26,22,20,0.05)', borderRadius: '10px', padding: '8px 16px' }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.30)', marginBottom: '2px' }}>{m.k}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 600, color: '#1a1614' }}>{m.v}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button onClick={handleClose} data-hover style={{
            width: '100%', padding: '13px 20px',
            background: '#1a1614', color: '#f7f3ee',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '13px',
            borderRadius: '12px', border: 'none', cursor: 'pointer',
            letterSpacing: '-0.01em', transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = accentCol; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1614'; e.currentTarget.style.transform = 'none' }}>
            understood ✦
          </button>
        </div>
      </div>
    </div>
  )
}
