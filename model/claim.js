const mongoose = require('mongoose')

// const ClaimSchema = new mongoose.Schema({
//     name: String,
//     tel: String,
//     cTel: String,
//     nameProduct: String,
//     sn: String,
//     symp: String,
//     from: String,
//     status : String,
//     date: { type: Date, default: Date.now }
// })
// module.exports = mongoose.model('Claim', ClaimSchema)
const claimSchema = new mongoose.Schema({
    name: { type: String },
    tel: { type: String },
    cTel: { type: String },
    nameProduct: { type: String },
    sn: { type: String },
    symp: { type: String },
    from: { type: String },
    update_at: { type: Date, default:Date.now },
}, { collection: 'list' });

const Claim = mongoose.model('list', claimSchema);
module.exports = Claim
