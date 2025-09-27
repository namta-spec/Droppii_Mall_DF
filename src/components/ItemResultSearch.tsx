import {
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icons from '../../assets/icons/index';
import FastImage from './FastImage';
type productProps = {
  id: number;
  name: string;
  cost: number;
  image: string;
  discount?: number;
  imageStyle?: ImageStyle;
  handleTapResult: (id: number) => void;
  index: number;
};

function ItemResultSearch({
  id,
  name,
  cost,
  image,
  discount,
  imageStyle,
  handleTapResult,
  index,
}: productProps) {
  const onPressResult = () => {
    handleTapResult(id);
  };

  return (
    <View className="gap-5">
      {index !== 0 && <View className={'border-primary-100 border-t'} />}
      <TouchableOpacity
        className="flex-row justify-between items-center"
        onPress={onPressResult}
      >
        <View className="flex-row gap-3 items-center">
          <FastImage
            source={image}
            resizeMode="cover"
            style={[styles.fastImageStyle, imageStyle ? imageStyle : {}]}
            imageStyle={styles.imageStyle}
          />
          <View className="gap-1">
            <Text className="text-base font-MontserratSemiBold text-primary-900">
              {name}
            </Text>
            <View className="flex flex-row gap-1">
              <Text className="text-xs font-MontserratMedium text-primary-500">
                ${cost}
              </Text>
              {discount && (
                <Text className="text-xs font-MontserratMedium text-red">
                  {discount}%
                </Text>
              )}
            </View>
          </View>
        </View>
        <Icons.Arrow />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fastImageStyle: {
    height: 52,
    width: 56,
  },
  imageStyle: {
    borderRadius: 6,
  },
});

export default ItemResultSearch;
