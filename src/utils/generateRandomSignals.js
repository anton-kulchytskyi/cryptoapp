export function generateRandomSignals(
  startDate,
  endDate,
  period,
  minPrice,
  maxPrice
) {
  const signals = [];

  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  const interval = {
    '1m': 60000,
    '5m': 300000,
    '1h': 3600000,
  };

  const numCandles = Math.floor((endTime - startTime) / interval[period]);

  for (let i = 0; i < numCandles; i++) {
    const timestamp = startTime + i * interval[period];
    const price = Math.random() * (maxPrice - minPrice) + minPrice;

    const signal = {
      timestamp,
      type: Math.random() > 0.5 ? 'buy' : 'sell',
      price,
    };

    signals.push(signal);
  }

  return signals;
}
