const Cycle = require('../models/Cycle');
const Reading = require('../models/Reading');

const startCycle = async (req, res) => {
  const { startDate, initialReadings } = req.body;
  try {
    const cycle = new Cycle({
      user: req.user,
      startDate,
      initialReadings,
    });
    await cycle.save();
    res.json(cycle);
  } catch (err) {
    res.status(500).json({ msg: 'Error starting cycle' });
  }
};

const closeCycle = async (req, res) => {
  const { cycleId, endDate, finalReadings, actualCost } = req.body;
  try {
    const cycle = await Cycle.findById(cycleId);
    if (!cycle || cycle.user.toString() !== req.user) return res.status(404).json({ msg: 'Cycle not found' });

    cycle.endDate = endDate;
    cycle.finalReadings = finalReadings;
    cycle.actualCost = actualCost;
    cycle.isActive = false;
    await cycle.save();

    // Optional: Recalculate readings if needed
    res.json(cycle);
  } catch (err) {
    res.status(500).json({ msg: 'Error closing cycle' });
  }
};

const getCycles = async (req, res) => {
  try {
    const cycles = await Cycle.find({ user: req.user }).sort({ startDate: -1 });
    res.json(cycles);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching cycles' });
  }
};

module.exports = { startCycle, closeCycle, getCycles };