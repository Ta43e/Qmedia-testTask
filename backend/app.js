const { json } = require('body-parser');
const express = require('express');
const {mailer} = require('./nodemailer');
const app = express();
app.use(express.json())
const port = 3001;

app.post('/sendEmail', (req, res) => {
    const { name, email, seminar } = req.body;
    mailer(seminar, email)
  console.log(`Email sent to: ${email}, for seminar: ${seminar}`);
  res.json({ message: 'Email sent successfully!' });

})

app.listen(port, () => {
    console.log('Example project!');
})