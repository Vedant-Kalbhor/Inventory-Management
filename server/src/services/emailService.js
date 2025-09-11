// placeholder — integrate your preferred provider later
async function sendEmail({ to, subject, text, html }) {
    // Implement actual email sending using nodemailer / external API
    // For now just print
    
    console.log('Sending email', { to, subject });
  }
  
  module.exports = { sendEmail };
  