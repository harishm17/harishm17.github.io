import './Pages.css'
import './HobbiesPage.css'

const hobbies = [
  {
    emoji: '♔',
    name: 'CHESS',
    description: 'Active on Chess.com (@pika_pika17) and Lichess (@harishm17). Always up for a game.',
  },
  {
    emoji: '💻',
    name: 'COMPETITIVE PROGRAMMING',
    description: 'Solving algorithmic challenges on Codeforces (@harishm) and bioinformatics puzzles on Rosalind (@harishm).',
  },
  {
    emoji: '⚽',
    name: 'SPORTS',
    description: 'Football (soccer) and tennis recreationally; table tennis competitively.',
  },
  {
    emoji: '📚',
    name: 'READING',
    description: 'Currently: Flowers for Algernon by Daniel Keyes. Recently finished: Factfulness by Hans Rosling (5/5).',
  },
  {
    emoji: '😄',
    name: 'XKCD',
    description: 'Randall Munroe\'s webcomic, a staple of engineering humor and clever observations.',
  },
]

export default function HobbiesPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Beyond Code</div>
        <h1 className="page-title">HOBBIES</h1>
        <p className="page-subtitle">Life happens outside the terminal too.</p>
      </div>

      <div className="hobbies-grid">
        {hobbies.map((h, i) => (
          <div key={i} className="hobby-tile glass-card reveal">
            <div className="hobby-emoji">{h.emoji}</div>
            <div className="hobby-name display">{h.name}</div>
            {h.description && <p className="details">{h.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
