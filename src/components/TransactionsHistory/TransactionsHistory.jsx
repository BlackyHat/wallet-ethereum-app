import PropTypes from 'prop-types';
import { ethers } from 'ethers';

import scss from './TransactionsHistory.module.scss';
import { shortenAddress } from '../../utils/formatAddress';
import { addClipboard } from '../../utils/addClipboard';

const TransactionsHistory = ({ data }) => {
  const handleCellClick = (e) => {
    const { title } = e.target;
    addClipboard(title);
  };

  return (
    <table className={scss.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>HASH</th>
          <th>RECEPIENT</th>
          <th>ETH</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map(({ date, to, value, hash }) => {
            const formattedValue = ethers.formatEther(value);
            return (
              <tr key={hash}>
                <td title={date} onClick={handleCellClick}>
                  {date}
                </td>
                <td title={hash} onClick={handleCellClick}>
                  {shortenAddress(hash)}
                </td>
                <td title={to} onClick={handleCellClick}>
                  {shortenAddress(to)}
                </td>
                <td title={formattedValue} onClick={handleCellClick}>
                  {formattedValue + ' ETH'}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TransactionsHistory;

TransactionsHistory.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};
