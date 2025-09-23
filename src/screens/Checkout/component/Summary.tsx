import { memo } from 'react';
import { Text, View } from 'react-native';
import CartSummary from 'components/CartSummary';
import PromoCode from './PromoCode';

function Summary({
  VAT,
  shippingFee,
  subTotal,
  code,
  handleAddCode,
  handleChangeCode,
}: {
  VAT: number;
  shippingFee: number;
  subTotal: number;
  code: string;
  handleAddCode: () => void;
  handleChangeCode: (code: string) => void;
}) {
  return (
    <View className="gap-5">
      <View className="border-primary-100 border-t" />
      <View className="gap-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-MontserratSemiBold text-primary-900 text-xl">
            Order Summary
          </Text>
        </View>
        <View className="gap-4">
          <CartSummary
            shippingFee={shippingFee}
            vat={VAT}
            subTotal={subTotal}
          />
          <PromoCode
            onChangeCode={handleChangeCode}
            code={code}
            onPressAdd={handleAddCode}
          />
        </View>
      </View>
    </View>
  );
}

export default memo(Summary);
