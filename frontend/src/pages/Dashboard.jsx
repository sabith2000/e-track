import { useEffect, useState } from 'react';
import { getCycles, startCycle, addReading, getReadings } from '../services/api';
import CycleForm from '../components/CycleForm';
import ReadingForm from '../components/ReadingForm';
import UsageChart from '../components/UsageChart';

const Dashboard = () => {
  const [cycles, setCycles] = useState([]);
  const [currentCycle, setCurrentCycle] = useState(null);
  const [readings, setReadings] = useState([]);
  const [projections, setProjections] = useState({});
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    fetchCycles();
  }, []);

  const fetchCycles = async () => {
    const { data } = await getCycles();
    setCycles(data);
    const active = data.find(c => c.isActive);
    setCurrentCycle(active);
    if (active) fetchReadings(active._id);
  };

  const fetchReadings = async (id) => {
    const { data } = await getReadings(id);
    setReadings(data);
    // Assume last response has projections/suggestion; in real, fetch or calculate
  };

  const handleStart = async (data) => {
    await startCycle(data);
    fetchCycles();
  };

  const handleAddReading = async (data) => {
    const res = await addReading(data);
    fetchReadings(data.cycleId);
    setProjections(res.data.projections);
    setSuggestion(res.data.switchSuggestion);
  };

  if (!currentCycle) {
    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Start New Cycle</h1>
        <CycleForm onSubmit={handleStart} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Dashboard - Current Cycle</h1>
      <ReadingForm cycleId={currentCycle._id} onSubmit={handleAddReading} />
      <table className="table-auto w-full mt-4">
        <thead><tr><th>Date</th><th>AC Consumed</th><th>Main Consumed</th><th>Backup Consumed</th><th>Est Cost</th></tr></thead>
        <tbody>{readings.map(r => <tr key={r._id}><td>{new Date(r.date).toLocaleDateString()}</td><td>{r.consumed.ac}</td><td>{r.consumed.main}</td><td>{r.consumed.backup}</td><td>{r.estimatedCost}</td></tr>)}</tbody>
      </table>
      <UsageChart readings={readings} />
      <p>Projections: Main {projections.main?.projected}, Backup {projections.backup?.projected}</p>
      <p>Alert: {projections.main?.alert || projections.backup?.alert}</p>
      <p>Suggestion: {suggestion}</p>
    </div>
  );
};

export default Dashboard;