import { Text, View } from 'react-native';
import { addressType } from 'constants/type';
import Icons from '../../assets/icons/index';
import { cn } from 'lib/utils';

function ItemAddress({
  item,
  isShowDefault,
  classNameAddress,
}: {
  item: addressType | null;
  isShowDefault?: boolean;
  classNameAddress?: string;
}) {
  return (
    <View className={cn('flex-row gap-2', classNameAddress)}>
      <Icons.Location />
      <View className="flex-1 gap-1">
        <View className="flex-row gap-1 items-center">
          <Text className="font-MontserratSemiBold text-sm text-primary-900">
            {item?.title}
          </Text>
          <View
            className={cn('bg-primary-100 rounded-md py-1 px-2 hidden', {
              'flex flex-row': item?.default && isShowDefault,
            })}
          >
            <Text className="font-MontserratMedium text-primary-900 text-xs">
              Default
            </Text>
          </View>
        </View>
        <Text className="font-MontserratRegular text-sm text-primary-500 line-clamp-1">
          {item?.address}
        </Text>
      </View>
    </View>
  );
}

export default ItemAddress;
