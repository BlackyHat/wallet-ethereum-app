import { useState } from 'react';
import scss from './App.module.scss';
// import Loader from '../Loader/Loader';
import { ReactComponent as Logo } from '../../images/base-logo_.svg';
import { ethers } from 'ethers';
import WalletData from '../WalletData/WalletData';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  console.log('🚀 ~ App ~ walletAddress:', walletAddress);

  console.log('load APP');

  const onConnect = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
        await getBalance(accounts[0]);
      } catch (error) {
        setErrorMessage(error.message);
        console.log('Error to get account', error);
      }
    } else {
      setErrorMessage('To continue you need to install MetaMask App');
    }
  };

  const getBalance = async (account) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });

      const normalizedBalance = ethers.formatEther(balance);
      console.log('🚀 ~ getBalance ~ normalizedBalance:', normalizedBalance);

      setBalance(normalizedBalance);
    } catch (error) {
      console.log('Error to get balance', error);
    }
  };

  const submit = () => {
    console.log('SUBMIT');
  };
  return (
    <div className={scss.wrapper}>
      <header className={scss.header}>
        <div className={scss.container}>
          <div className={scss.headerWrapper}>
            <Logo className={scss.headerLogo} />
            {walletAddress ? (
              <WalletData balance={balance} walletAddress={walletAddress} />
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
            placeholder="Please input accout number"
          />
          <input
            className={scss.input}
            type="text"
            placeholder="Please input amount of coins"
          />
          <button className={scss.connectButton}>pay</button>
        </form>
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
