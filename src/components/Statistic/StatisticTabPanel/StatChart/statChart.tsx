/* eslint-disable react/require-default-props */
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  LineController,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Title,
  Tooltip,
  Legend,
);

interface StatChartProps {
  chartName: string;
  wordsData: number[];
}
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const DATASET_NAME_NEW_WORDS = 'Новые слова';
const DATASET_NAME_LEARNED_WORDS = 'Изученные слова';

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
    filler: {
      propagate: false,
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
  interaction: {
    intersect: false,
  },
};

export const chartData = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: DATASET_NAME_NEW_WORDS,
      fill: false,
      data: labels.map(() => Math.random() * 2000 - 1000),
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      type: 'line' as const,
      label: DATASET_NAME_LEARNED_WORDS,
      fill: 'start' as const,
      data: labels.map(() => Math.trunc(Math.random() * 300)).sort((a, b) => a - b),
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    },
  ],
};

function StatChart(props: StatChartProps) {
  const { chartName, wordsData } = props;
  chartOptions.plugins.title.text = chartName;

  return (
    <div>
      {wordsData.length}
      <Chart type="line" options={chartOptions} data={chartData as ChartData} />
    </div>
  );
}

export default StatChart;
