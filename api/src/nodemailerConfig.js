const nodemailer = require('nodemailer');
const transport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  transport({
    service: 'gmail',
    auth: {
      user: 'petcareamerica@gmail.com',
      pass: '03782630'
    }
  })
);

module.exports = transporter;