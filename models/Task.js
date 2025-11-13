// Import Mongoose (used to connect and interact with MongoDB)
const mongoose = require('mongoose');

// Define what each "Task" document will look like in the database
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// Create a model (a collection in MongoDB named "tasks")
const Task = mongoose.model('Task', taskSchema);

// Export the model so other files (like routes or server.js) can use it
module.exports = Task;
