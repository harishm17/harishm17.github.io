import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, getTemplateParams } from '../config/emailjs'
import ScrollFadeIn from '../components/ScrollFadeIn'
import './ContactPage.css'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showCopyToast, setShowCopyToast] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        getTemplateParams(formData),
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error sending email:', error)
      setIsSubmitting(false)
      setSubmitStatus('error')
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const copyEmailToClipboard = async () => {
    const email = 'harish.manoharan@utdallas.edu'
    try {
      await navigator.clipboard.writeText(email)
      setShowCopyToast(true)
      setTimeout(() => setShowCopyToast(false), 2000)
    } catch (error) {
      console.error('Failed to copy email:', error)
    }
  }

  return (
    <div className="page contact-page">
      <div className="last-updated">Last Updated: Mid October, 2025</div>

      <ScrollFadeIn>
        <h1 className="page-title">Get In Touch</h1>
        <p className="page-subtitle">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </ScrollFadeIn>

      <div className="contact-content">
        <ScrollFadeIn delay={100}>
          <div className="contact-info">
            <h2>Contact Information</h2>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">📧</div>
                <h3>Email</h3>
                <div className="email-container">
                  <a href="mailto:harish.manoharan@utdallas.edu">
                    harish.manoharan@utdallas.edu
                  </a>
                  <button 
                    className="copy-button" 
                    onClick={copyEmailToClipboard}
                    aria-label="Copy email to clipboard"
                    title="Copy email"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">💼</div>
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/harishm17" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/harishm17
                </a>
              </div>

              <div className="info-card">
                <div className="info-icon">💻</div>
                <h3>GitHub</h3>
                <a href="https://github.com/harishm17" target="_blank" rel="noopener noreferrer">
                  github.com/harishm17
                </a>
              </div>
            </div>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={200}>
          <div className="contact-form-container">
            <h2>Send a Message</h2>

            {submitStatus === 'success' && (
              <div className="success-message">
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-message">
                ❌ Sorry, there was an error sending your message. Please try again or contact me directly at harish.manoharan@utdallas.edu
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Your name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="your.email@example.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                  placeholder="What's this about?"
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Your message here..."
                  rows="6"
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="arrow">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </ScrollFadeIn>
      </div>

      {/* Copy Toast Notification */}
      {showCopyToast && (
        <div className="copy-toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Email copied to clipboard!
        </div>
      )}
    </div>
  )
}

export default ContactPage
