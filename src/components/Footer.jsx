import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>© {currentYear} Harish Manoharan</p>
      </div>
    </footer>
  )
}

export default Footer
