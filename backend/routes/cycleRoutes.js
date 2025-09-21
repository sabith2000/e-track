const express = require('express');
const protect = require('../middlewares/auth');
const { startCycle, closeCycle, getCycles } = require('../controllers/cycleController');

const router = express.Router();

router.post('/start', protect, startCycle);
router.post('/close', protect, closeCycle);
router.get('/', protect, getCycles);

module.exports = router;