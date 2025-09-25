import { ActionType, addressType, cartProductType } from 'constants/type';
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
}

export interface IContextAuth {
  state: TInitialAuthState;
  dispatch: React.Dispatch<ActionType>;
}
