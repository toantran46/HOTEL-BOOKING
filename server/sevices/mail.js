const nodemailler = require("nodemailer");
const { getDefaultSubjectByType } = require("../utils/global");

const transporter = nodemailler.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
})

const sendMail = (mailReceiver, type, infoBooking) => {
    return new Promise((resolve, reject) => {
        const { subject, html } = getDefaultSubjectByType(type, infoBooking);


        const mailOptions = {
            from: process.env.MAIL_USER,
            to: mailReceiver,
            subject,
            html
        }


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) reject(error);
            resolve(info.response);
        })
    })

}
module.exports = { sendMail };