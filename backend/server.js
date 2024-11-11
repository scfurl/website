const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send', (req, res) => {
  const formData = req.body;

  // Configure your SMTP transporter
  let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your_email@example.com',
      pass: 'your_email_password',
    },
  });

  // Prepare the email
  let mailOptions = {
    from: '"Referral Form" <your_email@example.com>',
    to: 'referral@cascaderetina.com',
    subject: `New Patient Referral from Dr. ${formData.doctorName}`,
    html: `
      <h2>Patient Information</h2>
      <p><strong>Name:</strong> ${formData.patientName}</p>
      <!-- Include other form data similarly -->
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    }
    res.send('Email sent successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
