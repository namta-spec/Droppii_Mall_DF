import { Dimensions } from 'react-native';
import { MainStackParamList } from '../../routes';
import { categoryMethod, SizeType, TypePaymentMethod } from './type';

type RouteType = keyof MainStackParamList | undefined;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const MIN_PRICE = 0;
export const MAX_PRICE = 10000;

export const ROUTES_HIDDEN_TABBAR: RouteType[] = [
  'Checkout',
  'InfoPaymentStack',
  'Address',
  'NewAddress',
  'ProductStack',
  'ProductDetail',
  'Review',
];

export const DATA_PAYMENT_METHOD: TypePaymentMethod[] = [
  { id: 1, title: 'Card', category: categoryMethod.Card },
  { id: 2, title: 'Cash', category: categoryMethod.Cash },
  { id: 3, title: '', category: categoryMethod.ApplePay },
];

export const DATA_SIZE: SizeType[] = [
  SizeType.S,
  SizeType.M,
  SizeType.L,
  SizeType.XL,
  SizeType.XXL,
  SizeType.XXXL,
  SizeType.XXXXL,
];
