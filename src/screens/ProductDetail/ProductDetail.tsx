import { useState } from 'react';
import { isEmpty } from 'lodash';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCostumized from 'components/Header';
import { MainStackParamList } from '../../../routes';
import { useDetailProduct } from 'contexts/hooks/useDetailProduct';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from 'constants/color';
import ButtonCostumized from 'components/Button';
import Icons from '../../../assets/icons';
import { cartProductType, SizeType } from 'constants/type';
import AddCartButton from './component/AddCartButton';
import ProductInformation from './component/ProductInformation';
import SizeSelector from './component/SizeSelecter';
import FastImage from 'components/FastImage';
import { useCart } from 'contexts/hooks/useCart';
import { showToast } from 'lib/utils';

type Props = NativeStackScreenProps<MainStackParamList, 'ProductDetail'>;

function ProductDetail({ route, navigation }: Props) {
  const { detailProduct } = useDetailProduct(route.params?.idProduct || null);
  const { updateCart } = useCart();
  const [size, setSize] = useState<SizeType | null>(null);

  function handleSaveProduct() {
    console.log('Save: ', detailProduct?.id);
  }

  function openReview() {
    if (route.params?.idProduct) {
      navigation.navigate('Review', { idProduct: route.params?.idProduct });
    }
  }

  async function handleAddCart() {
    if (isEmpty(detailProduct)) return;
    if (!size) {
      return showToast({ type: 'warn', text: 'Please choose size!' });
    }
    const { id, cost, image, categoryId, name, discount, saved } =
      detailProduct;
    const infoProduct: cartProductType = {
      id,
      cost,
      image,
      categoryId,
      name,
      discount,
      saved,
      size,
      amount: 1,
    };
    const resultUpdate = await updateCart(infoProduct);
    if (resultUpdate) {
      setSize(null);
      return showToast({ type: 'success', text: 'Add success!' });
    }
  }

  const handleChangeSize = (item: SizeType) => () => {
    setSize(item);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized title="Details" />
      {!isEmpty(detailProduct) && (
        <View className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <View className="gap-3 mb-4">
              <View className="px-6">
                <View>
                  <FastImage
                    resizeMode="cover"
                    source={detailProduct?.image}
                    style={[styles.fastImageStyle]}
                    imageStyle={styles.imageStyle}
                  />
                  <ButtonCostumized
                    onPress={handleSaveProduct}
                    title=""
                    iconLeft={
                      detailProduct?.saved ? (
                        <Icons.HeartFilled width={25} height={25} />
                      ) : (
                        <Icons.SavedProduct width={25} height={25} />
                      )
                    }
                    style={[styles.buttonSaveStyle]}
                  />
                </View>
              </View>
              <View className="px-6">
                <ProductInformation
                  detailProduct={detailProduct}
                  openReview={openReview}
                />
              </View>
              <View className="pl-6">
                <SizeSelector handleChangeSize={handleChangeSize} size={size} />
              </View>
            </View>
          </ScrollView>
          <View className="px-6 pt-5 border-t border-primary-100 bg-primary-0">
            <AddCartButton
              detailProduct={detailProduct}
              handleAddCart={handleAddCart}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fastImageStyle: {
    height: 370,
  },
  imageStyle: {
    borderRadius: 10,
  },
  buttonSaveStyle: {
    backgroundColor: colors.primary['0'],
    padding: 12,
    position: 'absolute',
    top: 16,
    right: 16,
    elevation: 10,
    shadowColor: colors.primary['900'],
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default ProductDetail;
