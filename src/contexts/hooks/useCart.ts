import { useContext } from 'react';
import { cartProductType, SizeType } from 'constants/type';
import { AuthContext } from 'contexts/contexts/AuthContext';
import {
  fetchCarts,
  removeCartItem,
  updateCarts,
} from 'contexts/actions/AuthAction';

export const useCart = () => {
  const { state, dispatch } = useContext(AuthContext);
  const cart = state.user?.cart ?? [];

  const getCart = async () => {
    // Call API in here
    let dataCart: cartProductType[] = [
      {
        id: 1,
        name: 'Regular Fit Slogan',
        cost: 1190,
        amount: 2,
        size: SizeType.L,
        categoryId: 1,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
      },
      {
        id: 1,
        name: 'Regular Fit Slogan',
        cost: 1190,
        amount: 2,
        size: SizeType.M,
        categoryId: 1,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
      },
      {
        id: 3,
        name: 'Regular Fit Black',
        cost: 1690,
        amount: 1,
        size: SizeType.L,
        categoryId: 1,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
      },
    ];

    dispatch(fetchCarts(dataCart));
  };

  const updateCart = async (
    cartItem: cartProductType & { amountChange?: number },
  ): Promise<boolean> => {
    if (cartItem) {
      // Call API to update carts
      dispatch(updateCarts(cartItem));
      return true;
    }
    return false;
  };

  const deleteItem = async (cartItem: cartProductType) => {
    if (cartItem) {
      // Call API to delete carts
      dispatch(removeCartItem(cartItem));
    }
  };

  return { cart, getCart, updateCart, deleteItem };
};
