import scss from './WalletData.module.scss';
import PropTypes from 'prop-types';

const WalletData = ({ balance, walletAddress }) => {
  function shortenAddress(address, start = 5, end = 4) {
    if (!address) return '';
    return address.slice(0, start) + '...' + address.slice(-end);
  }

  return (
    <div className={scss.walletInfo}>
      <span className={scss.balance}>{(+balance).toFixed(3)}</span>
      <span className={scss.address}>{shortenAddress(walletAddress)}</span>
    </div>
  );
};

export default WalletData;

WalletData.propTypes = {
  balance: PropTypes.string.isRequired,
  walletAddress: PropTypes.string.isRequired,
};
