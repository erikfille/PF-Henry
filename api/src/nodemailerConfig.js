const nodemailer = require('nodemailer');
const transport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  transport({
    service: 'gmail',
    auth: {
      user: 'petscareamerica@yahoo.com',
      pass: 'PetsCare1234567891'
    }
  })
);

module.exports = transporter;