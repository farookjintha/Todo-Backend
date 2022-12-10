const AppTodo = require("../models/models");

exports.createOneTodo = (req, res) => {
  AppTodo.create(req.body)
    .then((todo) => {
      console.log({ todo });
      res.json({
        message: "Added successfully!",
        todo,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Not added!",
        error: err.message,
      });
    });
};

exports.listAllTodo = (req, res) => {
  AppTodo.find()
    .then((todo) => {
      console.log({ todo });
      res.json(todo);
    })
    .catch((err) => {
      res.status(404).json({
        message: "No data added!",
        error: err.message,
      });
    });
};

exports.updateOneTodo = (req, res) => {
  AppTodo.findByIdAndUpdate(req.params.id, req.body)
    .then((todo) => {
      console.log({ todo });
      res.json({
        message: "Updated successfully!",
        todo,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Not updated!",
        error: err.message,
      });
    });
};

exports.deleteTodo = (req, res) => {
  AppTodo.findByIdAndRemove(req.params.id)
    .then((todo) => {
      console.log({ todo });
      res.json({
        message: "Deleted successfully!",
        todo,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Not deleted!",
        error: err.message,
      });
    });
};