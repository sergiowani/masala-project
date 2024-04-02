const { config } = require('dotenv');
const nodemailer=require('nodemailer')

async function sendMyMail(email, msg, subject){

  const config={
    host:"smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false
    },
    auth:{
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(config);

  // Enviar el mail
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    // html: "<div><h1>HOLA</h1></div>"
    html: msg
  })
  // console.log("MENSJE ENVIADO", info)
}

module.exports = sendMyMail;