import { memo } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from 'constants/color';

type SliderPriceType = {
  minValue: number;
  maxValue: number;
  price: number[];
  setPrice: (value: number[]) => void;
};

function SliderPrice({ minValue, maxValue, price, setPrice }: SliderPriceType) {
  return (
    <View className="flex-1 gap-4 px-6">
      <View className={'border-t border-primary-100'} />
      <View className="flex-row justify-between">
        <Text className="font-MontserratSemiBold text-primary-900 text-base">
          Price
        </Text>
        <Text className="font-MontserratRegular text-primary-500 text-base">
          ${price[0]} - ${price[1]}
        </Text>
      </View>
      <View className="items-center">
        <Slider
          containerStyle={styles.sliderStyle}
          minimumValue={minValue}
          maximumValue={maxValue}
          minimumTrackTintColor="#000000"
          thumbStyle={styles.thumbStyle}
          step={1}
          value={price}
          onValueChange={setPrice}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderStyle: { width: '100%' },
  thumbStyle: {
    borderWidth: 1,
    borderColor: colors.primary['200'],
    backgroundColor: colors.primary['0'],
  },
});

export default memo(SliderPrice);
