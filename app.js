require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT, MONGO_HOSTNAME, MONGO_PORT, MONGO_PATH } = process.env;
const router = require ('./routes/claims')
const claim = require('./model/claim');

mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_PATH}`)
    .then((e) => console.log("Connected"))
    .catch((err) => console.log(err));

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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



app.get("/claimlist", async(req,res)=>{
    const claims = await Claim.find();
    return res.json(claims)
})

app.post('/formclaim', async(req, res, next) => {
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


app.listen(PORT, () => {
    console.log("running port", PORT);
});
