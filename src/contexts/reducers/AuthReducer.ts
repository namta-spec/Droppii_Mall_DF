import deepEqual from 'deep-equal';
import { TInitialAuthState } from '../interfaces';
import { ActionType } from 'constants/type';
import {
  REMOVE_CART_ITEM,
  FETCH_CARTS,
  FETCH_CATEGORIES,
  FETCH_LIST_ADDRESS,
  FETCH_PRODUCTS,
  UPDATE_ADDRESS,
  UPDATE_CARTS,
  SET_USER,
  FETCH_LIST_CARD,
  UPDATE_CARD,
} from '../constant';

const initAuthState: TInitialAuthState = {
  user: null,
  product: {
    listProductCategory: [],
    listProduct: [],
  },
};

function AuthReducer(
  state: TInitialAuthState,
  action: ActionType,
): TInitialAuthState {
  switch (action.type) {
    case SET_USER:
      return !deepEqual(state.user, action.payload)
        ? {
            ...state,
            user: action.payload,
          }
        : state;
    case FETCH_LIST_ADDRESS:
      if (!state.user) return state;
      return !deepEqual(state.user.listAddress, action.payload)
        ? {
            ...state,
            user: {
              ...state.user,
              listAddress: action.payload,
            },
          }
        : state;
    case UPDATE_ADDRESS:
      if (!state.user) return state;
      return !deepEqual(state.user.address, action.payload)
        ? {
            ...state,
            user: {
              ...state.user,
              address: action.payload,
            },
          }
        : state;
    case FETCH_LIST_CARD:
      if (!state.user) return state;
      return !deepEqual(state.user.listCard, action.payload)
        ? {
            ...state,
            user: {
              ...state.user,
              listCard: action.payload,
            },
          }
        : state;
    case UPDATE_CARD:
      if (!state.user) return state;
      return !deepEqual(state.user.card, action.payload)
        ? {
            ...state,
            user: {
              ...state.user,
              card: action.payload,
            },
          }
        : state;
    case FETCH_CARTS:
      if (!state.user) return state;
      return !deepEqual(state.user.cart, action.payload)
        ? {
            ...state,
            user: {
              ...state.user,
              cart: action.payload,
            },
          }
        : state;
    case UPDATE_CARTS:
      if (!state.user) return state;
      const existingItemIndex = state.user.cart.findIndex(
        item =>
          item.id === action.payload.id && item.size === action.payload.size,
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...state.user.cart];
        updatedItems[existingItemIndex].amount +=
          action.payload.amountChange || 1;
        if (updatedItems[existingItemIndex].amount === 0) {
          updatedItems.splice(existingItemIndex, 1);
        }
        return {
          ...state,
          user: {
            ...state.user,
            cart: updatedItems,
          },
        };
      }
      return {
        ...state,
        user: {
          ...state.user,
          cart: [...state.user.cart, action.payload],
        },
      };
    case REMOVE_CART_ITEM:
      if (!state.user) return state;
      const existItemIndex = state.user.cart.findIndex(
        item =>
          item.id === action.payload.id && item.size === action.payload.size,
      );
      if (existItemIndex > -1) {
        const updatedItems = [...state.user.cart];
        updatedItems.splice(existItemIndex, 1);
        return {
          ...state,
          user: {
            ...state.user,
            cart: updatedItems,
          },
        };
      }
      return state;

    case FETCH_CATEGORIES:
      return !deepEqual(state.product.listProductCategory, action.payload)
        ? {
            ...state,
            product: {
              ...state.product,
              listProductCategory: action.payload,
            },
          }
        : state;
    case FETCH_PRODUCTS:
      return !deepEqual(state.product.listProduct, action.payload)
        ? {
            ...state,
            product: {
              ...state.product,
              listProduct: action.payload,
            },
          }
        : state;
    default:
      return state;
  }
}

export { initAuthState };
export default AuthReducer;
