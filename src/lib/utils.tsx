import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReactElement } from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(isToday);
dayjs.extend(isYesterday);
import Icons from '../../assets/icons/index';
import { addressType, categoryMethod, typeCategory } from 'constants/type';
import { colors } from 'constants/color';

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
