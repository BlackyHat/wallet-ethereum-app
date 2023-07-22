import { useState, useEffect } from 'react';
import scss from './App.module.scss';
// import Loader from '../Loader/Loader';
import { ReactComponent as Logo } from '../../images/base-logo_.svg';
import WalletData from '../WalletData/WalletData';
import { useWallet } from '../../hooks/useWallet';
import PaymentForm from '../PaymentForm/PaymentForm';
import { ToastProvider } from '../../providers/toast-provider';
import { toast } from 'react-hot-toast';
import { PiBriefcaseMetalLight } from 'react-icons/pi';

function App() {
  const { address, balance, error, onConnect } = useWallet();
  const [txs, setTxs] = useState([]);
  console.log('🚀 ~ App ~ txs:', txs);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

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
                  onClick={onConnect}
                  className={scss.connectButton}
                >
                  Connect wallet <PiBriefcaseMetalLight />
                </button>
              )}
            </div>
          </div>
        </header>
        <main className={scss.main}>
          <PaymentForm
            balance={balance}
            onConnect={onConnect}
            setTxs={setTxs}
          />
          {error}
          {/* {txs} */}
        </main>
        <footer className={scss.footer}>
          <div className={scss.container}>
            <p>{'Copyright © ' + new Date().getFullYear() + '.'}</p>
            <span>
              {'Link to repository: '}
              <a
                className={scss.link}
                href="https://github.com/BlackyHat/wallet-ethereum-app"
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
