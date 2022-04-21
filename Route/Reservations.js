const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const twilio = require('twilio')
require('dotenv').config()

const Reservations = require('../Models/Reservations')

router.use((req, res, next) => {

    console.log('Time: ', Date.now())
    next()

})


router.get('/', (req, res) => {

    Reservations.find()
        .then(reser => {
            res.status(200).json(reser)
        })

        .catch(err => {
            res.status(404).json({'Error' : 'Can not fetch data.'})
        })
   
})

router.post('/', (req, res) => {

    Reservations.findOne({nom : req.body.nom}, (err, salle) => {

        if(!salle){

            let sal = new Salles({
                _id : mongoose.Types.ObjectId(),
                //
            })

            sal.save()
                .then(sa => {
                    res.status(200).json({'Success' : 'Reservation was added.'})
                })

                .catch(err => {
                    res.status(400).json({'Error' : 'Can not save this Reservation.'})
                })
        }

        else{
            res.status(403).json({'Forbidden' : 'This Reservation already exist.'})
        }
    })

})

router.get('/:id', (req, res) => {

    Reservations.findById(req.params.id, (err, reser) => {
        err ? res.status(404).json({'Error' : 'Can not fetch data.'}) : res.json(reser);
    })

})

router.patch('/:id', (req, res) => {

    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Reservations.update({_id : req.params.id}, {$set : updateOps})
        .then(reser => {
            res.status(200).json({'Success' : 'Reservation was updated.'});
        })

        .catch(err => {
            res.status(400).send({'Error' : 'Can not update the Reservation.'});
        })

})

router.delete('/:id', (req, res) => {

    Reservations.remove({_id : req.params.id})
        .exec() 
        .then(reser => {
            res.status(200).json({'Success' : 'Reservation was deleted.'});
        })

        .catch(err => {
            res.status(400).send({'Error' : 'Delete not possible.'});
        })

})

router.post('/filtres', (req, res) => {

    Reservations.find({[req.body.propName] : [req.body.value]}, (err, reservations) =>  {
        err ? res.status(404).json({'Error' : 'Can not fetch data.'}) : res.json(reservations);
    })

})

router.post('/mail', (req, res) => {

    // var transport = nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     secure : false,
    //     auth: {
    //        user: "ad2095baaa5d27",
    //        pass: "0b9e0aa86cef37"
    //     },
    //     tls : {
    //            rejectUnauthorized : false
    //     }
    // });

    var transporter = nodemailer.createTransport({
        // service: 'gmail',
        host : process.env.SMTP_HOST,
        port : '',
        secure : false,
        auth: {
           user: process.env.SMTP_USER,
           pass: process.env.SMTP_PASS
        },
        tls : {
           rejectUnauthorized : false
        }
    })

    const output = `
        <p> Confirmation de reservation </p>
        <h3> Salle : Nom </h3> 

        <ul>
            <li>Adresse : </li>
            <li>Etc.. </li>
            <li>Etc.. </li>
            <li>Etc.. </li>
        </ul>

        <h3> Message </h3>
        <p> </p>
    `

    var mailOptions = {
        from: process.env.MAIL_FROM,
        to: req.body.to,
        subject: 'EventShall',
        html : output
    }

    transport.sendMail(mailOptions, function(error, info){
        if (error) {
           console.log('Error : ' + error)
        } else {
           console.log('Email sent : ' + info.response)
           console.log('Email sent : ' + info);
        //    console.log(process.env.MAIL_FROM)
        }
    })

})

router.post('/message', (req, res) => {

    let message = ``

    var client = new twilio('')

    client.messages.create({
        to : '',
        from : '',
        body : message 
    })

    res.send('Message sent')

})

module.exports = router