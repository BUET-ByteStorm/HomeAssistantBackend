const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')

const fromFile = require('./SpeechRecognition.js')
const uploadRouter = require('./Routes/uploadRouter.js')

const app = express()

app.use(fileUpload())
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use('/upload-file', uploadRouter)

app.listen(process.env.PORT || 3000)