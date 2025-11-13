const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/tasktrackerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

const Task = require("./models/Task");

// create
app.post("/add", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    completed: false,
    dueDate: req.body.dueDate,
  });
  await task.save();
  res.send("Task added!");
});

// read
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// update
app.post("/update/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.send("Task updated!");
});

// delete
app.post("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Task deleted!");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
