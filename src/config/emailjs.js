// EmailJS Configuration
// Replace these with your actual EmailJS credentials
// Get these from: https://www.emailjs.com/

export const EMAILJS_CONFIG = {
  // Your EmailJS service ID (e.g., 'service_abc123')
  SERVICE_ID: 'service_stufuwo',
  
  // Your EmailJS template ID (e.g., 'template_xyz789')
  TEMPLATE_ID: 'template_578rc4n',
  
  // Your EmailJS public key (e.g., 'user_abc123def456')
  PUBLIC_KEY: 'uqdUlrvdd0CfS9mU8',
  
  // Your email address where you want to receive messages
  TO_EMAIL: 'harish.manoharan@utdallas.edu'
}

// Template variables that will be sent to EmailJS
export const getTemplateParams = (formData) => ({
  from_name: formData.name,
  from_email: formData.email,
  name: formData.name,        // For {{name}} in email body
  email: formData.email,      // For {{email}} in Reply To field
  subject: formData.subject,
  message: formData.message,
  to_email: EMAILJS_CONFIG.TO_EMAIL
})
