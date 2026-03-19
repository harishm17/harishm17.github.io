import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import AuroraBackground from './components/AuroraBackground'
import CursorEffect from './components/CursorEffect'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import About from './pages/About'
import ExperiencePage from './pages/ExperiencePage'
import ResearchPage from './pages/ResearchPage'
import ProjectsPage from './pages/ProjectsPage'
import CertificationsPage from './pages/CertificationsPage'
import LeadershipPage from './pages/LeadershipPage'
import SkillsPage from './pages/SkillsPage'
import HobbiesPage from './pages/HobbiesPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

function AppContent() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [cmdOpen, setCmdOpen] = useState(false)

  // Global scroll reveal — runs after every page change
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  // Global Cmd+K listener
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(v => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="app">
      <AuroraBackground />
      <CursorEffect />
      <Navbar onCmdOpen={() => setCmdOpen(true)} />
      {!isHome && <ScrollProgress />}
      <main className="main-content">
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/about"          element={<About />} />
          <Route path="/experience"     element={<ExperiencePage />} />
          <Route path="/research"       element={<ResearchPage />} />
          <Route path="/projects"       element={<ProjectsPage />} />
          <Route path="/hobbies"        element={<HobbiesPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/leadership"     element={<LeadershipPage />} />
          <Route path="/skills"         element={<SkillsPage />} />
          <Route path="/contact"        element={<ContactPage />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
        {!isHome && <Footer />}
      </main>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
