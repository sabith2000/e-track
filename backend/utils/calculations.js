const calculateCost = (units) => {
  let cost = 0;
  if (units <= 500) {
    // Condition 1: <= 500 units
    if (units > 100) {
      cost += Math.min(units - 100, 100) * 2.35; // 101-200
    }
    if (units > 200) {
      cost += Math.min(units - 200, 200) * 4.70; // 201-400
    }
    if (units > 400) {
      cost += Math.min(units - 400, 100) * 6.30; // 401-500
    }
  } else {
    // Condition 2: > 500 units
    if (units > 100) {
      cost += Math.min(units - 100, 300) * 4.70; // 101-400
    }
    if (units > 400) {
      cost += Math.min(units - 400, 100) * 6.30; // 401-500
    }
    if (units > 500) {
      cost += Math.min(units - 500, 100) * 8.40; // 501-600
    }
    if (units > 600) {
      cost += Math.min(units - 600, 200) * 9.45; // 601-800
    }
    if (units > 800) {
      cost += Math.min(units - 800, 200) * 10.50; // 801-1000
    }
    if (units > 1000) {
      cost += (units - 1000) * 11.55; // 1001+
    }
  }
  return cost;
};

const projectUsage = (currentUnits, daysElapsed, estimatedCycleDays = 60) => {
  const dailyAvg = currentUnits / daysElapsed;
  const projected = currentUnits + dailyAvg * (estimatedCycleDays - daysElapsed);
  return {
    projected,
    alert: projected > 450 ? 'Warning: Approaching 500 units!' : null,
  };
};

const suggestSwitch = (mainUnits, backupUnits) => {
  if (mainUnits > backupUnits + 50) return 'Switch to Backup to balance';
  if (backupUnits > mainUnits + 50) return 'Switch to Main to balance';
  return null;
};

module.exports = { calculateCost, projectUsage, suggestSwitch };