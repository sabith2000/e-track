import { useState } from 'react';

const CycleForm = ({ onSubmit, isStart = true }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    initialReadings: { ac: 0, main: 0, backup: 0 },
    endDate: '',
    finalReadings: { ac: 0, main: 0, backup: 0 },
    actualCost: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({ ...formData, [parent]: { ...formData[parent], [child]: parseFloat(value) } });
    } else {
      setFormData({ ...formData, [name]: name === 'actualCost' ? parseFloat(value) : value });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {isStart ? (
        <>
          <input type="date" name="startDate" onChange={handleChange} className="border p-2 w-full" required />
          <input type="number" name="initialReadings.ac" placeholder="AC Initial" onChange={handleChange} className="border p-2 w-full" required />
          <input type="number" name="initialReadings.main" placeholder="Main Initial" onChange={handleChange} className="border p-2 w-full" required />
          <input type="number" name="initialReadings.backup" placeholder="Backup Initial" onChange={handleChange} className="border p-2 w-full" required />
        </>
      ) : (
        <>
          <input type="date" name="endDate" onChange={handleChange} className="border p-2 w-full" required />
          <input type="number" name="finalReadings.ac" placeholder="AC Final" onChange={handleChange} className="border p-2 w-full" required />
          <input type="number" name="finalReadings.main" placeholder="Main Final" onChange={handleChange} className="border p-2 w-full" required />
          <input type="number" name="finalReadings.backup" placeholder="Backup Final" onChange={handleChange} className="border p-2 w-full" required />
          <input type="number" name="actualCost" placeholder="Actual Cost" onChange={handleChange} className="border p-2 w-full" required />
        </>
      )}
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default CycleForm;