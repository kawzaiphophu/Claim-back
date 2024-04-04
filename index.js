require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {PORT, MONGO_HOSTNAME, MONGO_PORT, MONGO_PATH } = process.env;
const router = require('./routes/claims');
const Claim = require('./model/claim');

mongoose.connect(`mongodb+srv://${MONGO_HOSTNAME}@${MONGO_PORT}/${MONGO_PATH}`)
    .then((e) => console.log("Connected"))
    .catch((err) => console.log(err));

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

//list claim all
app.get("/claimlist", async (req, res) => {
    try {
        const claims = await Claim.find();
        return res.json(claims);
        
    } catch (error) {
        console.error("Error fetching claims:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

//post add claim
app.post('/formclaim/add', async (req, res, next) => {
    try {
        const { name, tel, cTel, nameProduct, sn, symp, from, status } = req.body;
        const newData = new Claim({
            name: name,
            tel: tel,
            cTel: cTel,
            nameProduct: nameProduct,
            sn: sn,
            symp: symp,
            from: from,
            status: status
        });
        await newData.save();
        console.log(newData);
        res.json(newData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/claimlist/del/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedClaim = await Claim.findByIdAndDelete(id);
        if (!deletedClaim) {
            return res.status(404).json({ message: 'Claim not found' });
        }
        return res.status(200).json({ message: 'Claim deleted successfully', deletedClaim: { _id: deletedClaim._id, name: deletedClaim.name } });
    } catch (error) {
        console.error('Error deleting claim:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.patch('/claimlist/:id/edit', async (req, res) => {
    console.log(req.body);
    const itemId = req.params.id;
    const { status } = req.body;

    try {
        const foundItem = await Claim.findById(itemId);
        if (!foundItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        foundItem.status = status;
        const updatedItem = await foundItem.save();
        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  })

module.exports = app;
