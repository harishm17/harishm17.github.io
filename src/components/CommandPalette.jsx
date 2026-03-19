// src/components/CommandPalette.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './CommandPalette.css'

const ACTIONS = [
  { group: 'Pages', label: 'Home',           path: '/',               type: 'nav' },
  { group: 'Pages', label: 'About',          path: '/about',          type: 'nav' },
  { group: 'Pages', label: 'Experience',     path: '/experience',     type: 'nav' },
  { group: 'Pages', label: 'Research',       path: '/research',       type: 'nav' },
  { group: 'Pages', label: 'Projects',       path: '/projects',       type: 'nav' },
  { group: 'Pages', label: 'Skills',         path: '/skills',         type: 'nav' },
  { group: 'Pages', label: 'Certifications', path: '/certifications', type: 'nav' },
  { group: 'Pages', label: 'Leadership',     path: '/leadership',     type: 'nav' },
  { group: 'Pages', label: 'Beyond Code',    path: '/hobbies',        type: 'nav' },
  { group: 'Pages', label: 'Contact',        path: '/contact',        type: 'nav' },
  { group: 'Links', label: 'GitHub',         url: 'https://github.com/harishm17',           type: 'link', hint: '↗' },
  { group: 'Links', label: 'LinkedIn',       url: 'https://linkedin.com/in/harishm17',      type: 'link', hint: '↗' },
  { group: 'Links', label: 'Download Resume', url: '/HarishManoharan.pdf', type: 'download', hint: '↓' },
  { group: 'Links', label: 'Send Email',     url: 'mailto:harish_manoharan@outlook.com',   type: 'link', hint: '✉' },
]

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery]       = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)
  const listRef  = useRef(null)
  const navigate = useNavigate()

  const filtered = ACTIONS.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase())
  )

  // Group for display
  const groups = filtered.reduce((acc, action, idx) => {
    if (!acc[action.group]) acc[action.group] = []
    acc[action.group].push({ ...action, flatIdx: idx })
    return acc
  }, {})

  const execute = useCallback((action) => {
    if (action.type === 'nav') {
      navigate(action.path)
    } else if (action.type === 'download') {
      const a = document.createElement('a')
      a.href = action.url; a.download = ''; a.click()
    } else {
      window.open(action.url, action.url.startsWith('mailto') ? '_self' : '_blank')
    }
    onClose()
  }, [navigate, onClose])

  // Keyboard nav
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx(i => Math.min(i + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx(i => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && filtered[activeIdx]) {
        execute(filtered[activeIdx])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, activeIdx, execute, onClose])

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => { setActiveIdx(0) }, [query])

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector('.cmd-item--active')
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  if (!open) return null

  return (
    <div className="cmd-backdrop" onMouseDown={() => onClose()}>
      <div className="cmd-panel" onMouseDown={e => e.stopPropagation()}>
        {/* Search input */}
        <div className="cmd-search-row">
          <svg className="cmd-search-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            className="cmd-input mono"
            placeholder="Search pages, links..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="cmd-esc-key mono" onClick={onClose}>ESC</kbd>
        </div>

        <div className="cmd-divider" />

        {/* Results */}
        <div className="cmd-results" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="cmd-empty mono">No results for &ldquo;{query}&rdquo;</div>
          ) : (
            Object.entries(groups).map(([group, items]) => (
              <div key={group} className="cmd-group">
                <div className="cmd-group-label mono">{group}</div>
                {items.map((action) => (
                  <div
                    key={action.label}
                    className={`cmd-item${action.flatIdx === activeIdx ? ' cmd-item--active' : ''}`}
                    onMouseEnter={() => setActiveIdx(action.flatIdx)}
                    onMouseDown={() => execute(action)}
                  >
                    <span className="cmd-item-icon">
                      {action.type === 'nav' ? (
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : action.hint === '↓' ? (
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                          <path d="M8 3v8M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : action.hint === '✉' ? (
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                          <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M2 5.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                          <path d="M5 11L11 5M7 5h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span className="cmd-item-label">{action.label}</span>
                    {action.type === 'nav' && (
                      <span className="cmd-item-path mono">{action.path}</span>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="cmd-footer mono">
          <span className="cmd-footer-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span className="cmd-footer-hint"><kbd>↵</kbd> open</span>
          <span className="cmd-footer-hint"><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
