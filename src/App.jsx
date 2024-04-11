import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { randomSignalData } from './utils/RandomSignalData';

import {
  CryptoCompare,
  Cryptocurrencies,
  CryptoDetails,
  Homepage,
  Navbar,
  RandomSignals,
} from './components';

const App = () => {
  const {
    baseCurrency,
    quoteCurrency,
    startDate,
    endDate,
    minPrice,
    maxPrice,
  } = randomSignalData;
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route
                path="/"
                element={<Homepage />}
              />
            </Routes>
            <Routes>
              <Route
                path="/compare"
                element={<CryptoCompare />}
              />
            </Routes>
            <Routes>
              <Route
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
            </Routes>
            <Routes>
              <Route
                path="/signals"
                element={
                  <RandomSignals
                    baseCurrency={baseCurrency}
                    quoteCurrency={quoteCurrency}
                    startDate={startDate}
                    endDate={endDate}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                  />
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/crypto/:coinId"
                element={<CryptoDetails />}
              />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Crypto App <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Crypto</Link>
            <Link to="/compare">Compare</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
