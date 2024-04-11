import { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, Typography, Select } from 'antd';

import { generateRandomSignals } from '../utils/generateRandomSignals';

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

const { Title } = Typography;
const { Option } = Select;

function RandomSignals({
  baseCurrency,
  quoteCurrency,
  startDate,
  endDate,

  minPrice,
  maxPrice,
}) {
  const [buySignals, setBuySignals] = useState([]);
  const [sellSignals, setSellSignals] = useState([]);
  const [timeInterval, setTimeInterval] = useState('1h');

  const interval = ['1m', '5m', '1h'];

  const generateSignals = useCallback(() => {
    const newBuySignals = generateRandomSignals(
      startDate,
      endDate,
      timeInterval,
      minPrice,
      maxPrice
    );
    const newSellSignals = generateRandomSignals(
      startDate,
      endDate,
      timeInterval,
      minPrice,
      maxPrice
    );

    setBuySignals(newBuySignals);
    setSellSignals(newSellSignals);
  }, [startDate, endDate, timeInterval, minPrice, maxPrice]);

  useEffect(() => {
    generateSignals();
  }, [generateSignals]);

  const signalsTimestamp = buySignals.map((signal) =>
    new Date(signal.timestamp).toLocaleString()
  );
  const signalsForBuy = buySignals.map((signal) => signal.price);
  const signalsForSell = sellSignals.map((signal) => signal.price);

  const data = {
    labels: signalsTimestamp,
    datasets: [
      {
        label: 'Buy',
        data: signalsForBuy,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Sell',
        data: signalsForSell,
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
    <div>
      <Title
        level={2}
        align="center"
      >
        {baseCurrency} / {quoteCurrency}
      </Title>
      <Row>
        <Col span={12}>
          <Button
            type="primary"
            onClick={generateSignals}
          >
            Generate Signals
          </Button>
        </Col>
        <Col span={12}>
          <Select
            defaultValue="Select Time Interval"
            className="select-timeperiod"
            onChange={(value) => setTimeInterval(value)}
          >
            {interval.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Line
        data={data}
        options={options}
      />
    </div>
  );
}

export default RandomSignals;
