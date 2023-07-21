import { useState } from 'react';
import scss from './App.module.scss';
// import Loader from '../Loader/Loader';
import { ReactComponent as Logo } from '../../images/base-logo_.svg';
import { ethers } from 'ethers';
import WalletData from '../WalletData/WalletData';

const startPayment = async ({ setErrorMessage, setTxs, ether, address }) => {
  try {
    if (!window.ethereum)
      setErrorMessage('No crypto wallet found. Please install it.');
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    ethers.getAddress(address);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.parseEther(ether),
    });
    const receipt = await tx.wait();
    console.log('🚀 ~ startPayment ~ receipt:', receipt);
    console.log('🚀 ~ startPayment ~ tx:', tx);

    setTxs([tx]);
  } catch (err) {
    setErrorMessage(err.message);
  }
};

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [txs, setTxs] = useState([]);
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

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
      window.ethereum.on('accountChanged', onConnect);
      window.ethereum.on('chainChanged', onConnect);
    } else {
      setErrorMessage('No crypto wallet found. Please install it.');
    }
  };

  const getBalance = async (account) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });

      const normalizedBalance = +ethers.formatEther(balance);
      setBalance(normalizedBalance);
    } catch (error) {
      console.log('Error to get balance', error);
    }
  };

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
        {errorMessage}
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
