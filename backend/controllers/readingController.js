const Reading = require('../models/Reading');
const Cycle = require('../models/Cycle');
const { calculateCost, projectUsage, suggestSwitch } = require('../utils/calculations');

const addReading = async (req, res) => {
  const { cycleId, date, readings, activeMeter } = req.body;
  try {
    const cycle = await Cycle.findById(cycleId);
    if (!cycle || !cycle.isActive || cycle.user.toString() !== req.user) {
      return res.status(400).json({ msg: 'Invalid cycle' });
    }

    // Get last reading or initial
    const lastReading = await Reading.findOne({ cycle: cycleId }).sort({ date: -1 }) || {
      readings: cycle.initialReadings,
    };

    // Calculate consumed
    const consumed = {
      ac: readings.ac - lastReading.readings.ac,
      main: activeMeter === 'main' ? readings.main - lastReading.readings.main : 0,
      backup: activeMeter === 'backup' ? readings.backup - lastReading.readings.backup : 0,
    };

    // Validate: Consumed should be positive
    if (Object.values(consumed).some(v => v < 0)) return res.status(400).json({ msg: 'Readings must increase' });

    const totalConsumedMain = (await Reading.aggregate([
      { $match: { cycle: cycle._id, activeMeter: 'main' } },
      { $group: { _id: null, total: { $sum: '$consumed.main' } } }
    ]))[0]?.total || 0 + consumed.main;

    const totalConsumedBackup = (await Reading.aggregate([
      { $match: { cycle: cycle._id, activeMeter: 'backup' } },
      { $group: { _id: null, total: { $sum: '$consumed.backup' } } }
    ]))[0]?.total || 0 + consumed.backup;

    const totalConsumedAc = (await Reading.aggregate([
      { $match: { cycle: cycle._id } },
      { $group: { _id: null, total: { $sum: '$consumed.ac' } } }
    ]))[0]?.total || 0 + consumed.ac;

    const estimatedCost = calculateCost(totalConsumedMain) + calculateCost(totalConsumedBackup) + calculateCost(totalConsumedAc); // AC might have separate logic?

    const daysElapsed = (new Date(date) - new Date(cycle.startDate)) / (1000 * 60 * 60 * 24);

    const projections = {
      main: projectUsage(totalConsumedMain, daysElapsed),
      backup: projectUsage(totalConsumedBackup, daysElapsed),
    };

    const switchSuggestion = suggestSwitch(totalConsumedMain, totalConsumedBackup);

    const reading = new Reading({
      cycle: cycleId,
      date,
      readings,
      activeMeter,
      consumed,
      estimatedCost,
    });

    await reading.save();

    res.json({ reading, projections, switchSuggestion });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding reading' });
  }
};

const getReadings = async (req, res) => {
  const { cycleId } = req.params;
  try {
    const readings = await Reading.find({ cycle: cycleId }).sort({ date: 1 });
    res.json(readings);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching readings' });
  }
};

module.exports = { addReading, getReadings };