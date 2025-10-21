# Contact Form Setup Guide

## EmailJS Setup Instructions

Your contact form is now configured to use EmailJS for sending emails. Follow these steps to complete the setup:

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Copy the Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Go to "Account" → "General"
2. **Copy your Public Key** (e.g., `user_abc123def456`)

### 5. Update Configuration
1. Open `src/config/emailjs.js`
2. Replace the placeholder values:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',     // Replace this
  TEMPLATE_ID: 'your_actual_template_id',  // Replace this
  PUBLIC_KEY: 'your_actual_public_key',    // Replace this
  TO_EMAIL: 'harish.manoharan@utdallas.edu'
}
```

### 6. Test the Form
1. Start your development server: `npm run dev`
2. Go to the contact page
3. Fill out and submit the form
4. Check your email for the message

## Alternative: Formspree Setup (Easier)

If you prefer a simpler setup, you can use Formspree instead:

### 1. Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. **Copy your form endpoint** (e.g., `https://formspree.io/f/abc123`)

### 2. Update Contact Form
Replace the EmailJS implementation in `src/pages/ContactPage.jsx` with:

```javascript
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
    const response = await fetch('YOUR_FORMSPREE_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } else {
      throw new Error('Failed to send message')
    }
  } catch (error) {
    console.error('Error sending email:', error)
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
    setTimeout(() => setSubmitStatus(null), 5000)
  }
}
```

## Features Added

✅ **Real email sending** - Messages will be sent to your email address
✅ **Error handling** - Shows success/error messages to users
✅ **Form validation** - Client-side validation before sending
✅ **Loading states** - Shows loading spinner during submission
✅ **Responsive design** - Works on all devices

## Troubleshooting

- **"Service not found"**: Check your Service ID
- **"Template not found"**: Check your Template ID  
- **"Invalid public key"**: Check your Public Key
- **Emails not received**: Check spam folder, verify email service setup

## Free Tier Limits

- **EmailJS**: 200 emails/month
- **Formspree**: 50 submissions/month

Both services offer paid plans for higher limits.
