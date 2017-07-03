const express = require('express');
const router = express.Router();
const Custom = require('../models/custom');
const Event = require('../models/event');
const nodeGeo = require('node-geocoder');
var options = {provider: 'google'};
var geoCoder = nodeGeo(options);

router.get('/find', function(req, res, next){
    Event
        .find({})
        .then(function(event) {
            res.send(event);
        });
});

router.post('/custom', function(req, res, next) {
    Custom
        .create(req.body)
        .then(function(custom) {
            res.send(custom);
        }).catch(next);
});

router.delete('/custom/:id', function(req, res, next) {
    Custom
        .findByIdAndRemove({_id: req.params.id})
        .then(function(custom) {
            res.send(custom);
        });
});

router.post('/organize',function(req,res, next){
    geoCoder.reverse({lat:req.body.lat, lon:req.body.lng})
        .then(function(res) {
            let tmpObj = req.body;
            tmpObj.street = res[0].streetName;

            console.log(tmpObj);
            Event
                .create(tmpObj)
                .then(function(event) {
                    res.send(event);
                }).catch(next);
        })
        .catch(function(err) {
            console.log(err);
        });

    // let newEvent=new Event(req.body);
    // newEvent.save();
    // res.redirect("/");
});

module.exports = router;
