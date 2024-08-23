const express = require('express');
const app = express();
require("dotenv").config();
const userrouter = require("./routes/auth");
const cors = require('cors');
const mongoose = require("mongoose");

// Use CORS middleware
app.use(cors({ origin : true}));  

// Middleware to parse JSON bodies
app.use(express.json());

// User authenticate router
app.use("/api/users/",userrouter); 


//Reciters routes
const RecitersRoutes = require("./routes/Reciters");
app.use('/api/Reciters/',RecitersRoutes);


//Recites routes
const RecitesRoutes = require("./routes/Recites");
app.use('/api/Recites/',RecitesRoutes);


//Album routes
const AlbumRoutes = require("./routes/Albums");
app.use('/api/Albums/',AlbumRoutes);


app.get('/', (req, res) => {
  return res.json("Hi there .....");
});




mongoose.connect(process.env.DB_STRING)  // Mongodb connection
  .then(() => console.log("connected"))
  .catch(error => console.log(`ERROR: ${error}`));





app.listen(4000, () => console.log('listening on port 4000')); // listening to the port 4000
