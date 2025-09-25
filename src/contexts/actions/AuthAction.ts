import { ActionType, addressType, cartProductType } from 'constants/type';
import {
  FETCH_CARTS,
  FETCH_LIST_ADDRESS,
  UPDATE_ADDRESS,
} from 'contexts/constant';

export const fetchListAddress = (listAddress: addressType[]): ActionType => {
  return {
    type: FETCH_LIST_ADDRESS,
    payload: listAddress,
  };
};

export const updateAddress = (address: addressType | null): ActionType => {
  return {
    type: UPDATE_ADDRESS,
    payload: address,
  };
};

export const fetchCarts = (dataCarts: cartProductType[]): ActionType => {
  return {
    type: FETCH_CARTS,
    payload: dataCarts,
  };
};
