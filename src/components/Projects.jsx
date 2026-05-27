import { useState } from 'react'
import { PROJECTS } from '../tokens.js'
import { useFieldScramble } from '../hooks.js'
import ProjectOverlay from './ProjectOverlay.jsx'
import ConfidentialModal from './ConfidentialModal.jsx'

export default function Projects({ c }) {
  const [active, setActive] = useState(0)
  const [overlay, setOverlay] = useState(null)
  const [showConfidential, setShowConfidential] = useState(false)

  const p = PROJECTS[active]
  const accents = [
    { bg: c.a1l, col: c.a1, dark: 'oklch(44% 0.09 82)' },
    { bg: c.a2l, col: c.a2, dark: 'oklch(44% 0.09 25)' },
    { bg: c.a3l, col: c.a3, dark: 'oklch(44% 0.09 185)' },
    { bg: c.a4l, col: c.a4, dark: 'oklch(44% 0.09 300)' },
  ]
  const ac = accents[active % accents.length]

  const select = (i) => { if (i !== active) setActive(i) }

  const sTitle = useFieldScramble(p.title)
  const sTagline = useFieldScramble(p.tagline)
  const sDesc = useFieldScramble(p.desc)

  return (
    <>
      {overlay && <ProjectOverlay p={overlay} c={c} onClose={() => setOverlay(null)} />}
      {showConfidential && <ConfidentialModal project={p} accentCol={ac.col} accentBg={ac.bg} onClose={() => setShowConfidential(false)} />}

      <section id="work" style={{ padding: '100px clamp(20px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p className="sr" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.a1, marginBottom: '8px' }}>Selected work</p>
              <h2 className="sr d1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#1a1614', lineHeight: 1 }}>
                things I built<span style={{ color: c.a2 }}>.</span>
              </h2>
            </div>
            <p className="sr d2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(26,22,20,0.40)', maxWidth: '220px', textAlign: 'right' }}>
              Pass me the aux.
            </p>
          </div>

          {/* Player layout */}
          <div className="sr d2 project-player" style={{
            display: 'grid', gridTemplateColumns: '1fr 1.4fr',
            gap: '0', borderRadius: '24px',
            border: '1.5px solid rgba(26,22,20,0.08)',
            overflow: 'hidden',
            boxShadow: '0 12px 48px rgba(26,22,20,0.08)',
            background: '#fff',
          }}>

            {/* LEFT — Playlist */}
            <div className="project-playlist" style={{ borderRight: '1px solid rgba(26,22,20,0.07)', background: 'oklch(97.5% 0.010 75)' }}>
              <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid rgba(26,22,20,0.06)' }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)' }}>Playlist · {PROJECTS.length} projects</p>
              </div>

              <div style={{ padding: '10px 12px' }}>
                {PROJECTS.map((proj, i) => {
                  const isActive = i === active
                  const tac = accents[i % accents.length]
                  return (
                    <div
                      key={proj.id}
                      onClick={() => select(i)}
                      data-hover
                      style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        padding: '12px 14px', borderRadius: '14px',
                        marginBottom: i < PROJECTS.length - 1 ? '4px' : '0',
                        background: isActive ? '#fff' : 'transparent',
                        boxShadow: isActive ? '0 2px 12px rgba(26,22,20,0.08)' : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.25s, box-shadow 0.25s, transform 0.2s',
                        position: 'relative',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'rgba(26,22,20,0.04)'
                        e.currentTarget.style.transform = 'translateX(3px)'
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.transform = 'none'
                      }}>

                      {/* Track number / active indicator */}
                      <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: '10px', background: isActive ? tac.bg : 'rgba(26,22,20,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.25s', position: 'relative' }}>
                        {isActive ? (
                          <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '16px' }}>
                            {[1, 0.6, 0.85].map((h, bi) => (
                              <div key={bi} style={{
                                width: '3px', height: `${h * 100}%`,
                                background: tac.col, borderRadius: '2px',
                                animation: `bop ${0.6 + bi * 0.15}s ease-in-out ${bi * 0.1}s infinite`,
                              }} />
                            ))}
                          </div>
                        ) : (
                          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 700, color: 'rgba(26,22,20,0.25)' }}>{proj.id}</span>
                        )}
                      </div>

                      {/* Track info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: isActive ? 700 : 500, color: isActive ? '#1a1614' : 'rgba(26,22,20,0.65)', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.2s' }}>{proj.title}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: isActive ? tac.col : 'rgba(26,22,20,0.35)', marginTop: '2px', transition: 'color 0.2s' }}>{proj.tag}</p>
                      </div>

                      {/* Year */}
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(26,22,20,0.25)', flexShrink: 0 }}>{proj.year}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT — Now Playing */}
            <div className="project-player-right" style={{ padding: '32px 32px 28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: ac.col, animation: 'pulse 1.5s ease-in-out infinite' }} />
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)' }}>Now playing</p>
              </div>

              {/* Preview area */}
              <div
                onClick={() => setOverlay(p)}
                data-hover
                className="project-preview"
                style={{
                  height: '180px', borderRadius: '16px',
                  background: `linear-gradient(135deg, ${ac.bg}, oklch(96% 0.01 75))`,
                  border: `1.5px solid ${ac.col}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px', position: 'relative', overflow: 'hidden',
                  flexShrink: 0, cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.10, backgroundImage: `repeating-linear-gradient(45deg, ${ac.col} 0px, ${ac.col} 1px, transparent 1px, transparent 16px)` }} />
                <span style={{ fontSize: '52px', zIndex: 1, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.10))', animation: 'floatY 4s ease-in-out infinite' }}>{p.emoji}</span>
                <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '4px 12px' }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: ac.col }}>{p.tag}</p>
                </div>
                <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '4px 12px' }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: 700, color: 'rgba(26,22,20,0.40)' }}>{p.year}</p>
                </div>
              </div>

              {/* Title + tagline */}
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 700, letterSpacing: '-0.04em', color: '#1a1614', lineHeight: 1, marginBottom: '6px' }}>{sTitle}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontStyle: 'italic', color: ac.col, marginBottom: '14px' }}>{sTagline}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(26,22,20,0.60)', lineHeight: 1.7, marginBottom: '18px', textWrap: 'pretty', flex: 1 }}>{sDesc}</p>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {p.tech.map((t) => (
                  <span key={t} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 600, background: ac.bg, color: ac.dark || ac.col, borderRadius: '100px', padding: '5px 14px' }}>{t}</span>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ height: '3px', background: 'rgba(26,22,20,0.08)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${25 + active * 18}%`, background: ac.col, borderRadius: '100px', transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(26,22,20,0.28)' }}>0:00</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(26,22,20,0.28)' }}>{active + 1} / {PROJECTS.length}</span>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {p.confidential ? (
                  <button onClick={() => setShowConfidential(true)} data-hover style={{
                    flex: 1, textAlign: 'center', padding: '12px 16px',
                    background: '#1a1614', color: '#f7f3ee',
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '13px',
                    borderRadius: '12px', border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
                    transition: 'background 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = ac.col; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1614'; e.currentTarget.style.transform = 'none' }}>
                    View live →
                  </button>
                ) : (
                  <a href={p.live || '#'} target="_blank" rel="noopener noreferrer" data-hover style={{
                    flex: 1, textAlign: 'center', padding: '12px 16px',
                    background: '#1a1614', color: '#f7f3ee',
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '13px',
                    borderRadius: '12px', textDecoration: 'none', letterSpacing: '-0.01em',
                    transition: 'background 0.2s, transform 0.15s', display: 'block',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = ac.col; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1614'; e.currentTarget.style.transform = 'none' }}>
                    View live →
                  </a>
                )}
                {p.confidential ? (
                  <button onClick={() => setShowConfidential(true)} data-hover style={{
                    flex: 1, textAlign: 'center', padding: '12px 16px',
                    background: ac.bg, color: '#1a1614',
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '13px',
                    borderRadius: '12px', border: `1.5px solid ${ac.col}33`, cursor: 'pointer',
                    transition: 'background 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}>
                    GitHub ↗
                  </button>
                ) : (
                  <a href={p.github || '#'} target="_blank" rel="noopener noreferrer" data-hover style={{
                    flex: 1, textAlign: 'center', padding: '12px 16px',
                    background: ac.bg, color: '#1a1614',
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '13px',
                    borderRadius: '12px', textDecoration: 'none',
                    transition: 'background 0.2s, transform 0.15s', display: 'block',
                    border: `1.5px solid ${ac.col}33`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}>
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .project-player { grid-template-columns: 1fr !important; }
            .project-playlist { border-right: none !important; border-bottom: 1px solid rgba(26,22,20,0.07) !important; padding-bottom: 0 !important; }
            .project-player-right { padding: 24px 20px 20px !important; }
            .project-preview { height: 140px !important; }
          }
        `}</style>
      </section>
    </>
  )
}
