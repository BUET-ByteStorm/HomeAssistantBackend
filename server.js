const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')
const request = require('request')

const fromFile = require('./SpeechRecognition.js')
const uploadRouter = require('./Routes/uploadRouter.js')
const notesRouter = require('./Routes/notesRouter.js')

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

app.get('/', (req, res) => {
    request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})
    res.send('DONE')

})  

app.listen(process.env.PORT || 3000)