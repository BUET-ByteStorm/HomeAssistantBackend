const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello There')
})

app.listen(process.env.PORT || 3000)