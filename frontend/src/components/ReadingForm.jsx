import { useState } from 'react';

const ReadingForm = ({ cycleId, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    readings: { ac: 0, main: 0, backup: 0 },
    activeMeter: 'main',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({ ...formData, [parent]: { ...formData[parent], [child]: parseFloat(value) } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, cycleId });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input type="date" name="date" onChange={handleChange} className="border p-2 w-full" required />
      <input type="number" name="readings.ac" placeholder="AC Reading" onChange={handleChange} className="border p-2 w-full" required />
      <input type="number" name="readings.main" placeholder="Main Reading" onChange={handleChange} className="border p-2 w-full" required />
      <input type="number" name="readings.backup" placeholder="Backup Reading" onChange={handleChange} className="border p-2 w-full" required />
      <select name="activeMeter" onChange={handleChange} className="border p-2 w-full">
        <option value="main">Main</option>
        <option value="backup">Backup</option>
      </select>
      <button type="submit" className="bg-green-500 text-white p-2">Add Reading</button>
    </form>
  );
};

export default ReadingForm;