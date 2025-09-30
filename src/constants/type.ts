import {
  FETCH_CARTS,
  FETCH_CATEGORIES,
  FETCH_LIST_ADDRESS,
  FETCH_PRODUCTS,
  REMOVE_CART_ITEM,
  UPDATE_ADDRESS,
  UPDATE_CARTS,
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

export type filterType = {
  sortType: SortType;
  price: number[];
  size: SizeType | null;
};

export type typeCategory =
  | 'Discount'
  | 'E-Wallet'
  | 'Location'
  | 'Credit'
  | 'Account';

export type categoryProductType = {
  id: number;
  value: String;
};

export type productType = {
  id: number;
  name: string;
  cost: number;
  image: string;
  categoryId: categoryProductType['id'];
  discount?: number;
  saved?: boolean;
  description?: string;
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
  | { type: typeof FETCH_CARTS; payload: cartProductType[] }
  | {
      type: typeof UPDATE_CARTS;
      payload: cartProductType & { amountChange?: number };
    }
  | { type: typeof REMOVE_CART_ITEM; payload: cartProductType }
  | { type: typeof FETCH_CATEGORIES; payload: categoryProductType[] }
  | { type: typeof FETCH_PRODUCTS; payload: productType[] };

export type ReviewType = {
  numberOfRatings: number;
  numberOfReview: number;
  numberOfOneStar: number;
  numberOfTwoStar: number;
  numberOfThreeStar: number;
  numberOfFourStar: number;
  numberOfFiveStar: number;
  rating: number;
};

export enum Rating {
  oneStar = 1,
  twoStar = 2,
  threeStar = 3,
  fourStar = 4,
  fiveStar = 5,
}

export type ReviewerType = {
  rating: Rating;
  review: string;
  owner: string;
  time: Date;
};
