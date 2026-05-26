import { useState, useEffect, useRef } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.10 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  })
}

export function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const blob = document.getElementById('cursor-blob')
    const move = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
      blob.style.left = e.clientX + 'px'
      blob.style.top = e.clientY + 'px'
    }
    const enter = () => cursor.classList.add('hovered')
    const leave = () => cursor.classList.remove('hovered')
    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[data-hover]').forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })
    return () => document.removeEventListener('mousemove', move)
  }, [])
}

export function useScramble(text, trigger) {
  const [display, setDisplay] = useState(text)
  const chars = '!@#$%^&*<>?/|~01'
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const total = 14
    const id = setInterval(() => {
      setDisplay(
        text.split('').map((ch, i) => {
          if (ch === ' ') return ' '
          return frame / total > i / text.length
            ? ch
            : chars[Math.floor(Math.random() * chars.length)]
        }).join('')
      )
      frame++
      if (frame > total) { clearInterval(id); setDisplay(text) }
    }, 40)
    return () => clearInterval(id)
  }, [trigger])
  return display
}

export function useFieldScramble(value) {
  const [display, setDisplay] = useState(value)
  const chars = '!@#$%^&*<>?~·✦◯△◇'
  const prev = useRef(value)
  useEffect(() => {
    if (value === prev.current) return
    prev.current = value
    let frame = 0
    const total = 16
    const id = setInterval(() => {
      setDisplay(
        value.split('').map((ch, i) => {
          if (ch === ' ') return ' '
          return frame / total > i / value.length
            ? ch
            : chars[Math.floor(Math.random() * chars.length)]
        }).join('')
      )
      frame++
      if (frame > total) { clearInterval(id); setDisplay(value) }
    }, 35)
    return () => clearInterval(id)
  }, [value])
  return display
}
