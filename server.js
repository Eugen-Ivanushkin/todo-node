const todoStore = require("./store");
const getIdxById = require("./utils");

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;

MongoClient.connect("mongodb://localhost:27017", function (err, database) {
  if (err) {
    console.log("!!!!!!!!!!!!err: ", err);
  }

  db = database.db("todoStore");
  app.listen(3012, function () {
    console.log("Server running in port 3012");
  });
});

app.get("/todos", function (req, res) {
  res.send(todoStore);
});

app.post("/todos", (req, res) => {
  const taskName = req.body.taskName;
  const task = {
    text: taskName,
  };
  db.collection("todoStore").insert(task, function (err, result) {
    if (err) {
      res.status(500).send({ message: "Error created" });
    }
    res.status(201).send({
      message: "Successfully created",
      data: task,
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  db.collection("todoStore").deleteOne({
    _id: ObjectID(req.params.id, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Error delete",
        });
      }
      res.status(201).send({
        message: "Successfully delete",
      });
    }),
  });
  // const index = getIdxById(Number(req.params.id), todoStore);
  // if (index !== -1) {
  //   todoStore.splice(index, 1);
  //   res.status(201).send({ message: "Successfully delete", data: todoStore });
  // } else {
  //   res.status(404).send();
  // }
});

app.put("/todos/:id", (req, res) => {
  const index = getIdxById(Number(req.params.id), todoStore);
  if (index !== -1) {
    const modifyTask = todoStore.splice(index, 1)[0];
    modifyTask.text = req.body.text;
    todoStore.splice(index, 0, modifyTask);
    res.status(201).send({ message: "Successfully update", data: todoStore });
  } else {
    res.status(404).send();
  }
});
