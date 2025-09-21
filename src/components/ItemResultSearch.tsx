import { Image, Text, TouchableOpacity, View } from 'react-native';
import { cn } from 'lib/utils';
import Icons from '../../assets/icons/index';
type productType = {
  id: number;
  name: string;
  cost: number;
  image: string;
  discount?: number;
  classNameImage?: string;
  handleTapResult: (id: number) => void;
  index: number;
};

function ItemResultSearch({
  id,
  name,
  cost,
  image,
  discount,
  classNameImage,
  handleTapResult,
  index,
}: productType) {
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
          <Image
            resizeMode="cover"
            source={{ uri: image }}
            className={cn('w-14 h-13 rounded-lg border', classNameImage)}
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

export default ItemResultSearch;
