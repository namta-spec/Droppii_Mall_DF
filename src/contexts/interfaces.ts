import {
  ActionType,
  addressType,
  cartProductType,
  categoryProductType,
  productType,
} from 'constants/type';
import React from 'react';

export interface TInitialAuthState {
  user: {
    id: number | null;
    fullName: string;
    email: string;
    address: addressType | null;
    listAddress: addressType[];
    cart: cartProductType[];
  };
  product: {
    listProductCategory: categoryProductType[];
    listProduct: productType[];
  };
}

export interface IContextAuth {
  state: TInitialAuthState;
  dispatch: React.Dispatch<ActionType>;
}
