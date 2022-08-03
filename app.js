const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')
const router = require('./routes/router')

// middlewares
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1', router)

const port = process.env.APP_PORT || 3000

const start = async() => {
    try {
        app.listen(port, console.log(`app is listening at port ${port}...`))
    } catch (err) {
        console.log(err.message)
    }
}

start()