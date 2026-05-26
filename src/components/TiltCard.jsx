import { useRef } from 'react'

export default function TiltCard({ children, style, className, onClick, ...rest }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateY(-6px)`
    el.style.boxShadow = `${-x * 20}px ${y * 20 + 20}px 50px rgba(0,0,0,0.13)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)'
    el.style.boxShadow = ''
  }

  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
      {...rest}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s, box-shadow 0.15s', willChange: 'transform', ...style }}>
      {children}
    </div>
  )
}
