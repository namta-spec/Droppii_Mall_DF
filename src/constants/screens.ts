import { Dimensions } from 'react-native';
import { MainStackParamList } from '../../routes';
import {
  categoryMethod,
  FirebaseAuthErrorCode,
  SizeType,
  TypePaymentMethod,
} from './type';

type RouteType = keyof MainStackParamList | undefined;

export const STORAGE_KEY = 'APP_STORE';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const MIN_PRICE = 0;
export const MAX_PRICE = 1000;

export const ROUTES_HIDDEN_TABBAR: RouteType[] = [
  'Checkout',
  'InfoPaymentStack',
  'Address',
  'NewAddress',
  'PaymentMethod',
  'NewCard',
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

export const firebaseAuthErrorMessage: Record<FirebaseAuthErrorCode, string> = {
  'auth/invalid-email': 'The email address is invalid. Please check again.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No user found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
  'auth/email-already-in-use': 'This email is already in use.',
  'auth/weak-password': 'Your password is too weak. Please use a stronger one.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/operation-not-allowed': 'This account type is not allowed to sign in.',
  'auth/missing-password': 'Please enter your password.',
  'auth/network-request-failed':
    'Network error. Check your internet connection.',
  'auth/internal-error': 'An internal error occurred. Please try again.',
};
