import Icons from '../../assets/icons/index';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ButtonCostumized from './Button';
import { cn } from 'lib/utils';
import { colors } from 'constants/color';
type productType = {
  id: number;
  name: string;
  cost: number;
  image: string;
  discount?: number;
  saved?: boolean;
  classNameImage?: string;
  onPress: (id: number) => void;
  tapSaved: (id: number) => void;
};

function ProductCard({
  id,
  name,
  cost,
  image,
  discount,
  saved,
  classNameImage,
  onPress,
  tapSaved,
}: productType) {
  return (
    <TouchableOpacity className="flex-1 gap-2" onPress={() => onPress(id)}>
      <Image
        resizeMode="cover"
        source={{ uri: image }}
        className={cn('w-full h-44 rounded-lg', classNameImage)}
      />
      <Text className="text-base font-MontserratSemiBold">{name}</Text>
      <View className="flex flex-row gap-1">
        <Text className="text-xs font-MontserratMedium text-primary-400">
          ${cost}
        </Text>
        {discount && (
          <Text className="text-xs font-MontserratMedium text-red">
            {discount}%
          </Text>
        )}
      </View>
      <View className="absolute right-3 top-3">
        <ButtonCostumized
          onPress={() => tapSaved(id)}
          title=""
          iconLeft={saved ? <Icons.HeartFilled /> : <Icons.SavedProduct />}
          style={[styles.buttonStyle]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary['0'],
    padding: 8,
  },
});

export default ProductCard;
