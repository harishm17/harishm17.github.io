import { useEffect, useState } from 'react'
import './Pages.css'
import './HobbiesPage.css'

const hobbies = [
  {
    href: 'https://lichess.org/@/harishm17',
    cta: 'Open Lichess',
    category: 'Strategy',
    name: 'CHESS',
    description: 'Fast games, endgame puzzles, and the occasional opening rabbit hole.',
    links: [
      { label: 'Lichess', href: 'https://lichess.org/@/harishm17' },
      { label: 'Chess.com', href: 'https://www.chess.com/member/pika_pika17' },
    ],
  },
  {
    href: 'https://codeforces.com/profile/harishm',
    cta: 'Open Codeforces',
    category: 'Competition',
    name: 'COMPETITIVE PROGRAMMING',
    description: 'Algorithmic contests and bioinformatics problem sets. This is where I sharpen implementation speed.',
    links: [
      { label: 'Codeforces', href: 'https://codeforces.com/profile/harishm' },
      { label: 'Rosalind', href: 'https://rosalind.info/users/harishm/' },
    ],
  },
  {
    href: 'https://www.ittf.com/',
    cta: 'Table Tennis',
    category: 'Movement',
    name: 'SPORTS',
    description: 'Football and tennis recreationally, with table tennis on the more competitive side. A good reset after long build sessions.',
    links: [
      { label: 'Table Tennis', href: 'https://www.ittf.com/' },
      { label: 'Tennis', href: 'https://www.atptour.com/' },
    ],
  },
  {
    href: 'https://www.goodreads.com/book/show/18373.Flowers_for_Algernon',
    cta: 'Current Read',
    category: 'Reading',
    name: 'READING',
    description: 'A mix of fiction and non-fiction. Currently reading Flowers for Algernon; recently finished Factfulness.',
    links: [
      { label: 'Flowers for Algernon', href: 'https://www.goodreads.com/book/show/18373.Flowers_for_Algernon' },
      { label: 'Factfulness', href: 'https://www.goodreads.com/book/show/34890015-factfulness' },
    ],
  },
  {
    href: 'https://xkcd.com/',
    cta: 'Open XKCD',
    category: 'Internet',
    name: 'XKCD',
    description: 'Loading a comic...',
  },
]

export default function HobbiesPage() {
  const [comic, setComic] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadComic() {
      try {
        const latestRes = await fetch('https://xkcd.com/info.0.json')
        if (!latestRes.ok) throw new Error('latest comic fetch failed')
        const latest = await latestRes.json()

        const targetNum = Math.max(1, Math.floor(Math.random() * latest.num) + 1)
        const comicRes = await fetch(`https://xkcd.com/${targetNum}/info.0.json`)
        const selected = comicRes.ok ? await comicRes.json() : latest

        if (!cancelled) setComic(selected)
      } catch {
        if (!cancelled) setComic(false)
      }
    }

    loadComic()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Beyond Code</div>
        <h1 className="page-title">HOBBIES</h1>
        <p className="page-subtitle">What I spend time on when I am not building software.</p>
      </div>

      <div className="hobbies-grid">
        {hobbies.map((h, i) => (
          <a
            key={h.name}
            href={h.name === 'XKCD' && comic && comic !== false ? `https://xkcd.com/${comic.num}/` : h.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hobby-card glass-card reveal"
          >
            <div className="hobby-card__top">
              <div className="hobby-card__category mono">{h.category}</div>
              <div className="hobby-card__cta mono">{h.cta}</div>
            </div>
            <div className="hobby-card__body">
              <div className="hobby-name display">{h.name}</div>
              {h.name === 'XKCD' ? (
                comic && comic !== false ? (
                  <>
                    <p className="details hobby-card__details">{comic.safe_title}</p>
                    <p className="hobby-card__quote">&ldquo;{comic.alt}&rdquo;</p>
                  </>
                ) : comic === false ? (
                  <p className="details hobby-card__details">Could not load a comic right now. Open XKCD directly.</p>
                ) : (
                  <p className="details hobby-card__details">Loading a comic...</p>
                )
              ) : (
                <>
                  {h.description && <p className="details hobby-card__details">{h.description}</p>}
                  {!!h.links?.length && (
                    <div className="hobby-card__links">
                      {h.links.map(link => (
                        <span key={link.href} className="hobby-card__link mono">{link.label}</span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
