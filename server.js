var express = require("express");

var app = express();

var todoStore = [
  {
    id: 1,
    text: "some task text 1",
  },
  {
    id: 2,
    text: "some task text 2",
  },
  {
    id: 3,
    text: "some task text 3",
  },
];

app.get("/", function (req, res) {
  res.send("Hello API");
});

app.get("/todoStore", function (req, res) {
  res.send(todoStore);
});

app.listen(3012, function () {
  console.log("API app started");
});
