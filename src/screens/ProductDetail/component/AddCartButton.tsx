import { StyleSheet, Text, View } from 'react-native';
import Icons from '../../../../assets/icons/index';
import ButtonCostumized from 'components/Button';
import { colors } from 'constants/color';
import { productType } from 'constants/type';
import { formatNumber } from 'lib/utils';

function AddCartButton({
  detailProduct,
  handleAddCart,
}: {
  detailProduct: productType;
  handleAddCart: () => void;
}) {
  return (
    <View className="gap-6 flex-row justify-between">
      <View>
        <Text className="text-base text-primary-500 font-MontserratRegular">
          Price
        </Text>
        <View className="flex-row gap-2">
          <Text className="text-base text-primary-900 font-MontserratSemiBold">
            $ {formatNumber(detailProduct?.cost)}
          </Text>
          {detailProduct?.discount && (
            <Text className="text-base text-red font-MontserratSemiBold">
              {detailProduct.discount}%
            </Text>
          )}
        </View>
      </View>
      <ButtonCostumized
        iconLeft={<Icons.Bag />}
        title="Add to Cart"
        style={[styles.buttonStyle]}
        textStyle={[styles.textStyle]}
        onPress={handleAddCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary['900'],
    paddingVertical: 16,
    flex: 1,
    gap: 10,
  },
  textStyle: {
    color: colors.primary['0'],
  },
});

export default AddCartButton;
