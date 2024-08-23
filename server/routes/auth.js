const router = require('express').Router();
const admin = require("../config/firebase.config");     // importing the firebase key account 
const user = require("../models/user");    // importing user shema 




// Routing to the login page 
router.get("/login",async (req,res)=> {
    if(!req.headers.authorization){
        return res.status(500).send({message : "Invalid Token"})
    }

    const Token = req.headers.authorization.split(" ")[1]; // Restoring Token from Header Authorization 


    try{
      const decodetoken = await admin.auth().verifyIdToken(Token);  // verifying the Id token auth from the client side 
      if(!decodetoken){
        return res.status(505).json({message : "Un Authorized"});
      }else{
        //return res.status(200).json({decodetoken });
        //checking users exist or not 
        const userexist = await user.findOne({"user_id" : decodetoken.user_id});
        if(!userexist){
            newUserData(decodetoken,req,res)
        }else{
            UserUpdate(decodetoken,req,res);
        }
      }
    }catch(error){
        return res.status(505).json({sucess : false , message : error});
    }
})

router.get("/getUsers",async (req,res) => {
    const options = {
        sort : {
            createdAt : 1
        },
    };
    try {
        const data = await user.find({}, null, options);

        if (data.length > 0) {
            return res.status(200).send({ Users: data });
        } else {
            return res.status(404).send({ success: false, message: "users Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Server Error", error });
    }
});


 // Create the user data and save it in mongoodb dataBase 
 const newUserData = async (decodetoken,req,res) => {
    const newUser = new user({
        name : decodetoken.name,
        email : decodetoken.email,
        imageURL : decodetoken.picture,
        user_id : decodetoken.user_id,
        email_verified : decodetoken.email_verified,
        role : "Member",
        auth_time : decodetoken.auth_time
    })
    try {
        const saveuser = await newUser.save();
        res.status(200).send({user : saveuser})
    }catch (error) {
        res.status(400).send({success : false , message : error});
    }
 }

 const UserUpdate = async (decodetoken,req,res) => {
       const filter = {user_id : decodetoken.user_id}
       const options = {
             upsert : true,
             new : true
       };
       try {
        const result = await user.findOneAndUpdate(
            filter,
            {auth_time : decodetoken.auth_time},
            options
        );
        res.status(200).send({user : result});

       } catch (error) {
        res.status(400).send({success : false , message : error});
       }
 }
 router.put("/updateRole/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const role = req.body.data.role;
    const options = {
      upsert: true,
      new: true,
    };
    try {
      const result = await user.findOneAndUpdate(
        filter,
        {
        role : role,
        },
        options
      );
      res.status(200).send({ user: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });
  
  router.delete("/delete/:deleteId", async (req, res) => {
    const filter = { _id: req.params.deleteId };
  
    const result = await user.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  });

module.exports = router;