import { useState } from 'react';
import scss from './App.module.scss';
// import Loader from '../Loader/Loader';
import { ReactComponent as Logo } from '../../images/base-logo_.svg';
import WalletData from '../WalletData/WalletData';
import { useWallet } from '../../hooks/useWallet';
import { startPayment } from '../../utils/payment';

function App() {
  const { address, balance, error, onConnect } = useWallet();
  const [txs, setTxs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    await startPayment({
      setErrorMessage,
      setTxs,
      ether: data.get('ether'),
      address: data.get('address'),
    });
    onConnect();
  };

  return (
    <div className={scss.wrapper}>
      <header className={scss.header}>
        <div className={scss.container}>
          <div className={scss.headerWrapper}>
            <Logo className={scss.headerLogo} />
            {address ? (
              <WalletData balance={balance} walletAddress={address} />
            ) : (
              <button
                type="button"
                onClick={onConnect}
                className={scss.connectButton}
              >
                Connect wallet
              </button>
            )}
          </div>
        </div>
      </header>
      <main className={scss.main}>
        <form className={scss.payingForm} onSubmit={submit}>
          <input
            className={scss.input}
            type="text"
            name="address"
            placeholder="Recipient Address"
          />
          <input
            className={scss.input}
            name="ether"
            type="number"
            min="0"
            step="0.001"
            max={balance}
            placeholder="Amount in ETH"
          />
          <button className={scss.connectButton}>Send ETH payment</button>
        </form>
        {errorMessage || error}
        {txs}
      </main>
      <footer className={scss.footer}>
        <div className={scss.container}>
          <p>{'Copyright © ' + new Date().getFullYear() + '.'}</p>
          <span>
            {'Link to repository: '}
            <a href="https://github.com/BlackyHat/wallet-ethereum-app">
              My Wallet App
            </a>
          </span>
          <p>
            Life is not a destination, it&apos;s a journey, and sometimes you
            have to take the hard road to get where you need to go.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
