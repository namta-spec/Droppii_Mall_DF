import { Image, Pressable, Text, View } from 'react-native';
import { cartProductType } from 'constants/type';
import ButtonCostumized from 'components/Button';
import Icons from '../../assets/icons/index';

type ItemCartType = {
  item: cartProductType;
  handleDeleteItem: (itemCart: cartProductType) => void;
  handleChangeAmount: (
    itemCart: cartProductType,
    typeChange: 'plus' | 'minus',
  ) => void;
};

function ItemCart({
  item,
  handleChangeAmount,
  handleDeleteItem,
}: ItemCartType) {
  const onPressDelete = () => {
    handleDeleteItem(item);
  };

  const onChangeAmount = (value: 'minus' | 'plus') => () => {
    handleChangeAmount(item, value);
  };

  return (
    <View className="flex-row justify-between items-center border border-primary-100 rounded-xl p-4 gap-4">
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="w-20 h-20 rounded-md"
      />
      <View className="flex-1 h-20 justify-between">
        <View className="flex-row justify-between">
          <View className="">
            <Text className="font-MontserratSemiBold text-sm text-primary-900">
              {item.name}
            </Text>
            <Text className="font-MontserratRegular text-xs text-primary-500">
              Size {item.size}
            </Text>
          </View>
          <Pressable onPress={onPressDelete}>
            <Icons.Trash />
          </Pressable>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="font-MontserratSemiBold text-sm text-primary-900">
            ${item.cost}
          </Text>
          <View className="items-center gap-2 flex-row">
            <ButtonCostumized
              title=""
              iconLeft={<Icons.Minus />}
              onPress={onChangeAmount('minus')}
            />
            <Text className="font-MontserratMedium text-xs text-primary-900">
              {item.amount}
            </Text>
            <ButtonCostumized
              title=""
              iconLeft={<Icons.Plus />}
              onPress={onChangeAmount('plus')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default ItemCart;
