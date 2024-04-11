import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';

const MultiLineChart = ({
  firstId,
  secondId,
  timePeriod,
}) => {
  const dataforFirst = {
    coinId: firstId,
    timePeriod,
  };
  const dataforSecond = {
    coinId: secondId,
    timePeriod,
  };
  const { data: coinHistoryFirst } = useGetCryptoHistoryQuery(dataforFirst);

  const { data: coinHistorySecond } = useGetCryptoHistoryQuery(dataforSecond);

  return (
    <LineChart
      coinHistoryFirst={coinHistoryFirst}
      coinHistorySecond={coinHistorySecond}
    />
  );
};

export default MultiLineChart;
