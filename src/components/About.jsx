export default function About({ c }) {
  return (
    <section id="about" style={{
      padding: '100px clamp(20px, 6vw, 80px)',
      background: '#1a1614',
      color: '#f7f3ee',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', right: '-80px', top: '50%', transform: 'translateY(-50%)',
        width: 400, height: 400,
        border: `2px solid ${c.a1}30`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)',
        width: 280, height: 280,
        background: `${c.a1}15`,
        borderRadius: '50%',
      }} />

      <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <p className="sr sr-left" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.a1, marginBottom: '16px' }}>about</p>
            <h2 className="sr sr-left d1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(32px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#f7f3ee', marginBottom: '28px' }}>
              hi, i'm<br />
              <span style={{ color: c.a1 }}>julia.</span>
            </h2>

            {[
              "I'm a third-year IT student at Singapore Polytechnic on the Project INC pathway — building and shipping full-stack web apps for real industry clients.",
              "I've worked across the full SDLC: database design, REST APIs, React frontends, CI/CD pipelines, and stakeholder comms. I like software that actually solves something.",
              "When I'm not coding, I'm probably at a hawker centre, picking up a bartending shift, or going down a Wikipedia rabbit hole about something completely unrelated to IT.",
            ].map((txt, i) => (
              <p key={i} className={`sr sr-left d${i + 2}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: 'rgba(247,243,238,0.65)', lineHeight: 1.75, marginBottom: '16px', textWrap: 'pretty' }}>
                {txt}
              </p>
            ))}
          </div>

          {/* Right — ID card */}
          <div className="sr sr-right d2" style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              data-hover
              style={{
                width: '100%', maxWidth: '360px',
                background: 'rgba(247,243,238,0.06)',
                border: '1px solid rgba(247,243,238,0.12)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) rotate(-1deg)'
                e.currentTarget.style.boxShadow = '0 36px 80px rgba(0,0,0,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.3)'
              }}>

              {/* Card header strip */}
              <div style={{
                background: `linear-gradient(120deg, ${c.a1}55, ${c.a2}33)`,
                padding: '20px 24px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                borderBottom: '1px solid rgba(247,243,238,0.08)',
              }}>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(247,243,238,0.45)', marginBottom: '3px' }}>Student ID</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 700, color: 'rgba(247,243,238,0.9)', letterSpacing: '0.04em' }}>Singapore Polytechnic</p>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#F7323D', letterSpacing: '-0.03em', lineHeight: 1 }}>SP</div>
              </div>

              {/* Card body */}
              <div style={{ padding: '20px 24px', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                {/* Photo placeholder */}
                <div style={{
                  width: 72, height: 90, flexShrink: 0,
                  borderRadius: '10px',
                  background: `linear-gradient(140deg, ${c.a1}30, ${c.a2}20)`,
                  border: '1px solid rgba(247,243,238,0.12)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '4px',
                }}>
                  <span style={{ fontSize: '24px' }}>🧑‍💻</span>
                  <p style={{ fontFamily: 'monospace', fontSize: '8px', color: 'rgba(247,243,238,0.2)', textAlign: 'center', lineHeight: 1.3 }}>photo</p>
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#f7f3ee', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '4px' }}>Julia Moe</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontStyle: 'italic', color: c.a1, marginBottom: '14px' }}>VVVERUM</p>
                  {[
                    { label: 'Programme', val: 'Information Technology' },
                    { label: 'Year', val: 'Third Year' },
                    { label: 'Status', val: 'Full-time Student' },
                  ].map((r) => (
                    <div key={r.label} style={{ marginBottom: '7px' }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,243,238,0.3)', marginBottom: '1px' }}>{r.label}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(247,243,238,0.85)' }}>{r.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barcode strip */}
              <div style={{ padding: '12px 24px 16px', borderTop: '1px solid rgba(247,243,238,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '2px', height: '28px', alignItems: 'stretch' }}>
                  {Array.from({ length: 36 }, (_, i) => (
                    <div key={i} style={{
                      width: i % 3 === 0 ? '3px' : '1.5px',
                      background: `rgba(247,243,238,${i % 5 === 0 ? 0.5 : i % 2 === 0 ? 0.2 : 0.35})`,
                      borderRadius: '1px',
                    }} />
                  ))}
                </div>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(247,243,238,0.22)', letterSpacing: '0.15em' }}>SP · 2024–2027 · IT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
