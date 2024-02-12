const mongoose = require('mongoose')

const ClaimSchema = new mongoose.Schema({
    name: String,
    tel: String,
    product: String,
    SN: String,
    sym: String,
    from: String,
    time: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Claim', ClaimSchema)
