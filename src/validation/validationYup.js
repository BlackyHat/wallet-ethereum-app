import * as Yup from 'yup';
import { ethers } from 'ethers';

const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const paymentSchema = Yup.object().shape({
  address: Yup.string()
    .matches(ethereumAddressRegex, 'Invalid Ethereum wallet address')
    .test('checksum', 'Invalid Ethereum wallet address checksum', (value) => {
      if (!value) return true;

      const cleanValue = value.toLowerCase().replace('0x', '');
      const hash = ethers.keccak256(cleanValue);
      for (let i = 0; i < 40; i++) {
        const digit = parseInt(hash[i], 16);
        const char = cleanValue[i];
        if (
          (digit > 7 && char !== char.toUpperCase()) ||
          (digit <= 7 && char !== char.toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    }),
  ether: Yup.number(),
});
