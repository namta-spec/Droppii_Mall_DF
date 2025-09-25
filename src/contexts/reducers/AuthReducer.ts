import deepEqual from 'deep-equal';
import { TInitialAuthState } from '../interfaces';
import { ActionType } from 'constants/type';
import { FETCH_CARTS, FETCH_LIST_ADDRESS, UPDATE_ADDRESS } from '../constant';

const initAuthState: TInitialAuthState = {
  user: {
    id: null,
    fullName: '',
    email: '',
    address: null,
    listAddress: [],
    cart: [],
  },
};

function AuthReducer(
  state: TInitialAuthState,
  action: ActionType,
): TInitialAuthState {
  switch (action.type) {
    case FETCH_LIST_ADDRESS:
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
      return !deepEqual(state.user.address, action.payload)
        ? {
            ...state,
            user: {
              ...state.user,
              address: action.payload,
            },
          }
        : state;
    case FETCH_CARTS:
      return !deepEqual(state.user.cart, action.payload)
        ? {
            ...state,
            user: {
              ...state.user,
              cart: action.payload,
            },
          }
        : state;
    default:
      return state;
  }
}

export { initAuthState };
export default AuthReducer;
