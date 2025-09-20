// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. smtp.mailtrap.io or smtp.gmail.com
  port: Number(process.env.SMTP_PORT || 587), // 2525 (Mailtrap), 587 (TLS), 465 (SSL)
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587/2525
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function verifyTransport() {
  try {
    await transporter.verify();
    console.log('✅ Mail transport is ready');
  } catch (e) {
    console.error('❌ Mail transport failed:', e.message);
  }
}

async function sendMail({ to, subject, html, text }) {
  const from =
    process.env.MAIL_FROM || '"Pawsitive Home" <no-reply@pawsitive.test>';
  const info = await transporter.sendMail({ from, to, subject, html, text });
  console.log('📧 Mail sent:', info.messageId);
  return info;
}

module.exports = { transporter, verifyTransport, sendMail };
