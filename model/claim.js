const mongoose = require('mongoose')

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

