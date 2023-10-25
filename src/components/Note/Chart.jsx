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
  const notes = useContext(NoteStateContext);
  const noteData = notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  const sortedList = [...journalList].sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : -1
  );

  const data = {
    labels: sortedList.map(
      (data) =>
        `${data.createdAt.split('-')[1]}월 ${data.createdAt.split('-')[2]}일`
    ),
    datasets: [
      {
        label: '기분 수치',
        data: sortedList.map((data) => data.mood),
        borderColor: '#6cd8c8',
        backgroundColor: '#89ebdd',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
