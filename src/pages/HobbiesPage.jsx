import './Pages.css'
import './HobbiesPage.css'

const hobbies = [
  {
    category: 'Strategy',
    eyebrow: 'Mind Games',
    name: 'CHESS',
    description: 'Active on Chess.com (@pika_pika17) and Lichess (@harishm17). Fast games, endgame puzzles, and the occasional opening rabbit hole.',
  },
  {
    category: 'Competition',
    eyebrow: 'Problem Solving',
    name: 'COMPETITIVE PROGRAMMING',
    description: 'Algorithmic contests on Codeforces (@harishm) and bioinformatics problem sets on Rosalind. This is where I sharpen implementation speed.',
  },
  {
    category: 'Movement',
    eyebrow: 'Off Screen',
    name: 'SPORTS',
    description: 'Football and tennis recreationally, with table tennis on the more competitive side. A good reset after long build sessions.',
  },
  {
    category: 'Reading',
    eyebrow: 'Long Form',
    name: 'READING',
    description: 'A mix of fiction and non-fiction. Currently reading Flowers for Algernon; recently finished Factfulness.',
  },
  {
    category: 'Internet',
    eyebrow: 'Recurring Favorite',
    name: 'XKCD',
    description: 'Randall Munroe\'s webcomic still holds up: concise, nerdy, and unusually good at turning technical instincts into jokes.',
  },
]

export default function HobbiesPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Beyond Code</div>
        <h1 className="page-title">HOBBIES</h1>
        <p className="page-subtitle">What I spend time on when I am not building software.</p>
      </div>

      <div className="hobbies-grid">
        {hobbies.map((h, i) => (
          <article key={i} className="hobby-card glass-card reveal">
            <div className="hobby-card__top">
              <div className="hobby-card__eyebrow mono">{h.eyebrow}</div>
              <div className="hobby-card__category mono">{h.category}</div>
            </div>
            <div className="hobby-name display">{h.name}</div>
            {h.description && <p className="details">{h.description}</p>}
          </article>
        ))}
      </div>
    </div>
  )
}
