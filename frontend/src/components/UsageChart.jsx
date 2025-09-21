import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UsageChart = ({ readings }) => {
  const data = {
    labels: readings.map(r => new Date(r.date).toLocaleDateString()),
    datasets: [
      { label: 'AC', data: readings.map(r => r.consumed.ac), borderColor: 'blue' },
      { label: 'Main', data: readings.map(r => r.consumed.main), borderColor: 'green' },
      { label: 'Backup', data: readings.map(r => r.consumed.backup), borderColor: 'red' },
    ],
  };

  return <Line data={data} />;
};

export default UsageChart;