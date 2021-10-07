const router = require("express").Router();

const {
  addTask,
  getTasks,
  deleteTask,
  isDone,
  updateTask,
} = require("./todos.controler");

router.post("/todos", addTask);
router.get("/todos", getTasks);
router.delete("/todos/:id", deleteTask);
router.patch("/todos/:id", isDone);
router.put("/todos/:id", updateTask);

module.exports = router;
