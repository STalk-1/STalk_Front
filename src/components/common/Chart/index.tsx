import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { cn } from '@/utils/cn';

import type { ChartProps } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

function Chart({ points, className, strokeColor = '#EF4444' }: ChartProps) {
  if (!points || points.length === 0) {
    return (
      <div
        className={cn(
          'flex h-8 w-28 items-center justify-center rounded-lg bg-white',
          className
        )}
      >
        <span className="typo-10-regular text-grey-400">차트 없음</span>
      </div>
    );
  }

  const values = points.map((point) => point.close);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;
  const padding = Math.max(valueRange * 0.15, 1);

  const fillColor =
    strokeColor === '#EF4444'
      ? 'rgba(239, 68, 68, 0.15)'
      : 'rgba(59, 130, 246, 0.15)';
  const data = {
    labels: points.map((point) => point.time),
    datasets: [
      {
        data: values,
        borderColor: strokeColor,
        backgroundColor: fillColor,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: {
        display: false,
        min: minValue - padding,
        max: maxValue + padding,
      },
    },
  };

  return (
    <div className={cn('h-8 w-28', className)}>
      <Line data={data} options={options} />
    </div>
  );
}

export default Chart;
