const express = require('express');
const protect = require('../middlewares/auth');
const { addReading, getReadings } = require('../controllers/readingController');

const router = express.Router();

router.post('/', protect, addReading);
router.get('/:cycleId', protect, getReadings);

module.exports = router;