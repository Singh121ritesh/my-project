 const mongoose = require('mongoose');

  const noteSchema = new mongoose.Schema({
        title: String,
        description: String
  })
  const notes = mongoose.model('Note',noteSchema);
    module.exports = notes;