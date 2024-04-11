import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistoryFirst, coinHistorySecond }) => {
  const coinPriceFirst = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistoryFirst?.data?.history?.length; i += 1) {
    coinPriceFirst.push(coinHistoryFirst?.data?.history[i].price);
  }

  const coinPriceSecond = [];
  if (coinHistorySecond) {
    for (let i = 0; i < coinHistorySecond?.data?.history?.length; i += 1) {
      coinPriceSecond.push(coinHistorySecond?.data?.history[i].price);
    }
  }

  for (let i = 0; i < coinHistoryFirst?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(
        coinHistoryFirst?.data?.history[i].timestamp * 1000
      ).toLocaleString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Dataset 1',
        data: coinPriceFirst,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Dataset 2',
        data: coinPriceSecond,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
    />
  );
};

export default LineChart;
