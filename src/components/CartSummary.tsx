import { Text, View } from 'react-native';
import { cn, formatNumber } from 'lib/utils';

type CartSummaryProps = {
  subTotal: number;
  vat: number;
  shippingFee: number;
};

function RowSumary({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View className="flex-row justify-between items-center">
      <Text
        className={cn('font-MontserratRegular text-base text-primary-500', {
          'text-primary-900': bold,
        })}
      >
        {label}
      </Text>
      <Text
        className={cn('font-MontserratMedium text-base text-primary-900', {
          'font-MontserratSemiBold': bold,
        })}
      >
        $ {value}
      </Text>
    </View>
  );
}

function CartSummary({ subTotal, vat, shippingFee }: CartSummaryProps) {
  const total = subTotal + vat + shippingFee;

  return (
    <View className="gap-4">
      <RowSumary label="Sub-total" value={formatNumber(subTotal)} />
      <RowSumary
        label="VAT (%)"
        value={formatNumber(vat, { minimumFractionDigits: 2 })}
      />
      <RowSumary label="Shipping fee" value={formatNumber(shippingFee)} />
      <View className="border-primary-100 border-t" />
      <RowSumary label="Total" value={formatNumber(total)} bold />
    </View>
  );
}

export default CartSummary;
