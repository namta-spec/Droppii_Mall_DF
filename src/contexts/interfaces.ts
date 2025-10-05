import {
  ActionType,
  addressType,
  CardType,
  cartProductType,
  categoryProductType,
  productType,
} from 'constants/type';
import React from 'react';

export interface IUserState {
  id: number | string | null;
  fullName: string;
  email: string;
  address: addressType | null;
  listAddress: addressType[];
  cart: cartProductType[];
  listCard: CardType[];
  card: CardType | null;
}

export interface TInitialAuthState {
  user: IUserState | null;
  product: {
    listProductCategory: categoryProductType[];
    listProduct: productType[];
  };
}

export interface IContextAuth {
  state: TInitialAuthState;
  dispatch: React.Dispatch<ActionType>;
}
