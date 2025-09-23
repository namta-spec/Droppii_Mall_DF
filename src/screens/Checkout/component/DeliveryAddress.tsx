import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import ItemAddress from 'components/ItemAddress';
import { addressType } from 'constants/type';

function DeliveryAddress({
  defaultAddress,
  openAddress,
}: {
  defaultAddress: addressType | null;
  openAddress: () => void;
}) {
  return (
    <View className="gap-5">
      <View className="border-primary-100 border-t" />
      <View className="gap-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-MontserratSemiBold text-primary-900 text-xl">
            Delivery Address
          </Text>
          <Pressable onPress={openAddress}>
            <Text className="font-MontserratMedium text-primary-900 text-sm underline">
              Change
            </Text>
          </Pressable>
        </View>
        <ItemAddress item={defaultAddress} />
      </View>
    </View>
  );
}

export default memo(DeliveryAddress);
