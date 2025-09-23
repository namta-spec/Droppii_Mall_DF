import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import { MainStackParamList } from '../../routes';

export const navigationRef =
  createRef<NavigationContainerRef<MainStackParamList>>();
