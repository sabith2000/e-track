const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  cycle: { type: mongoose.Schema.Types.ObjectId, ref: 'Cycle', required: true },
  date: { type: Date, required: true },
  readings: {
    ac: { type: Number, required: true },
    main: { type: Number },
    backup: { type: Number },
  },
  activeMeter: { type: String, enum: ['main', 'backup'], required: true }, // Which one is active
  consumed: {
    ac: Number,
    main: Number,
    backup: Number,
  },
  estimatedCost: Number,
});

module.exports = mongoose.model('Reading', readingSchema);