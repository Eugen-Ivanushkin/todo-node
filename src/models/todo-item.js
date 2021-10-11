const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoItemModelShema = new Schema({
  text: String,
  isDone: Boolean,
});

module.exports = mongoose.model("ListItemModel", TodoItemModelShema);
