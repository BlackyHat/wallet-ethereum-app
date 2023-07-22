import { ethers } from 'ethers';

export const startPayment = async ({
  setErrorMessage,
  setTransactions,
  ether,
  address,
}) => {
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

    const receipt = await tx.wait();
    console.log('🚀 ~ startPayment ~ receipt:', receipt);
    console.log('🚀 ~ startPayment ~ tx:', tx);

    const date = new Date().toLocaleString();
    const { from, to, value, hash } = tx;
    const newTransaction = { date, from, to, value, hash };

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  } catch (error) {
    setErrorMessage('Payment cancelled.');
    throw new Error();
  }
};
