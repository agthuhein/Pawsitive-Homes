// utils/mailer.js
const nodemailer = require('nodemailer');

console.log('🔑 MAIL DEBUG:', {
  user: process.env.SMTP_USER,
  passExists: !!process.env.SMTP_PASS,
  passLength: process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0,
});

const transporter = nodemailer.createTransport({
  service: 'gmail', // 👈 use service instead of host for Gmail
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
    process.env.MAIL_FROM || `"Pawsitive Home" <${process.env.SMTP_USER}>`;
  const info = await transporter.sendMail({ from, to, subject, html, text });
  console.log('📧 Mail sent:', info.messageId);
  return info;
}

module.exports = { transporter, verifyTransport, sendMail };
