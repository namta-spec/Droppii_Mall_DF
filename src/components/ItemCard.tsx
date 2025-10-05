import { Text, View } from 'react-native';
import { CardType } from 'constants/type';
import { cn, formatCreditCard, getBrandCardIcon } from 'lib/utils';

function ItemCard({
  item,
  isShowDefault,
}: {
  item: CardType;
  isShowDefault?: boolean;
}) {
  return (
    <View className={cn('flex-row gap-2 items-center')}>
      {getBrandCardIcon(item.card.brand)}
      <Text className="font-MontserratSemiBold text-sm text-primary-900">
        {formatCreditCard(item.card.last_four, true)}
      </Text>
      <View
        className={cn('bg-primary-100 rounded-md py-1 px-2 hidden', {
          'flex flex-row': item.default && isShowDefault,
        })}
      >
        <Text className="font-MontserratMedium text-primary-900 text-xs">
          Default
        </Text>
      </View>
    </View>
  );
}

export default ItemCard;
