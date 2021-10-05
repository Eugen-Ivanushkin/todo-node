const todoStore = require("./store");
const getIdxById = require("./utils");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3012, function () {
  console.log("Server running in port 3012");
});

app.get("/todos", function (req, res) {
  res.send("Hello API");
});

app.get("/todos", function (req, res) {
  res.send(todoStore);
});

app.post("/todos", (req, res) => {
  const task = req.body;
  todoStore.push(task);
  res.status(201).send({ message: "Successfully created", data: todoStore });
});

app.delete("/todos/:id", (req, res) => {
  const index = getIdxById(Number(req.params.id), todoStore);
  if (index !== -1) {
    todoStore.splice(index, 1);
    res.status(201).send({ message: "Successfully delete", data: todoStore });
  } else {
    res.status(404).send();
  }
});

app.put("/todos/:id", (req, res) => {
  const index = getIdxById(Number(req.params.id), todoStore);
  if (index !== -1) {
    const modifyTask = todoStore.splice(index, 1)[0];
    modifyTask.text = req.body.text;
    todoStore.splice(index, 0, modifyTask);
    res.status(201).send({ message: "Successfully update", modifyTask });
  } else {
    res.status(404).send();
  }
});
