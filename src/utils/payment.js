import { ethers } from 'ethers';

export const startPayment = async ({
  setErrorMessage,
  setTxs,
  ether,
  address,
}) => {
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
