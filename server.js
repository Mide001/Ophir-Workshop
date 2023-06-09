const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
require('dotenv').config();
const port = 3002;


// configure the middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tweet.html'));
});

app.get('/workshop-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tweetForm.html'));
});

// define the route to handle form submissions
app.post('/submit-form', (req, res) => {
  const name = req.body.inputName;
  const email = req.body.inputEmail;
  const twitter = req.body.inputTwitter;
  const discord = req.body.inputDiscord;

  // create a transporter object using your email service provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: "guyd36188@gmail.com", // replace with your email address
      pass: "ynixzzmpevsfzoug" // replace with your email password
    }
  });

  // define the email message
  const message = {
    from: 'guyd36188@gmail.com', // replace with your email address
    to: 'olamideisreal5@gmail.com', // replace with the recipient's email address
    subject: 'Ophir Workshop Form Entry',
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Twitter ID: ${twitter}</p>
      <p>Discord ID: ${discord}</p>
    `
  };

  // send the email
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error: Unable to send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.sendFile(path.join(__dirname, 'views', 'success.html'));
    }
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
