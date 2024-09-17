const nodemailer = require('nodemailer');
const { config } = require('dotenv');
config();

const mailer = async (message, recipient) => {
  const sender = process.env.SENDER
  const pass = process.env.PASS_MAIL

  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, 
    auth: {
      user: sender,
      pass: pass,
    },
  });


  const mailOptions = {
    from: sender,
    to: recipient,
    subject: '...OLOLOLOLO...',
    text: message,
    html: `<i>${message}</i>`,
  };


  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
};


module.exports = { mailer };
