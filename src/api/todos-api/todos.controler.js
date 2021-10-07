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
      res
        .status(201)
        .send({ message: "Successfully, get task", data: allTasks });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const deleteTask = await ListItemModel.deleteOne({ _id: req.params.id });

      res
        .status(201)
        .send({ message: "Successfully, task deleted", data: deleteTask });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  isDone: async (req, res) => {
    const id = req.params.id;

    ListItemModel.findById(id)
      .then((model) => {
        return Object.assign(model, { isDone: !model.isDone });
      })
      .then((model) => model.save())
      .then((updateModel) => {
        res.status(201).send({
          message: "Successfully, task status updated",
          data: updateModel,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  },
  updateTask: async (req, res) => {
    const id = req.params.id;
    const newText = req.body.taskName;

    try {
      const taskModel = await ListItemModel.findById(id);
      const updateTask = Object.assign(taskModel, { text: newText });
      await updateTask.save();
      res
        .status(201)
        .send({ message: "Successfully, task text updated", data: updateTask });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
