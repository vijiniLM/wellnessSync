const dotenv = require("dotenv");
dotenv.config(); // Load .env file
console.log("MONGODB_URL:", process.env.MONGODB_URL);


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8070; //IF 8070 port is unavailable, connect with an available one

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection success!"))
  .catch((err) => console.error("MongoDB connection error:", err));

  const foodRouter = require("./routes/foods.js");  //*
  const ingredientRouter = require("./routes/ingredients.js"); // Add this line

  console.log("Ingredient Router Loaded:", ingredientRouter);//added to debug

  app.use("/food",foodRouter);
  console.log("Inside server.js, ingredientRouter:", ingredientRouter); // Debugging
  app.use("/ingredient", ingredientRouter); // Add this line
 

  app.listen(PORT, () =>{
    console.log(`server is up and running on port number: ${PORT}`)
})
