import { isEmpty } from 'lodash';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReactElement } from 'react';
import { ToastType } from 'toastify-react-native/utils/interfaces';
import { Toast } from 'toastify-react-native';
import type { FirebaseError } from 'firebase/app';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(isToday);
dayjs.extend(isYesterday);
import Icons from '../../assets/icons/index';
import {
  addressType,
  AsyncStorageType,
  CardBrand,
  categoryMethod,
  FirebaseAuthErrorCode,
  InputStatus,
  typeCategory,
} from 'constants/type';
import { colors } from 'constants/color';
import { firebaseAuthErrorMessage, STORAGE_KEY } from 'constants/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDataStore = async (value: AsyncStorageType) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {}
};

export const getDataStore = async (): Promise<AsyncStorageType | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
  return null;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIcon(category: typeCategory): ReactElement {
  switch (category) {
    case 'Discount':
      return <Icons.DiscountDuotone />;
    case 'Credit':
      return <Icons.CardDuotone />;
    case 'E-Wallet':
      return <Icons.WalletDuotone />;
    case 'Location':
      return <Icons.LocationDuotone />;
    case 'Account':
      return <Icons.UserDuotone />;
    default:
      return <Icons.BellDuotoneMini />;
  }
}

export function getTitleDate(inputDate: number): string {
  if (dayjs(inputDate).isToday()) return 'Today';

  if (dayjs(inputDate).isYesterday()) return 'Yesterday';

  return dayjs(inputDate).format('MMMM D, YYYY');
}

export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  if (typeof value === 'number') {
    return value.toLocaleString('en-US', options);
  }
  return '';
}

export function getPaymentIcon(
  inputCategory: categoryMethod,
  isActive: boolean,
): ReactElement {
  const iconColor = isActive ? colors.primary['0'] : colors.primary['900'];
  switch (inputCategory) {
    case categoryMethod.Card:
      return <Icons.Card color={iconColor} />;
    case categoryMethod.Cash:
      return <Icons.Cash color={iconColor} />;
    case categoryMethod.ApplePay:
      return <Icons.ApplePay color={iconColor} />;
    default:
      return <Icons.Card color={iconColor} />;
  }
}

export function getBrandCardIcon(inputBrand: CardBrand | null): ReactElement {
  switch (inputBrand) {
    case 'visa':
      return <Icons.Visa />;
    case 'mastercard':
      return <Icons.MasterCard />;
    case 'amex':
      return <Icons.Card />;
    case 'diners':
      return <Icons.Card />;
    case 'discover':
      return <Icons.Card />;
    case 'jcb':
      return <Icons.Card />;
    case 'unionpay':
      return <Icons.Card />;
    default:
      return <Icons.Card />;
  }
}

export function getDefaultAddress(data: addressType[]): addressType | null {
  if (data && data.length > 0) {
    return data.find(item => item.default) || data[0];
  }
  return null;
}

export function formatCreditCard(creditcard: number, hash: boolean) {
  if (creditcard) {
    const str = String(creditcard).replace(' ', '').replace('-', '');
    const format = str.replace(/(\d{4})/g, '$1 ').trim();
    const last = str.slice(-4);
    return hash ? '**** **** **** ' + last : format;
  }
  return null;
}

type WithEmpty<T> = T & {
  id: number;
  empty?: boolean;
};

export function formatDataFlatList<T>(
  data: T[] = [],
  numColumns: number,
): WithEmpty<T>[] {
  if (!Array.isArray(data) || isEmpty(data) || numColumns <= 0) {
    return [];
  }

  const amountfullRows = Math.floor(data.length / numColumns);
  let amountItemLastRow = data.length - amountfullRows * numColumns;

  const newData = [...data] as WithEmpty<T>[];

  while (amountItemLastRow !== 0 && amountItemLastRow !== numColumns) {
    newData.push({
      id: amountItemLastRow,
      empty: true,
    } as WithEmpty<T>);
    amountItemLastRow++;
  }

  return newData;
}

export function showToast({
  title,
  text,
  type,
}: {
  title?: string;
  text: string;
  type: ToastType;
}) {
  return Toast.show({
    type: type,
    text1: title,
    text2: text,
    icon: <Icons.Bell />,
    closeIcon: <Icons.Cancel />,
    backgroundColor: colors.primary['100'],
  });
}

export function formatTimeAgo(date: Date): string {
  if (!date) return '';
  const now = dayjs();
  const input = dayjs(date);

  const units: { unit: dayjs.ManipulateType; limit: number; label: string }[] =
    [
      { unit: 'minute', limit: 60, label: 'minute' },
      { unit: 'hour', limit: 24, label: 'hour' },
      { unit: 'day', limit: 7, label: 'day' },
      { unit: 'week', limit: 5, label: 'week' },
      { unit: 'month', limit: 12, label: 'month' },
      { unit: 'year', limit: Infinity, label: 'year' },
    ];

  for (const { unit, limit, label } of units) {
    let diff = now.diff(input, unit);
    if (diff < limit) {
      if (unit === 'minute' && diff < 1) return 'Just now';
      if (unit === 'day' && diff === 1) return 'Yesterday';
      return `${diff} ${label}${diff > 1 ? 's' : ''} ago`;
    }
  }

  return 'a long time ago';
}

export function ValidateFullName(fullName: string): InputStatus {
  if (isEmpty(fullName)) return InputStatus.deafult;
  if (!isEmpty(fullName.trim())) return InputStatus.success;
  return InputStatus.error;
}

export function ValidateEmail(email: string): InputStatus {
  if (isEmpty(email)) return InputStatus.deafult;
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regex.test(email.trim())) {
    return InputStatus.success;
  }
  return InputStatus.error;
}

export function ValidatePassword(password: string): InputStatus {
  if (isEmpty(password)) return InputStatus.deafult;
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (regex.test(password)) {
    return InputStatus.success;
  }
  return InputStatus.error;
}

export function getFirebaseAuthErrorMessage(error: FirebaseError): string {
  const code = error.code as FirebaseAuthErrorCode;
  return firebaseAuthErrorMessage[code] ?? 'An unknown error occurred.';
}
