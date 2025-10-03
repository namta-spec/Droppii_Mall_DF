import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Onboarding: undefined;
  AuthStack: undefined;
  SignUp: undefined;
  Login:
    | {
        isSignUp: boolean;
      }
    | undefined;
  ForgotPassword: undefined;
  Verification: {
    email: string;
  };
  ResetPassword: undefined;
  Notification: undefined;
  MainStack: undefined;
  MainTab: undefined;
  SubStack: {
    screen: keyof MainStackParamList;
    params?: any;
  };
  HomeScreen: undefined;
  SearchScreen: undefined;
  SavedScreen: undefined;
  CartScreen: undefined;
  AccountScreen: undefined;
  ProductStack: {
    screen: keyof MainStackParamList;
    params: { idProduct: number };
  };
  ProductDetail: { idProduct: number };
  Review: { idProduct: number };
  Checkout: {
    subTotal: number;
    VAT: number;
    shippingFee: number;
  };
  InfoPaymentStack: {
    screen: keyof MainStackParamList;
    params?: any;
  };
  Address: undefined;
  NewAddress: undefined;
};

export type NativeStackProps = NativeStackScreenProps<MainStackParamList>;

export type RootBottomParamList = {
  Home: undefined;
  Search: undefined;
  Saved: undefined;
  Cart: undefined;
  Account: undefined;
};
