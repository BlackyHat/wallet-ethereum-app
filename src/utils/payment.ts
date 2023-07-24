import { ethers } from 'ethers';
import { IPaymentProps } from '../helpers/interfaces';

export const startPayment = async ({
  setErrorMessage,
  setTransactions,
  ether,
  address,
}: IPaymentProps) => {
  try {
    if (!window.ethereum)
      setErrorMessage('No crypto wallet found. Please install it.');
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.parseEther(ether),
    });

    const date = new Date().toLocaleString();
    const { from, to, value, hash } = tx;
    const newTransaction = { date, from, to, value, hash };

    setTransactions((prevState) => [...prevState, newTransaction]);
  } catch (error) {
    setErrorMessage('Payment cancelled.');
    throw new Error();
  }
};
