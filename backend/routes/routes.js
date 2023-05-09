const express = require('express');

const app = express.Router();
const repository = require('../repositories/todoRepository');

app.get('/', (req, res) => {
  repository
    .findAll()
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => console.log(error));
});

app.post('/', (req, res) => {
  const { text, date, percentage = 0 } = req.body;
  repository
    .create(text, date, percentage)
    .then((todo) => {
      res.json(todo);
    })
    .catch((error) => console.log(error));
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  repository
    .deleteById(id)
    .then((ok) => {
      console.log(ok);
      console.log(`Delete todo with id: ${id}`);
      res.status(200).json([]);
    })
    .catch((error) => console.log(error));
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const todo = {
    text: req.body.text,
    date: req.body.date,
    percentage: req.body.percentage,
    done: req.body.done,
  };
  repository
    .updateById(id, todo)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});

module.exports = app;
