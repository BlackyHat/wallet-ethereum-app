import { useState } from 'react';
import { ethers } from 'ethers';

export const useWallet = () => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  const onConnect = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAddress(accounts[0]);
        await getBalance(accounts[0]);
      } catch (error) {
        setError(error.message);
      }
      window.ethereum.on('accountChanged', onConnect);
      window.ethereum.on('chainChanged', onConnect);
    } else {
      setError('No crypto wallet found. Please install it.');
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
      setError(error.message);
    }
  };

  return { address, balance, error, onConnect };
};
