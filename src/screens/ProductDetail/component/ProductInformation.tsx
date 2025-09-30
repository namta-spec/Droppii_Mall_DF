import { Pressable, Text, View } from 'react-native';
import { productType, ReviewType } from 'constants/type';
import { formatNumber } from 'lib/utils';
import Icons from '../../../../assets/icons/index';

function ProductInformation({
  detailProduct,
  openReview,
}: {
  detailProduct: productType & ReviewType;
  openReview: () => void;
}) {
  return (
    <View className="gap-3">
      <Text className="text-2xl font-MontserratSemiBold text-primary-900">
        {detailProduct?.name}
      </Text>
      <Pressable className="flex-row gap-2 items-center" onPress={openReview}>
        <Icons.Star />
        <View className="flex-row items-center">
          <Text className="text-base font-MontserratMedium underline text-primary-900">
            {formatNumber(detailProduct.rating, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            /5
          </Text>
          <Text className="text-base font-MontserratMedium text-primary-500">
            {' '}
            ({detailProduct.numberOfReview} reviews)
          </Text>
        </View>
      </Pressable>
      <Text className="text-base text-primary-500 font-MontserratRegular">
        {detailProduct?.description}
      </Text>
    </View>
  );
}

export default ProductInformation;
