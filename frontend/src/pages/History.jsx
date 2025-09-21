import { useEffect, useState } from 'react';
import { getCycles, closeCycle } from '../services/api';
import CycleForm from '../components/CycleForm';

const History = () => {
  const [cycles, setCycles] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState(null);

  useEffect(() => {
    fetchCycles();
  }, []);

  const fetchCycles = async () => {
    const { data } = await getCycles();
    setCycles(data);
  };

  const handleClose = async (data) => {
    await closeCycle({ ...data, cycleId: selectedCycle._id });
    fetchCycles();
    setSelectedCycle(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Cycle History</h1>
      <table className="table-auto w-full">
        <thead><tr><th>Start</th><th>End</th><th>Total Cost</th><th>Actions</th></tr></thead>
        <tbody>
          {cycles.map(c => (
            <tr key={c._id}>
              <td>{new Date(c.startDate).toLocaleDateString()}</td>
              <td>{c.endDate ? new Date(c.endDate).toLocaleDateString() : 'Active'}</td>
              <td>{c.actualCost || 'N/A'}</td>
              <td>{c.isActive && <button onClick={() => setSelectedCycle(c)} className="bg-red-500 text-white p-1">Close</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCycle && (
        <div className="mt-4">
          <h2>Close Cycle</h2>
          <CycleForm onSubmit={handleClose} isStart={false} />
        </div>
      )}
    </div>
  );
};

export default History;