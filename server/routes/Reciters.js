const router = require('express').Router();
const Reciter = require("../models/Reciter");


router.get('/getALL', async (req, res) => {
    const options = {
        sort: {
            createdAt: 1,  // Sort by creation date, ascending
        },
    };

    try {
        const data = await Reciter.find({}, null, options);

        if (data.length > 0) {
            return res.status(200).send({ Reciters: data });
        } else {
            return res.status(404).send({ success: false, message: "Data Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Server Error", error });
    }
});

router.post("/save", async (req, res) => {
    // Create a new instance of the Reciter model
    const newReciter = Reciter({
        name: req.body.name,
        imageURL: req.body.imageURL,
        Twitter: req.body.Twitter,
        Instagram: req.body.Instagram,
    });

    try {
        // Save the new reciter to the database
        const savedReciter = await newReciter.save();
        return res.status(200).send({ success: true, message: savedReciter });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/getOne/:id", async (req,res) => {
    const filter = {_id : req.params.id};

    const data = await Reciter.findOne(filter);

    if(data){
        return res.status(200).send({ success: true, message: data });
    }else{
        return res.status(400).send({ success: false, message: "Reciter Not Found" });
    }

});


router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };
    try {
      const result = await Reciter.findOneAndUpdate(
        filter,
        {
          name: req.body.name,
          imageURL: req.body.imageURL,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
        },
        options
      );
      res.status(200).send({ Reciter: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });
  
router.delete("/delete/:deleteId", async (req, res) => {
    const filter = { _id: req.params.deleteId };
  
    const result = await Reciter.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  });

module.exports = router;
