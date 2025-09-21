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
