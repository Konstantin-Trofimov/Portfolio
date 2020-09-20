const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'te.st.01@mail.ru',
            pass: '2!gi#n4%00'
        }
    },
    {
        from: 'te.st.01@mail.ru',
        to: 'const.trofimov@gmail.com'
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) console.log(err)
        console.log(info)
    })
}

module.exports = mailer