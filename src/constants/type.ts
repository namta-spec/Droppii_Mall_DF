import {
  FETCH_CARTS,
  FETCH_CATEGORIES,
  FETCH_LIST_ADDRESS,
  FETCH_LIST_CARD,
  FETCH_PRODUCTS,
  REMOVE_CART_ITEM,
  SET_USER,
  UPDATE_ADDRESS,
  UPDATE_CARD,
  UPDATE_CARTS,
} from 'contexts/constant';
import { IUserState } from 'contexts/interfaces';

export type AsyncStorageType = {
  hasSeenOnboarding: boolean;
};

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

export type ActionType =
  | { type: typeof FETCH_LIST_ADDRESS; payload: addressType[] }
  | { type: typeof UPDATE_ADDRESS; payload: addressType | null }
  | { type: typeof FETCH_LIST_CARD; payload: CardType[] }
  | { type: typeof UPDATE_CARD; payload: CardType | null }
  | { type: typeof FETCH_CARTS; payload: cartProductType[] }
  | {
      type: typeof UPDATE_CARTS;
      payload: cartProductType & { amountChange?: number };
    }
  | { type: typeof REMOVE_CART_ITEM; payload: cartProductType }
  | { type: typeof FETCH_CATEGORIES; payload: categoryProductType[] }
  | { type: typeof FETCH_PRODUCTS; payload: productType[] }
  | { type: typeof SET_USER; payload: IUserState | null };

export type ReviewSummaryType = {
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

export type ReviewType = {
  reviewSummary: ReviewSummaryType;
  listReview: ReviewerType[];
};

export enum InputAuthName {
  default = 'off',
  fullname = 'username',
  email = 'email',
  password = 'password',
}

export enum InputStatus {
  deafult = 'deafult',
  error = 'error',
  success = 'success',
}

export type FirebaseAuthErrorCode =
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/invalid-credential'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/too-many-requests'
  | 'auth/operation-not-allowed'
  | 'auth/missing-password'
  | 'auth/network-request-failed'
  | 'auth/internal-error';

export type CardBrand =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'jcb'
  | 'discover'
  | 'unionpay'
  | 'diners'
  | 'unknown';

export type StripeCard = {
  brand: CardBrand;
  last_four: number;
  exp_month?: number;
  exp_year?: number;
};

export type CardType = {
  token: string;
  card: StripeCard;
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
