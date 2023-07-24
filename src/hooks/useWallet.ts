import { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const onConnect = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAddress(accounts[0]);
        await getBalance(accounts[0]);
        window.ethereum.on('accountChanged', onConnect);
        window.ethereum.on('chainChanged', onConnect);
        toast.success('Success.');
      } catch (error: any) {
        setError(error.message);
      }
    } else {
      setError('No crypto wallet found. Please install it.');
    }
  };

  const getBalance = async (account: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });

      const normalizedBalance = +ethers.formatEther(balance);
      setBalance(normalizedBalance);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return { address, balance, error, onConnect };
};
