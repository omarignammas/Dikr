const router = require('express').Router();
const Podcaster = require("../models/Podcaster");


router.get('/getALL', async (req, res) => {
    const options = {
        sort: {
            createdAt: 1,  // Sort by creation date, ascending
        },
    };

    try {
        const data = await Podcaster.find({}, null, options);

        if (data.length > 0) {
            return res.status(200).send({ Podcasters: data });
        } else {
            return res.status(404).send({ success: false, message: "Podcaster Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Server Error", error });
    }
});

router.post("/save", async (req, res) => {
    // Create a new instance of the Podcaster model
    const newPodcaster = Podcaster({
        name: req.body.name,
        imageURL: req.body.imageURL,
        Twitter: req.body.Twitter,
        Instagram: req.body.Instagram,
    });

    try {
        // Save the new Podcaster to the database
        const savedPodcaster = await newPodcaster.save();
        return res.status(200).send({ success: true, message: savedPodcaster });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/getOne/:id", async (req,res) => {
    const filter = {_id : req.params.id};

    const data = await Podcaster.findOne(filter);

    if(data){
        return res.status(200).send({ success: true, message: data });
    }else{
        return res.status(400).send({ success: false, message: "Podcaster Not Found" });
    }

});


router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };
    try {
      const result = await Podcaster.findOneAndUpdate(
        filter,
        {
          name: req.body.name,
          imageURL: req.body.imageURL,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
        },
        options
      );
      res.status(200).send({ Podcaster: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });
  
router.delete("/delete/:deleteId", async (req, res) => {
    const filter = { _id: req.params.deleteId };
  
    const result = await Podcaster.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Podcaster Deleted" });
    } else {
      res.status(200).send({ success: false, msg: "Podcaster Not Found" });
    }
  });

module.exports = router;
