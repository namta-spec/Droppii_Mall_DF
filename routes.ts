import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};
export type NativeStackProps = NativeStackScreenProps<RootStackParamList>;

export type RootBottomParamList = {
  Home: undefined;
  Search: undefined;
  Saved: undefined;
  Cart: undefined;
  Account: { userId: number; userName: string };
};

export type BotomTabProps = BottomTabScreenProps<RootBottomParamList>;
