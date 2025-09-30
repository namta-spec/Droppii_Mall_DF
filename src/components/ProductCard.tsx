import Icons from '../../assets/icons/index';
import {
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonCostumized from './Button';
import { colors } from 'constants/color';
import FastImage from './FastImage';
import { cn } from 'lib/utils';
type productProps = {
  id: number;
  name: string;
  cost: number;
  image: string;
  discount?: number;
  saved?: boolean;
  imageStyle?: ImageStyle;
  empty?: boolean;
  onPress: (id: number) => () => void;
  tapSaved: (id: number) => () => void;
};

function ProductCard({
  id,
  name,
  cost,
  image,
  discount,
  saved,
  imageStyle,
  empty,
  onPress,
  tapSaved,
}: productProps) {
  return (
    <View className="flex-1">
      <TouchableOpacity
        className={cn('gap-2', {
          'hidden border-hidden': empty,
        })}
        onPress={onPress(id)}
      >
        <FastImage
          source={image}
          resizeMode="cover"
          style={[styles.fastImageStyle, imageStyle ? imageStyle : {}]}
          imageStyle={styles.imageStyle}
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
            onPress={tapSaved(id)}
            title=""
            iconLeft={saved ? <Icons.HeartFilled /> : <Icons.SavedProduct />}
            style={[styles.buttonStyle]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary['0'],
    padding: 8,
  },
  fastImageStyle: {
    width: '100%',
    height: 176,
  },
  imageStyle: {
    borderRadius: 10,
  },
});

export default ProductCard;
