import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, getTemplateParams } from '../config/emailjs'
import './Pages.css'
import './ContactPage.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        getTemplateParams(formData),
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      setStatus('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page contact-page">
      <div className="contact-inner">
        <div className="page-header" style={{textAlign: 'center'}}>
          <div className="section-eyebrow" style={{justifyContent: 'center'}}>Say Hello</div>
          <h1 className="page-title">LET&apos;S TALK</h1>
          <p className="page-subtitle" style={{maxWidth: 420, margin: '0 auto 48px'}}>
            Whether it&apos;s a project, opportunity, or just a conversation, I&apos;m always open to connecting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-field">
            <label className="contact-label mono" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="contact-input"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="contact-field">
            <label className="contact-label mono" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="contact-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="contact-field">
            <label className="contact-label mono" htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="contact-input"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="contact-field">
            <label className="contact-label mono" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="contact-input contact-textarea"
              placeholder="What's on your mind?"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary contact-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message →'}
          </button>

          {status === 'sent' && (
            <p className="contact-success mono">Message sent! I&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="contact-error mono">Something went wrong. Try emailing directly.</p>
          )}
        </form>

        <div className="contact-socials">
          <a href="https://github.com/harishm17" target="_blank" rel="noopener noreferrer" className="tech-tag">GitHub</a>
          <a href="https://linkedin.com/in/harishm17" target="_blank" rel="noopener noreferrer" className="tech-tag">LinkedIn</a>
          <a href="mailto:harish_manoharan@outlook.com" className="tech-tag">Email</a>
        </div>
      </div>
    </div>
  )
}
