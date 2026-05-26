export default function Footer({ c }) {
  return (
    <footer style={{
      padding: '24px clamp(20px, 6vw, 80px)',
      background: '#1a1614', color: 'rgba(247,243,238,0.35)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '10px',
      fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 500,
      letterSpacing: '0.04em',
    }}>
      <span>© 2026 <span style={{ color: c.a1 }}>verum</span></span>
      <span>built with curiosity <span style={{ color: c.a2 }}>✦</span></span>
    </footer>
  )
}
