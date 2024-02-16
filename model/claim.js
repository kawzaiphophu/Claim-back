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
    name: { type: String, default: '' },
    tel: { type: String, default: '' },
    cTel: { type: String, default: '' },
    nameProduct: { type: String, default: '' },
    sn: { type: String, default: '' },
    symp: { type: String, default: '' },
    from: { type: String, default: '' },
    status: { type: String, default: 'รับเข้าสาขา' },
    update_at: { type: Date, default:Date.now },
}, { collection: 'list' });

const Claim = mongoose.model('list', claimSchema);
module.exports = Claim
