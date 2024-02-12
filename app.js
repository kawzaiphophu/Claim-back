require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const claim = require('./model/claim');
const { PORT, MONGO_HOSTNAME, MONGO_PORT, MONGO_PATH } = process.env;

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
    ctel: { type: String },
    ProductName: { type: String },
    sn: { type: String },
    sym: { type: String },
    form: { type: String },
    update_at: { type: String, default:Date.now },
}, { collection: 'list' });

const Claim = mongoose.model('list', claimSchema);

app.get("/", async(req,res)=>{
    const claims = await Claim.find();
    return res.json(claims)
})

app.listen(PORT, () => {
    console.log("running port", PORT);
});
