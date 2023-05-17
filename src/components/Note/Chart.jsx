import React, { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// context
import { NoteStateContext } from '../../App';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

export default function Chart({ note }) {
  const noteList = useContext(NoteStateContext);
  const noteData = noteList.notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  const data = {
    labels: journalList.map(
      (data) =>
        `${data.createdAt.split('-')[1]}월 ${data.createdAt.split('-')[2]}일`
    ),
    datasets: [
      {
        label: '기분 수치',
        data: journalList.map((data) => data.mood),
        borderColor: '#6cd8c8',
        backgroundColor: '#89ebdd',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
