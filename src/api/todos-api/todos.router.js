const router = require("express").Router();

const {
  addTask,
  getTasks,
  deleteTask,
  deleteAllCompleted,
  updateTask,
} = require("./todos.controler");

router.post("/todos", addTask);
router.get("/todos", getTasks);
router.delete("/todos/:id", deleteTask);
router.delete("/todos", deleteAllCompleted);
router.put("/todos/:id", updateTask);

module.exports = router;
