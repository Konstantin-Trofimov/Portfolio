const express = require('express')
const bodyparser = require('body-parser')
const server = express()
const http = require('http')
const fs = require('fs')
const path = require('path')
const router = express.Router();

server.use(express.static(path.join(__dirname, 'dist')));

router.get('/', function (req, res) {
    let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url)
    res.sendFile(filePath)
});



const PORT = process.env.PROT || 3000
server.listen(3000, () => {
    console.log(`Server has been started on ${PORT}...`)
})

