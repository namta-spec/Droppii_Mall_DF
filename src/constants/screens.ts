import { Dimensions } from 'react-native';
import { MainStackParamList } from '../../routes';
import { categoryMethod, TypePaymentMethod } from './type';

type RouteType = keyof MainStackParamList | undefined;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const MIN_PRICE = 0;
export const MAX_PRICE = 1000;

export const ROUTES_HIDDEN_TABBAR: RouteType[] = ['Checkout'];

export const DATA_PAYMENT_METHOD: TypePaymentMethod[] = [
  { id: 1, title: 'Card', category: categoryMethod.Card },
  { id: 2, title: 'Cash', category: categoryMethod.Cash },
  { id: 3, title: '', category: categoryMethod.ApplePay },
];
