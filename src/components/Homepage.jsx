import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptoQuery } from '../services/cryptoApi';
import { Cryptocurrencies, Loader } from '../components';

const { Title } = Typography;

const Homepage = () => {
  const { data, isLoading } = useGetCryptoQuery(10);
  const globalStats = data?.data?.stats;

  if (isLoading) return <Loader />;
  return (
    <>
      <Title
        level={2}
        className="heading"
      >
        Clobal Statistic
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Crypto"
            value={globalStats.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title
          level={2}
          className="home-title"
        >
          Top 10 Crypto
        </Title>
        <Title
          level={3}
          className="show-more"
        >
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies limit />
    </>
  );
};

export default Homepage;
