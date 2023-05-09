const Todo = require('../models/todo');

class TodoRepository {
  constructor(model) {
    this.model = model;
  }

  create(text, date, percentage = 0) {
    const newTodo = { text, date, percentage, done: false };
    const todo = new this.model(newTodo);

    return todo.save();
  }

  findAll() {
    return this.model.find();
  }

  findById(id) {
    return this.model.findById(id);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, {
      $set: {
        text: object.text,
        date: object.date,
        percentage: object.percentage,
        done: object.done,
      },
    });
  }
}

module.exports = new TodoRepository(Todo);
