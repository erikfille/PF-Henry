const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();
const fs = require("fs");
const Path = require("path");

const bienvenidaEmail = async (email,name) => {
  // Enviar un correo electrónico de bienvenida al usuario
  const accountTransport = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_ADDRESS,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  };

  const mail_rover = async (callback) => {
    try {
      const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        "https://developers.google.com/oauthplayground"
      );
      oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken,
        tls: {
          rejectUnauthorized: false,
        },
      });
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        accountTransport.auth.accessToken = token;
        const transporter = nodemailer.createTransport(accountTransport);
        callback(transporter);
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el transportador de correo.");
    }
  };

  const transporter = await new Promise((resolve, reject) => {
    mail_rover(resolve);
  });

  const html = fs.readFileSync(
    Path.join(__dirname, "../emails/bienvenida.html"),
    "utf-8",
    {base:__dirname}
  )
  const emailHtml = html.replace("{{name}}", name);

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "¡Bienvenido a nuestra aplicación!",
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
}


module.exports = {
    bienvenidaEmail
}