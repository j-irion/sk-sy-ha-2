const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  text: {
    type: String,
  },
  date: {
    type: String,
  },
  percentage: {
    type: Number,
  },
  done: {
    type: Boolean,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
