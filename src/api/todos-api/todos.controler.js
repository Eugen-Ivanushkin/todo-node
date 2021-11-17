const ListItemModel = require('../../models/todo-item');
const jwt = require('jsonwebtoken');

module.exports = {
  addTask: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const id = jwt.verify(token, 'secret').userId;

      const allTasks = await ListItemModel.find({ userId: id });
      let sort = null;

      if (allTasks.length === 0) sort = 1;
      if (allTasks.length > 0) {
        const allTaskLength = allTasks.length;
        sort = allTasks[allTaskLength - 1].sort + 1;
      }

      console.log(allTasks.length);

      const task = new ListItemModel({
        text: req.body.taskName,
        isDone: false,
        userId: id,
        sort,
      });
      await task.save();
      res.status(201).send({ message: 'Successfully, task added', data: task });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  getTasks: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const parseToken = jwt.verify(token, 'secret');

      const allTasks = await ListItemModel.find({ userId: parseToken.userId });
      res.status(201).send({
        message: 'Successfully, get tasks',
        data: allTasks,
      });
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
        .send({ message: 'Successfully, task deleted', data: deleteTask });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  deleteAllCompleted: async (req, res) => {
    try {
      const deleteTask = await ListItemModel.deleteMany({ isDone: true });
      res.status(201).send({
        message: 'Successfully,All completed tasks deleted',
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
    const newSort = req.body.sort;
    try {
      const taskModel = await ListItemModel.findById(id);
      const updateTask = Object.assign(taskModel, {
        text: newText,
        isDone: newStatus,
        sort: newSort,
      });
      await updateTask.save();
      res
        .status(201)
        .send({ message: 'Successfully, task updated', data: updateTask });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
