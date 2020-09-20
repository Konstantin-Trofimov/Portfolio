const path = require('path')
const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const mailer = require('./nodemailer')

const PORT = process.env.PORT || 3030

let data = undefined


app.use(express.static(path.join(__dirname, 'static')))
app.use('/', bodyParser.urlencoded({
    extended: true
}));
app.use('/', router)

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname + '/static/views/error.html'));
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong...')
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

router.get('/policy', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/views/policy.html'));
});



app.post('/', function (req, res, next) {
    data = req.body
    const message = {
        subject: 'Message from Portfolio',
        html:
            ` 
            <p>Имя: <strong>${req.body.name}</strong></p> 
            <p>Email: <strong>${req.body.email}</strong></p> 
            <hr>
            <p>${req.body.text}</p>
            
        `
    }
    mailer(message)
    res.redirect('/')
});



app.listen(PORT, () => {
    console.log(__dirname)
    console.log(`Server has been started on ${PORT}...`)
})

