const express = require("express");
const router = require("./src/api");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://localhost:27017/test", (err, res) => {
  if (err) {
    console.log(err);
  }

  app.listen(5000, function () {
    console.log("Server running in port 5000");
  });
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
