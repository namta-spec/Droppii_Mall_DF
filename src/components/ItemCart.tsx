import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cartProductType } from 'constants/type';
import ButtonCostumized from 'components/Button';
import Icons from '../../assets/icons/index';
import FastImage from './FastImage';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { colors } from 'constants/color';
import ModalCustom from './Modal';

type ItemCartType = {
  item: cartProductType;
  handleDeleteItem: (itemCart: cartProductType) => void;
  handleChangeAmount: (itemCart: cartProductType, amountChange: number) => void;
};

enum TypeChange {
  minus = 'minus',
  plus = 'plus',
}

function ItemCart({
  item,
  handleChangeAmount,
  handleDeleteItem,
}: ItemCartType) {
  const [modalVisible, setModalVisible] = useState(false);
  const [countNumber, setCountNumber] = useState(0);

  const onPressDelete = () => {
    handleDeleteItem(item);
  };

  const debouncedSetAmountChange = useMemo(
    () =>
      debounce(value => {
        setCountNumber(0);
        handleChangeAmount(item, value);
      }, 500),
    [],
  );

  // const onChangeAmount = (typeChange: TypeChange) => () => {
  //   console.log('User Tap: ', countNumber);
  //   let number = countNumber;
  //   switch (typeChange) {
  //     case TypeChange.minus:
  //       number--;
  //       break;
  //     case TypeChange.plus:
  //       number++;
  //       break;
  //     default:
  //       break;
  //   }
  //   if (number + item.amount <= 0 && typeChange === TypeChange.minus) {
  //     setModalVisible(true);
  //     return;
  //   }
  //   setCountNumber(number);
  //   debouncedSetAmountChange(number);
  // };
  // Sitution: Distance at the n and (n+1) taps is 501ms
  // cause 501ms > 500ms => Call API and setNumberCount to 0
  // The time rest: 1ms, numberCount not updated to 0 yet
  // But onChangeAmount be called again
  // So in this line: let number = countNumber; => number = n not 0
  // LINE TIME:
  // t = 0     n = 1 (count first need : 0) => count++ = 1
  // t = 500   => call API with count = 1, reset count = 0
  // t = 501   n = 2 (count first need : 0) but count first = 1

  const onChangeAmount = (typeChange: TypeChange) => () => {
    setCountNumber(prev => {
      let number = prev;
      switch (typeChange) {
        case TypeChange.minus:
          number--;
          break;
        case TypeChange.plus:
          number++;
          break;
      }

      if (number + item.amount <= 0 && typeChange === TypeChange.minus) {
        setModalVisible(true);
        return prev;
      }

      // Gọi debounce ngay bên trong functional update
      debouncedSetAmountChange(number);
      return number;
    });
  };

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <View className="flex-row justify-between items-center border border-primary-100 rounded-xl p-4 gap-4">
      <FastImage
        source={item.image}
        resizeMode="cover"
        style={[styles.fastImageStyle]}
        imageStyle={styles.imageStyle}
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
              onPress={onChangeAmount(TypeChange.minus)}
            />
            <Text className="font-MontserratMedium text-xs text-primary-900">
              {item.amount + countNumber}
            </Text>
            <ButtonCostumized
              title=""
              iconLeft={<Icons.Plus />}
              onPress={onChangeAmount(TypeChange.plus)}
            />
          </View>
        </View>
      </View>
      <ModalCustom
        closeModal={closeModal}
        modalVisible={modalVisible}
        styleButton={styles.styleButton}
        styleText={styles.styleTextButton}
        type="waring"
        title="Delete?"
        text="Are you sure to delete this item?"
        titleDeleteButton="Yes, Delete"
        titleButton="No, Cancle"
        onPressDeleteButton={onPressDelete}
        onPressButton={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fastImageStyle: {
    height: 80,
    width: 80,
  },
  imageStyle: {
    borderRadius: 6,
  },
  styleButton: {
    backgroundColor: colors.primary['0'],
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary['200'],
  },
  styleTextButton: {
    color: colors.primary['900'],
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});

export default ItemCart;
