import {
  ActionType,
  addressType,
  CardType,
  cartProductType,
  categoryProductType,
  productType,
} from 'constants/type';
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

export const fetchListCard = (listCard: CardType[]): ActionType => {
  return {
    type: FETCH_LIST_CARD,
    payload: listCard,
  };
};

export const updateCard = (card: CardType | null): ActionType => {
  return {
    type: UPDATE_CARD,
    payload: card,
  };
};

export const fetchCarts = (dataCarts: cartProductType[]): ActionType => {
  return {
    type: FETCH_CARTS,
    payload: dataCarts,
  };
};

export const updateCarts = (
  dataCart: cartProductType & { amountChange?: number },
): ActionType => {
  return {
    type: UPDATE_CARTS,
    payload: dataCart,
  };
};

export const removeCartItem = (dataCart: cartProductType): ActionType => {
  return {
    type: REMOVE_CART_ITEM,
    payload: dataCart,
  };
};

export const fetchCategories = (
  dataCategory: categoryProductType[],
): ActionType => {
  return {
    type: FETCH_CATEGORIES,
    payload: dataCategory,
  };
};

export const fetchProducts = (dataProducts: productType[]): ActionType => {
  return {
    type: FETCH_PRODUCTS,
    payload: dataProducts,
  };
};

export const setUser = (dataUser: IUserState | null): ActionType => {
  return {
    type: SET_USER,
    payload: dataUser,
  };
};
