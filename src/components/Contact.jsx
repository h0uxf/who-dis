import { useState, useRef } from 'react'

export default function Contact({ c }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'julia', text: "hey there! 👋 what's your name?", id: 0 },
  ])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  const topics = ['internship opp 💼', 'collab idea 🤝', 'just saying hi 👋', 'something else ✦']

  const scrollBottom = () => {
    if (bottomRef.current) bottomRef.current.scrollTop = bottomRef.current.scrollHeight
  }

  const addJulia = (text, delay = 900) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'julia', text, id: Date.now() }])
      setTimeout(scrollBottom, 50)
    }, delay)
  }

  const addUser = (text) => {
    setMessages((m) => [...m, { from: 'user', text, id: Date.now() }])
    setTimeout(scrollBottom, 50)
  }

  const handleNameSubmit = () => {
    if (!input.trim()) return
    const n = input.trim()
    setName(n)
    setInput('')
    addUser(n)
    setStep(1)
    addJulia(`nice to meet you, ${n.split(' ')[0]}! 🌿 what do you want to talk about?`)
  }

  const handleTopic = (t) => {
    setTopic(t)
    addUser(t)
    setStep(2)
    addJulia("love it! drop your email and a message and i'll get back to you. 📬")
  }

  const handleSend = async () => {
    if (!email.trim() || !msg.trim()) return
    addUser(`${email} — "${msg}"`)
    setStep(3)
    setTyping(true)

    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, topic, email, message: msg }),
        })
        if (!res.ok) throw new Error('submit failed')
      }
      setTyping(false)
      setMessages((m) => [...m, { from: 'julia', text: 'got your msg ✦ talk soon! 🌿', id: Date.now() }])
    } catch {
      setTyping(false)
      setMessages((m) => [...m, { from: 'julia', text: "hmm, something went wrong 😬 try emailing me directly at pyaesquaremoe@gmail.com", id: Date.now() }])
    }
    setTimeout(scrollBottom, 50)
  }

  const inputBase = {
    flex: 1, padding: '11px 16px',
    background: 'rgba(26,22,20,0.05)',
    border: '1.5px solid rgba(26,22,20,0.10)',
    borderRadius: '100px', outline: 'none',
    fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
    color: '#1a1614', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: '100px clamp(20px, 6vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(80px, 16vw, 200px)',
        fontWeight: 700, letterSpacing: '-0.06em',
        color: 'rgba(26,22,20,0.03)',
        whiteSpace: 'nowrap', pointerEvents: 'none',
        userSelect: 'none', zIndex: 0,
      }}>HELLO</div>

      <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="sr" style={{ marginBottom: '36px' }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.a2, marginBottom: '8px' }}>say hi</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#1a1614', lineHeight: 1, marginBottom: '12px' }}>
            let's talk<span style={{ color: c.a2 }}>.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: 'rgba(26,22,20,0.50)', textWrap: 'pretty' }}>
            open for internships, collabs, or just a chat. i don't bite.
          </p>
        </div>

        {/* Chat window */}
        <div className="sr d1 contact-chat" style={{
          background: '#fff',
          borderRadius: '24px',
          border: '1.5px solid rgba(26,22,20,0.08)',
          boxShadow: '0 8px 40px rgba(26,22,20,0.08)',
          overflow: 'hidden',
        }}>
          {/* Chat header */}
          <div style={{
            padding: '14px 20px',
            borderBottom: '1px solid rgba(26,22,20,0.07)',
            display: 'flex', alignItems: 'center', gap: '12px',
            background: 'rgba(247,243,238,0.6)',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <img src="/avatar.jpg" alt="verum" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1a1614', letterSpacing: '-0.02em' }}>verum</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(26,22,20,0.40)' }}>
                {step < 3 ? 'online' : 'message received ✓'}
              </p>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
              {['#f7766d', '#f9be3e', '#27c840'].map((col) => (
                <div key={col} style={{ width: 10, height: 10, borderRadius: '50%', background: col }} />
              ))}
            </div>
          </div>

          {/* Messages */}
          <div ref={bottomRef} className="contact-messages" style={{
            height: '280px', overflowY: 'auto',
            padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '10px',
          }}>
            {messages.map((m) => (
              <div key={m.id} style={{
                display: 'flex',
                justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
                animation: 'contentIn 0.3s cubic-bezier(0.22,1,0.36,1) both',
              }}>
                {m.from === 'julia' && (
                  <div style={{ width: 26, height: 26, borderRadius: '50%', overflow: 'hidden', marginRight: '8px', flexShrink: 0, alignSelf: 'flex-end' }}>
                    <img src="/avatar.jpg" alt="verum" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '75%', padding: '10px 14px',
                  borderRadius: m.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.from === 'user' ? '#1a1614' : 'rgba(26,22,20,0.06)',
                  color: m.from === 'user' ? '#f7f3ee' : '#1a1614',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px', lineHeight: 1.5,
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', animation: 'contentIn 0.3s both' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <img src="/avatar.jpg" alt="verum" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <div style={{ padding: '10px 16px', borderRadius: '18px 18px 18px 4px', background: 'rgba(26,22,20,0.06)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(26,22,20,0.3)', animation: `bop 0.9s ${i * 0.15}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div style={{
            borderTop: '1px solid rgba(26,22,20,0.07)',
            padding: '14px 16px',
            background: 'rgba(247,243,238,0.4)',
          }}>
            {step === 0 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  placeholder="your name..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = c.a2)}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(26,22,20,0.10)')}
                />
                <button onClick={handleNameSubmit} data-hover style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: '#1a1614', color: '#f7f3ee',
                  border: 'none', cursor: 'pointer', fontSize: '16px',
                  flexShrink: 0, transition: 'background 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = c.a2)}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#1a1614')}>
                  →
                </button>
              </div>
            )}

            {step === 1 && !typing && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {topics.map((t) => (
                  <button key={t} onClick={() => handleTopic(t)} data-hover style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '12px', fontWeight: 600,
                    padding: '8px 16px', borderRadius: '100px',
                    background: 'transparent', color: '#1a1614',
                    border: '1.5px solid rgba(26,22,20,0.15)',
                    cursor: 'pointer', transition: 'all 0.18s',
                    animation: 'contentIn 0.35s both',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = c.a1l; e.currentTarget.style.borderColor = c.a1 }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(26,22,20,0.15)' }}>
                    {t}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && !typing && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ ...inputBase, borderRadius: '12px', width: '100%' }}
                  onFocus={(e) => (e.target.style.borderColor = c.a2)}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(26,22,20,0.10)')}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    placeholder="your message..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    style={{ ...inputBase, flex: 1 }}
                    onFocus={(e) => (e.target.style.borderColor = c.a2)}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(26,22,20,0.10)')}
                  />
                  <button onClick={handleSend} data-hover style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: '#1a1614', color: '#f7f3ee',
                    border: 'none', cursor: 'pointer', fontSize: '16px',
                    flexShrink: 0, transition: 'background 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = c.a2)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#1a1614')}>
                    →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && !typing && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(26,22,20,0.35)', textAlign: 'center', padding: '4px 0' }}>✦ message sent</p>
            )}

            {(step === 1 || step === 2) && typing && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(26,22,20,0.30)', padding: '4px 0' }}>julia is typing...</p>
            )}
          </div>
        </div>

        {/* Social links */}
        <div className="contact-socials" style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '32px' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/h0uxf' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/pyaepyaemoe' },
            { label: 'Resume', href: '/resume.pdf', download: true },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" download={s.download || undefined} data-hover style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px', fontWeight: 600,
              color: 'rgba(26,22,20,0.35)', textDecoration: 'none',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              transition: 'color 0.2s, transform 0.2s', display: 'inline-block',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = c.a1; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(26,22,20,0.35)'; e.currentTarget.style.transform = 'none' }}>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-chat { border-radius: 16px; }
          .contact-messages { height: 240px !important; }
        }
        @media (max-width: 640px) {
          .contact-messages { height: 200px !important; }
          .contact-socials { flex-wrap: wrap; gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}
