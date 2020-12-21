const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Users = require('../Models/Users')

router.use((req, res, next) => {

    console.log('Time: ', Date.now())
    next()

})


router.get('/', (req, res) => {

    Users.find()
        .then(user => {
            res.status(200).json(user)
        })

        .catch(err => {
            res.status(404).json({'Error' : 'Can not fetch data.'})
        })
   
})

module.exports = router