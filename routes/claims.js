const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Claim = require('../model/claim')


router.get('/', (req, res, next) => {
    Claim.find((err, claim) => {
        if (err) return next(err)
        res.json(claim)
    })
})

router.post('/formclaim', async(req, res, next) => {
    try {
        const { name, tel, cTel, nameProduct, sn, symp, from,status } = req.body;
        const newData = new Claim({
            name:name, 
            tel:tel, 
            cTel:cTel, 
            nameProduct:nameProduct, 
            sn:sn, 
            symp:symp, 
            from:from,
            status:status
        })
        await newData.save()
        Claim.create(newData)
        console.log(newData);
    } catch (error) {
        console.log(error);
    }

})

module.exports = router