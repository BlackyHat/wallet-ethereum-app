import PropTypes from 'prop-types';

import { shortenAddress } from '../../utils/format';
import { addClipboard } from '../../utils/addClipboard';

import { FaEthereum } from 'react-icons/fa';
import scss from './WalletData.module.scss';

const WalletData = ({ balance, walletAddress }) => {
  const handleWalletClick = async () => {
    addClipboard(walletAddress);
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
