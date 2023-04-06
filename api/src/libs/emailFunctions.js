const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2
const accountTransport = require("../account_transport.json")


const mail_rover = async (callback) => {
    try {
      const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        "https://developers.google.com/oauthplayground",
      );
      oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken,
        tls: {
          rejectUnauthorized: false
        }
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

module.exports = {
    mail_rover
}