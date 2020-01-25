const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todo: String
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
