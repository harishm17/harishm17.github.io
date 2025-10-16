import { useState, useEffect } from 'react'
import './HobbiesPage.css'

function HobbiesPage() {
  const [xkcdComic, setXkcdComic] = useState(null)
  const [loading, setLoading] = useState(false)
  const chessProfiles = [
    {
      platform: "Chess.com",
      username: "pika_pika17",
      icon: "♟️",
      url: "https://www.chess.com/member/pika_pika17",
      color: "#7fa650"
    },
    {
      platform: "Lichess",
      username: "harishm17",
      icon: "♞",
      url: "https://lichess.org/@/harishm17",
      color: "#000000"
    }
  ]

  const codingProfiles = [
    {
      platform: "Codeforces",
      username: "harishm",
      icon: "🏆",
      url: "https://codeforces.com/profile/harishm",
      color: "#1f8dd6",
      description: "Competitive Programming"
    },
    {
      platform: "Rosalind",
      username: "harishm",
      icon: "🧬",
      url: "https://rosalind.info/users/harishm",
      color: "#2ecc71",
      description: "Bioinformatics Challenges"
    }
  ]

  const sportsHobbies = [
    {
      name: "Football (Soccer) 🔟🐐",
      icon: "⚽",
      description: "Recreational",
      color: "#00A650"
    },
    {
      name: "Tennis",
      icon: "🎾",
      description: "Recreational",
      color: "#FFD700"
    },
    {
      name: "Table Tennis",
      icon: "🏓",
      description: "Competitive",
      color: "#E74C3C"
    }
  ]

  const readingList = [
    {
      title: "Flowers for Algernon",
      author: "Daniel Keyes",
      icon: "📖",
      status: "Currently Reading",
      color: "#8B4513"
    },
    {
      title: "Factfulness: Ten Reasons We're Wrong About the World – and Why Things Are Better Than You Think",
      author: "Hans Rosling, Ola Rosling, Anna Rosling Rönnlund",
      icon: "✅",
      status: "Just Completed",
      rating: 4,
      color: "#16a34a"
    }
  ]

  // Fetch random xkcd comic
  const fetchRandomComic = async () => {
    setLoading(true)
    try {
      // First get the latest comic number
      const latestResponse = await fetch('https://xkcd.vercel.app/?comic=latest')
      const latestData = await latestResponse.json()
      const maxNum = latestData.num

      // Get a random comic number
      const randomNum = Math.floor(Math.random() * maxNum) + 1

      // Fetch the random comic
      const comicResponse = await fetch(`https://xkcd.vercel.app/?comic=${randomNum}`)
      const comicData = await comicResponse.json()

      setXkcdComic(comicData)
    } catch (error) {
      console.error('Error fetching xkcd comic:', error)
      // Set error state to show fallback message
      setXkcdComic(null)
    } finally {
      setLoading(false)
    }
  }

  // Load a random comic on mount
  useEffect(() => {
    fetchRandomComic()
  }, [])

  return (
    <div className="page hobbies-page">
      <div className="last-updated">Last Updated: Mid October, 2025</div>
      <h1 className="page-title">Beyond Code</h1>
      <p className="page-subtitle">
        When I'm not building software, you'll find me on the chessboard, solving algorithms, playing sports, or diving into a good book
      </p>

      <div className="hobbies-container">
        {/* Reading Section */}
        <div className="hobby-section">
          <div className="hobby-header">
            <h2>📚 Reading</h2>
          </div>
          <div className="profiles-grid">
            {readingList.map((book, index) => (
              <div
                key={index}
                className="profile-card book-card"
                style={{ '--card-color': book.color }}
              >
                <div className="profile-icon">{book.icon}</div>
                <div className="profile-info">
                  <h3>{book.title}</h3>
                  <p className="username">{book.author}</p>
                  <p className="description">{book.status}</p>
                  {book.rating && (
                    <div className="book-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < book.rating ? "star-filled" : "star-empty"}>
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chess Section */}
        <div className="hobby-section">
          <div className="hobby-header">
            <h2>♔ Chess</h2>
          </div>
          <div className="profiles-grid">
            {chessProfiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-card chess-card"
                style={{ '--card-color': profile.color }}
              >
                <div className="profile-icon">{profile.icon}</div>
                <div className="profile-info">
                  <h3>{profile.platform}</h3>
                  <p className="username">@{profile.username}</p>
                  <span className="visit-link">Visit Profile →</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Competitive Programming Section */}
        <div className="hobby-section">
          <div className="hobby-header">
            <h2>💻 Competitive Programming & Challenges</h2>
          </div>
          <div className="profiles-grid">
            {codingProfiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-card coding-card"
                style={{ '--card-color': profile.color }}
              >
                <div className="profile-icon">{profile.icon}</div>
                <div className="profile-info">
                  <h3>{profile.platform}</h3>
                  <p className="username">@{profile.username}</p>
                  <p className="description">{profile.description}</p>
                  <span className="visit-link">Visit Profile →</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Sports Section */}
        <div className="hobby-section">
          <div className="hobby-header">
            <h2>⚽ Sports</h2>
          </div>
          <div className="profiles-grid">
            {sportsHobbies.map((sport, index) => (
              <div
                key={index}
                className="profile-card sport-card"
                style={{ '--card-color': sport.color }}
              >
                <div className="profile-icon">{sport.icon}</div>
                <div className="profile-info">
                  <h3>{sport.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* xkcd Section */}
        <div className="hobby-section xkcd-section">
          <div className="hobby-header">
            <h2>😄 A Little Humor</h2>
          </div>
          <div className="xkcd-container">
            {loading ? (
              <div className="xkcd-loading">Loading comic...</div>
            ) : xkcdComic ? (
              <div className="xkcd-comic">
                <h3 className="xkcd-title">
                  #{xkcdComic.num}: {xkcdComic.title}
                </h3>
                <img
                  src={xkcdComic.img}
                  alt={xkcdComic.alt}
                  title={xkcdComic.alt}
                  className="xkcd-image"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    setXkcdComic(null)
                  }}
                />
                <p className="xkcd-date">
                  {xkcdComic.month}/{xkcdComic.day}/{xkcdComic.year}
                </p>
                <button
                  className="randomize-button"
                  onClick={fetchRandomComic}
                  disabled={loading}
                >
                  🎲 Random Comic
                </button>
              </div>
            ) : (
              <div className="xkcd-error">
                <p>Unable to load comic at the moment.</p>
                <button
                  className="randomize-button"
                  onClick={fetchRandomComic}
                  disabled={loading}
                  style={{ marginTop: '15px' }}
                >
                  🔄 Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HobbiesPage
