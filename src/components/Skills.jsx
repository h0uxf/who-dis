import { useState } from 'react'
import { ALL_SKILLS } from '../tokens.js'

function SkillBubble({ sk, c, i }) {
  const [h, setH] = useState(false)
  const sizeMap = { 5: '18px', 4: '16px', 3: '14px' }
  const padMap = { 5: '10px 22px', 4: '8px 18px', 3: '7px 16px' }
  const colorMap = [
    { bg: c.a1l, col: c.a1 },
    { bg: c.a2l, col: c.a2 },
    { bg: c.a3l, col: c.a3 },
  ]
  const col = colorMap[(sk.level + i) % 3]

  return (
    <span
      data-hover
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600, fontSize: sizeMap[sk.level] || '14px',
        padding: padMap[sk.level] || '7px 16px',
        background: h ? col.bg : '#fff',
        color: h ? col.col : 'rgba(26,22,20,0.75)',
        border: `1.5px solid ${h ? col.col : 'rgba(26,22,20,0.10)'}`,
        borderRadius: '100px',
        cursor: 'default',
        transition: 'background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s',
        transform: h ? `translateY(-3px) rotate(${i % 2 === 0 ? '-2deg' : '2deg'})` : 'none',
        display: 'inline-block',
        animation: `contentIn 0.4s ${Math.min(i * 0.04, 0.5)}s cubic-bezier(0.22,1,0.36,1) both`,
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}>
      {sk.name}
      {sk.level === 5 && <span style={{ marginLeft: '5px', opacity: 0.6, fontSize: '10px' }}>★★★</span>}
    </span>
  )
}

export default function Skills({ c }) {
  const [active, setActive] = useState('all')
  const filters = ['all', 'lang', 'front', 'back', 'tools', 'creative']
  const labels = { all: 'All', lang: 'Languages', front: 'Frontend', back: 'Backend', tools: 'Tools', creative: 'Creative' }
  const visible = active === 'all' ? ALL_SKILLS : ALL_SKILLS.filter((s) => s.cat === active)

  return (
    <section id="skills" style={{ padding: '100px clamp(20px, 6vw, 80px)' }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p className="sr" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.a3, marginBottom: '8px' }}>Skills</p>
            <h2 className="sr d1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(32px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#1a1614', lineHeight: 1 }}>
              my toolkit<span style={{ color: c.a3 }}>.</span>
            </h2>
          </div>

          <div className="sr d2" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {filters.map((f) => (
              <button key={f} data-hover onClick={() => setActive(f)} style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '12px', fontWeight: 600,
                padding: '7px 18px', borderRadius: '100px',
                border: '1.5px solid',
                borderColor: active === f ? c.a3 : 'rgba(26,22,20,0.15)',
                background: active === f ? c.a3l : 'transparent',
                color: active === f ? c.a3 : 'rgba(26,22,20,0.45)',
                cursor: 'pointer', transition: 'all 0.2s',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>{labels[f]}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-start' }}>
          {visible.map((sk, i) => (
            <SkillBubble key={`${active}-${sk.name}`} sk={sk} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
