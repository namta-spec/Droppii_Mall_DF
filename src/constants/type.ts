import {
  FETCH_CARTS,
  FETCH_LIST_ADDRESS,
  UPDATE_ADDRESS,
} from 'contexts/constant';

export enum SizeType {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = '2XL',
  XXXL = '3XL',
  XXXXL = '4XL',
}

export type SortType = {
  id: number;
  label: string;
};

export type typeCategory =
  | 'Discount'
  | 'E-Wallet'
  | 'Location'
  | 'Credit'
  | 'Account';

export type productType = {
  id: number;
  name: string;
  cost: number;
  image: string;
  discount?: number;
  saved?: boolean;
};

export type cartProductType = {
  amount: number;
  size: SizeType;
} & productType;

export type addressType = {
  id: number;
  title: string;
  address: string;
  default?: boolean;
};

export enum categoryMethod {
  Card = 'Card',
  Cash = 'Cash',
  ApplePay = 'ApplePay',
}

export type TypePaymentMethod = {
  id: number;
  title: string;
  category: categoryMethod;
};

export type ActionType =
  | { type: typeof FETCH_LIST_ADDRESS; payload: addressType[] }
  | { type: typeof UPDATE_ADDRESS; payload: addressType | null }
  | { type: typeof FETCH_CARTS; payload: cartProductType[] };
