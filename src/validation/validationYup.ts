import * as Yup from 'yup';
import { ethers } from 'ethers';

const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const paymentSchema = Yup.object().shape({
  ether: Yup.number()
    .min(0.000001, 'Minimum amount is 0.000001')
    .max(100000, 'Maximum amount is 100000')
    .required('Amount is required'),
  address: Yup.string()
    .matches(ethereumAddressRegex, 'Invalid Ethereum wallet address')
    .test('checksum', 'Invalid Ethereum wallet address checksum', (address) => {
      const isValid = ethers.isAddress(address);
      if (!isValid) {
        return false;
      }
      try {
        const checksum = ethers.getAddress(address);
        if (!checksum) {
          return false;
        }
      } catch (error) {
        return false;
      }

      return true;
    }),
});
