const ListItemModel = require("../../models/todo-item");

module.exports = {
  addTask: async (req, res) => {
    try {
      const task = new ListItemModel({
        text: req.body.taskName,
        isDone: false,
      });
      await task.save();
      res.status(201).send({ message: "Successfully, task added", data: task });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  getTasks: async (req, res) => {
    try {
      const allTasks = await ListItemModel.find();
      res.status(201).send({
        message: "Successfully, get task",
        data: allTasks,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  deleteTask: async (req, res) => {
    try {
      // const deleteTask = await ListItemModel.deleteOne({ _id: req.params.id });
      const deleteTask = await ListItemModel.deleteMany({ isDone: true });
      res
        .status(201)
        .send({ message: "Successfully, task deleted", data: deleteTask });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  deleteAllCompleted: async (req, res) => {
    try {
      const deleteTask = await ListItemModel.deleteMany({ isDone: true });
      res
        .status(201)
        .send({
          message: "Successfully,All completed tasks deleted",
          data: deleteTask,
        });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  updateTask: async (req, res) => {
    console.log(req.body);
    const id = req.body._id;
    const newText = req.body.text;
    const newStatus = req.body.isDone;
    try {
      const taskModel = await ListItemModel.findById(id);
      const updateTask = Object.assign(taskModel, {
        text: newText,
        isDone: newStatus,
      });
      await updateTask.save();
      res
        .status(201)
        .send({ message: "Successfully, task updated", data: updateTask });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
