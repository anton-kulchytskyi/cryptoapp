import { useState } from 'react';
import { Row, Col, Select } from 'antd';

import { MultiLineChart } from '../components';

import { useGetCryptoQuery } from '../services/cryptoApi';

const { Option } = Select;

const CryptoCompare = () => {
  const [timePeriod, setTimeperiod] = useState('7d');
  const { data: cryptosList } = useGetCryptoQuery(50);
  const [searchTermFirst, setSearchTermFirst] = useState('Select first crypto');
  const [searchTermSecond, setSearchTermSecond] = useState(
    'Select second crypto'
  );
  const handleChangeFirst = (selectedOption) => {
    setSearchTermFirst(selectedOption);
  };
  const handleChangeSecond = (selectedOption) => {
    setSearchTermSecond(selectedOption);
  };

  const time = ['1h', '3h', '12h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  return (
    <>
      <Row>
        <Col span={8}>
          <Select
            value={searchTermFirst}
            className="select-timeperiod"
            placeholder="Search Crypto"
            onChange={handleChangeFirst}
          >
            {cryptosList?.data?.coins.map((crypto) => (
              <Option
                key={crypto.uuid}
                value={crypto.uuid}
              >
                {crypto.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            value={searchTermSecond}
            className="select-timeperiod"
            placeholder="Search Crypto"
            onChange={handleChangeSecond}
          >
            {cryptosList?.data?.coins.map((crypto) => (
              <Option
                key={crypto.uuid}
                value={crypto.uuid}
              >
                {crypto.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            defaultValue="Select Timeperiod"
            className="select-timeperiod"
            onChange={(value) => setTimeperiod(value)}
          >
            {time.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
          </Select>
        </Col>
      </Row>
      <MultiLineChart
        firstId={searchTermFirst}
        secondId={searchTermSecond}
        timePeriod={timePeriod}
      />
    </>
  );
};

export default CryptoCompare;
