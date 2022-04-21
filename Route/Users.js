const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({storage : storage})

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

router.post('/image', upload.single('image'),(req, res) => {
    // console.log(req.file)
})

router.post('/', upload.single('image'), (req, res) => {

    //condition sur l'email

})

router.get('/:id', (req, res) => {

    Users.findById(req.params.id, (err, user) => {
        err ? res.status(404).json({'Error' : 'Can not fetch data.'}) : res.json(user);
    })

})

router.patch('/:id', (req, res) => {

    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Users.update({_id : req.params.id}, {$set : updateOps})
        .then(user => {
            res.status(200).json({'Success' : 'User was updated.'});
        })

        .catch(err => {
            res.status(400).send({'Error' : 'Can not update the User.'});
        })

})

router.delete('/:id', (req, res) => {

    Users.remove({_id : req.params.id})
        .exec() 
        .then(user => {
            res.status(200).json({'Success' : 'User was deleted.'});
        })

        .catch(err => {
            res.status(400).send({'Error' : 'Delete not possible.'});
        })

})


router.post('/login', (req, res) => {

})

module.exports = router