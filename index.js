const express = require('express')
const connectDB = require('./DB/Connection')
const app = express()

const bodyparser = require('body-parser')
const cors = require('cors')

    const PORT = process.env.Port || 3000

    app.use(cors())
    app.use(bodyparser.urlencoded({extended : false}))
    app.use(bodyparser.json())

    app.use('/users', require('./Route/Users'))
    app.use('/reservations', require('./Route/Reservations'))
    app.use('/salles', require('./Route/Salles'))

    connectDB()

    app.listen(PORT, () => {
        console.log('Server now running on port : ' + PORT)
    })