const mongoose = require('mongoose');

// Definition of Complex Event schema
const eventSchema = new mongoose.Schema({
  dateOfOccurrence: { type: Number, required: true },
  typeOfEvent: { type: String, required: true },
});

// Exporting the Complex Event model
module.exports = mongoose.model('complex_events', eventSchema);