import { NavLink } from 'react-router-dom'
import './BottomNav.css'

function BottomNav() {
  const mainNavItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/experience', label: 'Work', icon: '💼' },
    { path: '/research', label: 'Research', icon: '🔬' },
    { path: '/projects', label: 'Projects', icon: '🚀' },
    { path: '/contact', label: 'Contact', icon: '📬' }
  ]

  return (
    <nav className="bottom-nav">
      {mainNavItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
