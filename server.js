const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')
const request = require('request')

const fromFile = require('./SpeechRecognition.js')
const uploadRouter = require('./Routes/uploadRouter.js')
const notesRouter = require('./Routes/notesRouter.js')
// const authRouter = require('./Routes/auth.router')
import authRouter from './Routes/auth.router'
const app = express()

app.use(fileUpload())
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use('/upload-file', uploadRouter)

app.use('/notes', notesRouter)
app.use('/auth', authRouter)
app.listen(process.env.PORT || 3000)