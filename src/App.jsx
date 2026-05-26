import { useState, useEffect } from 'react'
import { MOODS } from './tokens.js'
import { useReveal, useCursor } from './hooks.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [mood] = useState('amber')
  const c = MOODS[mood]

  useReveal()
  useCursor()

  useEffect(() => {
    const blob = document.getElementById('cursor-blob')
    if (blob) blob.style.background = `radial-gradient(circle, ${c.a1}44 0%, transparent 70%)`
  }, [mood])

  return (
    <>
      <Nav c={c} />
      <Hero c={c} />
      <Projects c={c} />
      <About c={c} />
      <Skills c={c} />
      <Contact c={c} />
      <Footer c={c} />
    </>
  )
}
