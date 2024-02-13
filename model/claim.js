const mongoose = require('mongoose')

const ClaimSchema = new mongoose.Schema({
    name: String,
    tel: String,
    cTel: String,
    nameProduct: String,
    sn: String,
    symp: String,
    from: String,
    date: { type: Date, default: Date.now },
    status : String
})
module.exports = mongoose.model('Claim', ClaimSchema)
