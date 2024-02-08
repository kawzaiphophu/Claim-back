const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

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
    tel: { type: String }
}, { collection: 'ab' });

const Claim = mongoose.model('ab', claimSchema);

app.get("/api/claim", async (req, res) => {
    try {
        const kka = await Claim.find()
        console.log(kka);
        res.json(kka);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log("running port", PORT);
});
