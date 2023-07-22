import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useWallet } from '../../hooks/useWallet';
import ToastProvider from '../../providers/toast-provider';

import WalletData from '../WalletData/WalletData';
import TransactionsHistory from '../TransactionsHistory/TransactionsHistory';
import PaymentForm from '../PaymentForm/PaymentForm';
import Loader from '../Loader/Loader';
import { ReactComponent as Logo } from '../../images/base-logo_.svg';
import { PiBriefcaseMetalLight } from 'react-icons/pi';
import scss from './App.module.scss';

function App() {
  const { address, balance, error, onConnect } = useWallet();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleConnect = async () => {
    setIsLoading(true);
    await onConnect();
    setIsLoading(false);
  };

  return (
    <>
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
                  disabled={isLoading}
                  onClick={handleConnect}
                  className={scss.connectButton}
                >
                  Connect wallet
                  {isLoading ? <Loader /> : <PiBriefcaseMetalLight />}
                </button>
              )}
            </div>
          </div>
        </header>
        <main className={scss.main}>
          <PaymentForm
            balance={balance}
            onConnect={onConnect}
            setTransactions={setTransactions}
          />
          {error}
          {transactions.length > 0 && (
            <TransactionsHistory data={transactions} />
          )}
        </main>
        <footer className={scss.footer}>
          <div className={scss.container}>
            <p>{'Copyright © ' + new Date().getFullYear() + '.'}</p>
            <span>
              {'Link to repository: '}
              <a
                className={scss.link}
                href="https://github.com/BlackyHat/wallet-ethereum-app"
                target="_blank"
                rel="noreferrer"
              >
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
      <ToastProvider />
    </>
  );
}

export default App;
