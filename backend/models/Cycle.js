const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  initialReadings: {
    ac: { type: Number, required: true },
    main: { type: Number, required: true },
    backup: { type: Number, required: true },
  },
  finalReadings: {
    ac: Number,
    main: Number,
    backup: Number,
  },
  actualCost: Number,
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Cycle', cycleSchema);