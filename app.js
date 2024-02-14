require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT, MONGO_HOSTNAME, MONGO_PORT, MONGO_PATH } = process.env;
const router = require ('./routes/claims')
const Claim = require('./model/claim');

mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_PATH}`)
    .then((e) => console.log("Connected"))
    .catch((err) => console.log(err));

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//list claim all
app.get("/claimlist", async(req,res)=>{
    const claims = await Claim.find();
    return res.json(claims)
})


//post insert claim
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


app.delete('/claimlist/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the claim by ID and delete it from the database
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



app.listen(PORT, () => {
    console.log("running port", PORT);
});
