const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './users/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({storage : storage})

const Salles = require('../Models/Salles')

router.use((req, res, next) => {

    console.log('Time: ', Date.now())
    next()

})


router.get('/', (req, res) => {

    Salles.find()
        .then(sal => {
            res.status(200).json(sal)
        })

        .catch(err => {
            res.status(404).json({'Error' : 'Can not fetch data.'})
        })
   
})

router.post('/images', upload.array('images'), (req, res) => {
    // console.log(req.files)
    // faire la mise a jour
})

router.post('/', upload.array('images'), (req, res) => {

    // pas de condition
    // console.log(req.files)
    Salles.findOne({nom : req.body.nom}, (err, salle) => {

        if(!salle){

            let sal = new Salles({
                _id : mongoose.Types.ObjectId(),
                //
            })

            sal.save()
                .then(sa => {
                    res.status(200).json({'Success' : 'Salle was added.'})
                })

                .catch(err => {
                    res.status(400).json({'Error' : 'Can not save this Salle.'})
                })
        }

        else{
            res.status(403).json({'Forbidden' : 'This Salle already exist.'})
        }
    })

})

router.get('/:id', (req, res) => {

    Salles.findById(req.params.id, (err, sal) => {
        err ? res.status(404).json({'Error' : 'Can not fetch data.'}) : res.json(sal);
    })

})


router.patch('/:id', (req, res) => {

    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Salles.update({_id : req.params.id}, {$set : updateOps})
        .then(sal => {
            res.status(200).json({'Success' : 'Salle was updated.'});
        })

        .catch(err => {
            res.status(400).send({'Error' : 'Can not update the Salle.'});
        })

})

router.delete('/:id', (req, res) => {

    Salles.remove({_id : req.params.id})
        .exec() 
        .then(sal => {
            res.status(200).json({'Success' : 'Salle was deleted.'});
        })

        .catch(err => {
            res.status(400).send({'Error' : 'Delete not possible.'});
        })

})

router.post('/filtres', (req, res) => {

    Salles.find({[req.body.propName] : [req.body.value]}, (err, salles) =>  {
        err ? res.status(404).json({'Error' : 'Can not fetch data.'}) : res.json(salles);
    })

})

router.post('/distance', (req, res) => {

    // var voiture = vitesse moyenne, est-ce que la vitesse est figee ?
    // var pied = vitesse moyenne

    function toRad(value) 
    {
        return Value * Math.PI / 180;
    }
    
    var R = 6371; // km
    var dLat = toRad([req.body.lat2] - [req.body.lat1]);
    var dLon = toRad([req.body.lon2] - [req.body.lon1]);
    var lat1 = toRad([req.body.lat1]);
    var lat2 = toRad([req.body.lat2]);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;

    console.log('Distance = ' + d + ' km.')

    // si a pied divise par pied sinon par voiture
    // temps en heure = distance / vitesse
    // temps en minute ?
    // res.json(temps)
    
    res.json(
        {   
            'Distance' : d,
            // 'Marche' : ,
            // 'Voiture' : ,
        }
    )
      
})


module.exports = router