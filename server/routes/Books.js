const router = require('express').Router();
const Book = require('../models/Book')

router.get('/getALL', async (req, res) => {
    const options = {
        sort: {
            createdAt: 1,  // Sort by creation date, ascending
        },
    };

    try {
        const data = await Book.find({}, null, options);

        if (data.length > 0) {
            return res.status(200).send({ Books: data });
        } else {
            return res.status(404).send({ success: false, message: "Data Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Server Error", error });
    }
});

router.post("/save", async (req, res) => {
    // Create a new instance of the Reciter model
    const newBook = Book({
        name : req.body.name,
        imageURL : req.body.imageURL,
        BookURL : req.body.BookURL,
        Auteur : req.body.Auteur,
        Language : req.body.Language,
        Category : req.body.Category
    });

    try {
        // Save the new reciter to the database
        const savedBook = await newBook.save();
        return res.status(200).send({ success: true, message: savedBook });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/getOne/:id", async (req,res) => {
    const filter = {_id : req.params.id};

    const data = await Book.findOne(filter);

    if(data){
        return res.status(200).send({ success: true, message: data });
    }else{
        return res.status(400).send({ success: false, message: "Book Not Found" });
    }

});

router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };
    try {
      const result = await Book.findOneAndUpdate(
        filter,
        {
        name : req.body.name,
        imageURL : req.body.imageURL,
        BookURL : req.body.BookURL,
        Auteur : req.body.Auteur,
        Language : req.body.Language,
        Category : req.body.Category
        },
        options
      );
      res.status(200).send({ Recite: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });
  
router.delete("/delete/:deleteId", async (req, res) => {
    const filter = { _id: req.params.deleteId };
  
    const result = await Book.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  });

module.exports = router ;