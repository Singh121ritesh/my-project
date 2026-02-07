const express = require("express");
const notesModel1 = require("./model/notes.model.js");
const cors = require("cors");
const path = require("path");

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());
app.use(express.static(".src/dist"))

/* API routes */
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  await notesModel1.create({ title, description });
  res.status(201).json({ message: "Note created successfully" });
});

app.get("/notes", async (req, res) => {
  const notes = await notesModel1.find();
  res.status(200).json(notes);
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  await notesModel1.findByIdAndDelete(id);
  res.status(200).json({ message: "Note deleted successfully" });
});

/* React build */
const PORT = 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
