"use strict";
const dotenv = require("dotenv");
dotenv.load();

// db setup
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI);
require("./models/Transaction");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("mongoose connected");
});

// app setup
const express = require("express");
const v1 = require("./routes");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 9000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/v1", v1);
app.listen(port, function() {
  console.log("API server running at:" + port);
});
