import { useContext } from 'react';
import { cartProductType, SizeType } from 'constants/type';
import { AuthContext } from 'contexts/contexts/AuthContext';
import { fetchCarts } from 'contexts/actions/AuthAction';

export const useCart = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { cart } = state.user;

  const getCart = async () => {
    // Call API in here
    let dataCart: cartProductType[] = [
      {
        id: 1,
        name: 'Regular Fit Slogan',
        cost: 1190,
        amount: 2,
        size: SizeType.L,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
      },
      {
        id: 2,
        name: 'Regular Fit Polo',
        cost: 1100,
        amount: 1,
        size: SizeType.M,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
      },
      {
        id: 3,
        name: 'Regular Fit Black',
        cost: 1690,
        amount: 1,
        size: SizeType.L,
        image:
          'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
      },
    ];

    dispatch(fetchCarts(dataCart));
  };

  return { cart, getCart };
};
