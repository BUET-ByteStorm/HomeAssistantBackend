const express = require('express')
// import express from 'express';
const fileUpload = require('express-fileupload')
// import fileUpload from 'express-fileupload';
const cors = require('cors')
const bodyParser = require('body-parser')
const request = require('request')

const fromFile = require('./SpeechRecognition.js')
const uploadRouter = require('./Routes/uploadRouter.js')
const notesRouter = require('./Routes/notesRouter.js')
const authRouter = require('./Routes/auth.router.js')
// import authRouter from './Routes/auth.router'
const app = express()

const collection = new Map()

const rateLimiter = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        var cur = new Date();
        var last = collection.get(ip);
        const diffTime = Math.abs(cur - last);
        console.log("Time  :: " + diffTime);
        collection.set(ip, new Date())

        if (isNaN(diffTime) || diffTime >= 1000) {
            next();
        }
        else {
            res.send("Too many requests");
        }
}

app.use(rateLimiter);

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