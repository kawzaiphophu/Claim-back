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

router.post('/',(req,res,next)=>{
    Claim.create(req.body,(err,post)=>{
        if(err) return next(err)
        res.json(post)
    })
})

module.export = router