import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import Footer from './components/Footer'
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
  const showFooter = location.pathname !== '/'

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showFooter && <Footer />}
      </main>
      <BottomNav />
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
