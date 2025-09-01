export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'yuborajroy00@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    
    const mailOptions = {
      from: `"Contact Form" <${process.env.GMAIL_USER || 'yuborajroy00@gmail.com'}>`,
      to: 'yuborajroy00@gmail.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from ProjectHub contact form</em></p>
      `,
      replyTo: email
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: "Failed to submit contact form" });
  }
}