export const shortenAddress = (address, start = 5, end = 4) => {
  if (!address) return '';
  return address.slice(0, start) + '...' + address.slice(-end);
};
