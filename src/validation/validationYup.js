import * as Yup from 'yup';
// import { ethers } from 'ethers';

const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const paymentSchema = Yup.object().shape({
  address: Yup.string()
    .matches(ethereumAddressRegex, 'Invalid Ethereum wallet address')
    .min(40, 'minlenght 40 symbols'),
  ether: Yup.number().positive().min(0),
});
