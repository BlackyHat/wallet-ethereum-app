import * as Yup from 'yup';
import { ethers } from 'ethers';

const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const paymentSchema = Yup.object().shape({
  ether: Yup.number().positive().min(0),
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
