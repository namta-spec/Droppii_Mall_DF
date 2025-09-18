import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReactElement } from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(isToday);
dayjs.extend(isYesterday);
import Icons from '../../assets/icons/index';

type NotificationType = {
  id: number;
  title: string;
  subTitle: string;
  date: number;
  line: 'long' | 'short';
  category: 'Discount' | 'E-Wallet' | 'Location' | 'Credit' | 'Account';
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIcon(category: NotificationType['category']): ReactElement {
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
