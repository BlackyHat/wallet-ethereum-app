export const shortenAddress = (address, start = 5, end = 4) => {
  if (!address) return '';
  return address.slice(0, start) + '...' + address.slice(-end);
};

export const formatAmount = (value) =>
  Math.floor(+Number.parseFloat(value).toFixed(6));
