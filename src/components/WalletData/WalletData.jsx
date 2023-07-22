import scss from './WalletData.module.scss';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { FaEthereum } from 'react-icons/fa';

const WalletData = ({ balance, walletAddress }) => {
  function shortenAddress(address, start = 5, end = 4) {
    if (!address) return '';
    return address.slice(0, start) + '...' + address.slice(-end);
  }

  const handleWalletClick = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast.success('Copied!');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className={scss.walletInfo}>
      <FaEthereum className={scss.walletIcon} />
      <span className={scss.balance} onClick={handleWalletClick}>
        {balance.toFixed(3)}
      </span>
      <span
        title={walletAddress}
        className={scss.address}
        onClick={handleWalletClick}
      >
        {shortenAddress(walletAddress)}
      </span>
    </div>
  );
};

export default WalletData;

WalletData.propTypes = {
  balance: PropTypes.number.isRequired,
  walletAddress: PropTypes.string.isRequired,
};
