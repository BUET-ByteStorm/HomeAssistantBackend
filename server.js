const express = require('express')
const app = express()
const fromFile = require('./SpeechRecognition.js')

app.get('/', (req, res) => {
    res.send('Hello There')
})

app.get('/test-audio', async (req, res) => {
    fromFile(res)
})

app.listen(process.env.PORT || 3000)