import { ethers } from 'ethers';

import { shortenAddress } from '../../utils/format';
import { addClipboard } from '../../utils/addClipboard';
import { TransactionsHistoryProps } from '../../helpers/interfaces';
import scss from './TransactionsHistory.module.scss';

const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({ data }) => {
  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const { title } = e.target as HTMLTableCellElement;
    addClipboard(title);
  };

  return (
    <table className={scss.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>HASH</th>
          <th>RECIPIENT</th>
          <th>ETH</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map(({ date, to, value, hash }) => {
            const formattedValue = ethers.formatEther(value);
            const recipient = to ? to : 'recipient';
            return (
              <tr key={hash}>
                <td title={date} onClick={handleCellClick}>
                  {date}
                </td>
                <td title={hash} onClick={handleCellClick}>
                  {shortenAddress(hash)}
                </td>
                <td title={recipient} onClick={handleCellClick}>
                  {shortenAddress(recipient)}
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
