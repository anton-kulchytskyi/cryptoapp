import { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import { LineChart, Loader } from '../components';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimeperiod] = useState('7d');
  const { data, error, isLoading } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  const cryptoDetails = data?.data?.coin;

  const volumeKey = cryptoDetails && cryptoDetails['24hVolume'];

  const time = ['1h', '3h', '12h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${millify(+cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'Rank',
      value: cryptoDetails?.rank,
      icon: <NumberOutlined />,
    },
    {
      title: '24h Volume',
      value: `$ ${millify(+volumeKey)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${millify(+cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(+cryptoDetails?.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(+cryptoDetails?.supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(+cryptoDetails?.supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (error) return 'UUUPPSS!!! SOMETHING WENT WONG...';
  if (isLoading) return <Loader />;

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title
          level={2}
          className="coin-name"
        >
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <Row className="chart-header">
        <Title
          level={2}
          className="chart-title"
        >
          {cryptoDetails?.name} price Chart
        </Title>
        <Col className="price-container">
          <Title
            level={5}
            className="price-change"
          >
            {coinHistory?.data?.change}%
          </Title>
          <Title
            level={5}
            className="current-price"
          >
            Current {cryptoDetails?.name} Price: $
            {millify(+cryptoDetails?.price)}
          </Title>
        </Col>
      </Row>
      <LineChart coinHistoryFirst={coinHistory} />
      
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title
              level={3}
              className="coin-details-heading"
            >
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails?.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col
              key={title}
              className="coin-stats"
            >
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title
              level={3}
              className="coin-details-heading"
            >
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails?.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col
              key={title}
              className="coin-stats"
            >
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title
            level={3}
            className="coin-details-heading"
          >
            What is {cryptoDetails?.name}?
          </Title>
          <Text strong>{cryptoDetails?.description}</Text>
        </Row>
        <Col className="coin-links">
          <Title
            level={3}
            className="coin-details-heading"
          >
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links?.map((link) => (
            <Row
              className="coin-link"
              key={link.name}
            >
              <Title
                level={5}
                className="link-name"
              >
                {link.type}
              </Title>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
