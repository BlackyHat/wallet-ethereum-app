import { Dispatch, SetStateAction } from 'react';

export interface ITransaction {
  date: string;
  from: string;
  to: string | null;
  value: bigint;
  hash: string;
}
export interface TransactionsHistoryProps {
  data: ITransaction[];
}

export interface IPaymentProps {
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  setTransactions: Dispatch<SetStateAction<ITransaction[]>>;
  ether: string;
  address: string;
}

export interface PaymentFormProps {
  balance: number;
  onConnect: () => void;
  setTransactions: Dispatch<SetStateAction<ITransaction[]>>;
}

export interface ValuesProps {
  ether: number;
  address: string;
}
export interface IWalletProps {
  balance: number;
  walletAddress: string;
}
