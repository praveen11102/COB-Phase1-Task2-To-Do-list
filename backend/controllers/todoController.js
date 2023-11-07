// Import the Todo model
const Todo = require('../models/todo');

// Controller methods for CRUD operations
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTodo = async (req, res) => {
  const { text } = req.body;
  try {
    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
