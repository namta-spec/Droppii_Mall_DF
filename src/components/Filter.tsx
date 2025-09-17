import { Pressable, Text, View } from 'react-native';
import Icons from '../../assets/icons/index';
import ButtonCostumized from './Button';
import Sort from './Sort';
import { useState } from 'react';
import SliderPrice from './SliderPrice';
import SizeSelecter from './SizeSelecter';

type FilterProps = {
  handleCloseModal: () => void;
};

type SortType = {
  id: number;
  label: string;
};

type SizeType = {
  value: 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL' | '4XL';
};

function Filter({ handleCloseModal }: FilterProps) {
  const [sortType, setSortType] = useState<SortType>({
    id: 1,
    label: 'Relevance',
  });
  const [price, setPrice] = useState<number[]>([0, 100]);
  const [size, setSize] = useState<SizeType | null>(null);

  function handleTapApply() {
    console.log('Apply: ', sortType, price, size);
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
        <Sort sortType={sortType} setSortType={setSortType} />
        <SliderPrice
          minValue={0}
          maxValue={100}
          price={price}
          setPrice={setPrice}
        />
        <SizeSelecter size={size} setSize={setSize} />
      </View>
      <View className="px-6 pb-4">
        <ButtonCostumized
          onPress={handleTapApply}
          title="Apply Filters"
          classNameButton="bg-primary-900 py-4"
          classNameText="color-primary-0 text-xl font-MontserratMedium"
        />
      </View>
    </View>
  );
}

export default Filter;
