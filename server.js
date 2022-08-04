const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const fromFile = require('./SpeechRecognition.js')
const uploadRouter = require('./Routes/uploadRouter.js')

app.use(express.json())

app.use('/upload-file', uploadRouter)

app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.send('Hello There')
})

app.get('/test-audio', async (req, res) => {
    fromFile(res)
})

app.listen(process.env.PORT || 3000)