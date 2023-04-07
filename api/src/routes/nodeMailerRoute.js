const transporter = require("../nodemailerConfig")

const nodeMailerRoutes = [
    {
        method: 'POST',
        path: '/send-email',
        handler: async (request, h) => {
            const { to, subject, text } = request.payload;

            const mailOptions = {
                from: 'sender@example.com',
                to: to,
                subject: subject,
                text: text
            };

            await transporter.sendMail(mailOptions);

            return 'Email sent';
        }
    }
]

module.exports=nodeMailerRoutes