const express = require('express')
const path = require('path')
const axios = require('axios').default

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.post('/contact', express.urlencoded({ extended: true }), (req, res) => {
  const { name, email, phoneNumber, message } = req.body

  axios
    .post(
      'https://api.mailjet.com/v3.1/send',
      {
        Messages: [
          {
            From: {
              Email: 'otagunolaniyi7@gmail.com',
              Name: 'Ashraf olaniyi Otagun',
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: 'Mail Response',
            Textpart: `This is a response to the email you filled\n Your name: ${name}\nYour Email: ${email}\nYour Phone Number: ${phoneNumber}\nYour message: ${message}\n\nThis is part HNG Internship Task - Stage 2`,
          },
        ],
      },
      {
        auth: {
          username: '8817518dc04189ae2f91e838cc9e10c2',
          password: '8de79b502f1239ab0e372341df8b0d09',
        },
      }
    )
    .then(() => {
      res.send('Mail sent!')
    })
    .catch(() => {
      res.send('An error occurred!')
    })
})

app.listen(PORT, () => {
  console.log(`server start on ${PORT}`)
})
