import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icons from '../../assets/icons/index';
import ButtonCostumized from './Button';
import Sort from './Sort';
import SliderPrice from './SliderPrice';
import SizeSelecter from './SizeSelecter';
import { SizeType, SortType } from 'constants/type';
import { MAX_PRICE, MIN_PRICE } from 'constants/screens';
import { colors } from 'constants/color';

type filterType = {
  sortType: SortType;
  price: number[];
  size: SizeType | null;
};

type FilterProps = {
  dataFilter: filterType;
  setDataFilter: (dataFilter: filterType) => void;
  handleCloseModal: () => void;
};

function Filter({ dataFilter, setDataFilter, handleCloseModal }: FilterProps) {
  const [sortType, setSortType] = useState<SortType>(dataFilter.sortType);
  const [price, setPrice] = useState<number[]>(dataFilter.price);
  const [size, setSize] = useState<SizeType | null>(dataFilter.size);

  function handleSetSort(sortInput: SortType) {
    setSortType(sortInput);
  }

  function handleSetPrice(priceInput: number[]) {
    setPrice(priceInput);
  }

  function handleSetSize(sizeInput: SizeType) {
    setSize(sizeInput);
  }

  function handleTapApply() {
    setDataFilter({
      sortType: sortType,
      price: price,
      size: size,
    });

    handleCloseModal();
  }

  return (
    <View className="flex-1 gap-3.5">
      <View className="flex-row justify-between items-center px-6">
        <Text className="text-xl font-MontserratSemiBold text-primary-900">
          Filters
        </Text>
        <Pressable onPress={handleCloseModal}>
          <Icons.Cancel />
        </Pressable>
      </View>
      <View className="gap-4">
        <Sort sortType={sortType} setSortType={handleSetSort} />
        <SliderPrice
          minValue={MIN_PRICE}
          maxValue={MAX_PRICE}
          price={price}
          setPrice={handleSetPrice}
        />
        <SizeSelecter size={size} setSize={handleSetSize} />
      </View>
      <View className="px-6 pb-4">
        <ButtonCostumized
          onPress={handleTapApply}
          title="Apply Filters"
          style={[styles.buttonStyle]}
          textStyle={[styles.textStyle]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: { backgroundColor: colors.primary['900'], paddingVertical: 16 },
  textStyle: {
    color: colors.primary['0'],
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
  },
});

export default Filter;
