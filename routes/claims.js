const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Claim = require('../model/claim')


router.get('/',(req,res,next)=>{
    Claim.find((err,claim)=>{
        if (err) return next(err)
        res.json(claim)
    })
})

module.export = router