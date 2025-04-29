require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Successfull");
})

const userRouter = require("./routes/Users.js");
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})