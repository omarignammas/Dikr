const router = require('express').Router();
const Podcast = require('../models/Podcasts')

router.get('/getALL', async (req, res) => {
    const options = {
        sort: {
            createdAt: 1,  // Sort by creation date, ascending
        },
    };

    try {
        const data = await Podcast.find({}, null, options);

        if (data.length > 0) {
            return res.status(200).send({ Podcasts: data });
        } else {
            return res.status(404).send({ success: false, message: "Data Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Server Error", error });
    }
});

router.post("/save", async (req, res) => {
    // Create a new instance of the Podcaster model
    const newPodcast = Podcast({
        name : req.body.name,
        imageURL : req.body.imageURL,
        PodcastURL : req.body.PodcastURL,
        Album : req.body.Album,
        Podcaster : req.body.Podcaster,
        Language : req.body.Language,
        Category : req.body.Category
    });

    try {
        // Save the new Podcaster to the database
        const savedPodcast = await newPodcast.save();
        return res.status(200).send({ success: true, message: savedPodcast });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/getOne/:id", async (req,res) => {
    const filter = {_id : req.params.id};

    const data = await Podcast.findOne(filter);

    if(data){
        return res.status(200).send({ success: true, message: data });
    }else{
        return res.status(400).send({ success: false, message: "Podcast Not Found" });
    }

});

router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };
    try {
      const result = await Podcast.findOneAndUpdate(
        filter,
        {
        name : req.body.name,
        imageURL : req.body.imageURL,
        PodcastURL : req.body.PodcastURL,
        Album : req.body.Album,
        Podcaster : req.body.Podcaster,
        Language : req.body.Language,
        Category : req.body.Category
        },
        options
      );
      res.status(200).send({ Podcast: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });
  
router.delete("/delete/:deleteId", async (req, res) => {
    const filter = { _id: req.params.deleteId };
  
    const result = await Podcast.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  });

module.exports = router ;