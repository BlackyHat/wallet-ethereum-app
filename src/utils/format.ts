export const shortenAddress = (address: string, start = 5, end = 4) => {
  if (!address) return '';
  return address.slice(0, start) + '...' + address.slice(-end);
};

export const formatAmount = (value: string) =>
  +Number.parseFloat(value).toFixed(6);
