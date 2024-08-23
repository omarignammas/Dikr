const router = require('express').Router();
const Album = require('../models/Albums');

router.get('/getALL', async (req, res) => {
    const options = {
        sort: {
            createdAt: 1,  // Sort by creation date, ascending
        },
    };

    try {
        const data = await Album.find({}, null, options);

        if (data.length > 0) {
            return res.status(200).send({ Albums: data });
        } else {
            return res.status(404).send({ success: false, message: "Data Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Server Error", error });
    }
});

router.post("/save", async (req, res) => {
    // Create a new instance of the Album model
    const newAlbum = Album({
        name: req.body.name,
        imageURL: req.body.imageURL,
    });

    try {
        // Save the new reciter to the database
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({ success: true, message: savedAlbum });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/getOne/:Albumid", async (req,res) => {
    const filter = {_id : req.params.Albumid};

    const data = await Album.findOne(filter);

    if(data){
        return res.status(200).send({ success: true, message: data });
    }else{
        return res.status(400).send({ success: false, message: "Album Not Found" });
    }

});

router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };
    try {
      const result = await Album.findOneAndUpdate(
        filter,
        {
          name: req.body.name,
          imageURL: req.body.imageURL,
        },
        options
      );
      res.status(200).send({ Album: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });

router.delete("/delete/:deleteId", async (req, res) => {
    const filter = { _id: req.params.deleteId };
  
    const result = await Album.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  });

module.exports = router ;