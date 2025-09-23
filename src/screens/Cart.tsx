import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View } from 'react-native';
import { cartProductType, SizeType } from 'constants/type';
import { cn } from 'lib/utils';
import HeaderCostumized from 'components/Header';
import DataEmpty from 'components/DataEmpty';
import ButtonCostumized from 'components/Button';
import ItemCart from 'components/ItemCart';
import Icons from '../../assets/icons/index';
import CartSummary from 'components/CartSummary';
import { NativeStackProps } from '../../routes';
import { colors } from 'constants/color';

const dataCart: cartProductType[] = [
  {
    id: 1,
    name: 'Regular Fit Slogan',
    cost: 1190,
    amount: 2,
    size: SizeType.L,
    image:
      'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
  },

  {
    id: 2,
    name: 'Regular Fit Polo',
    cost: 1100,
    amount: 1,
    size: SizeType.M,
    image:
      'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
  },
  {
    id: 3,
    name: 'Regular Fit Black',
    cost: 1690,
    amount: 1,
    size: SizeType.L,
    image:
      'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
  },
];

function Cart({ navigation }: NativeStackProps) {
  const VAT = 0;
  const shippingFee = 80;

  function getSubTotal(dataCartInput: cartProductType[]): number {
    if (dataCartInput && dataCartInput.length > 0) {
      return dataCartInput.reduce(
        (subtotal, item) => subtotal + item.cost * item.amount,
        0,
      );
    }
    return 0;
  }

  function handleChangeAmount(
    itemCart: cartProductType,
    typeChange: 'plus' | 'minus',
  ) {
    console.log(itemCart.id, typeChange);
  }

  function handleDeleteItem(itemCart: cartProductType) {
    console.log('Delete:', itemCart.id);
  }

  function renderFooter() {
    if (dataCart.length > 0) {
      return (
        <CartSummary
          subTotal={getSubTotal(dataCart)}
          vat={VAT}
          shippingFee={shippingFee}
        />
      );
    }
    return null;
  }

  function renderItemCart({ item }: { item: cartProductType }) {
    return (
      <ItemCart
        item={item}
        handleDeleteItem={handleDeleteItem}
        handleChangeAmount={handleChangeAmount}
      />
    );
  }

  function openCheckout() {
    navigation.navigate('Checkout', {
      VAT: VAT,
      shippingFee: shippingFee,
      subTotal: getSubTotal(dataCart),
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized
        title="My Cart"
        classNameHead="bg-primary-0"
        classNameText="font-MontserratSemiBold primary-900 text-2xl"
      />
      <View
        className={cn('flex-1 px-6 mt-4', {
          'flex-row justify-center items-center': dataCart.length === 0,
        })}
      >
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={dataCart}
          showsVerticalScrollIndicator={false}
          renderItem={renderItemCart}
          ListEmptyComponent={
            <DataEmpty
              icon={<Icons.CartDuotone />}
              title="Your Cart Is Empty!"
              describe="When you add products, they’ll appear here."
            />
          }
          ListFooterComponent={renderFooter}
        />
        {dataCart.length > 0 && (
          <View className="py-5">
            <ButtonCostumized
              title="Go to checkout"
              style={[styles.buttonStyle]}
              textStyle={[styles.textStyle]}
              iconRight={<Icons.ArrowRight />}
              onPress={openCheckout}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 14,
  },
  buttonStyle: {
    gap: 12,
    backgroundColor: colors.primary['900'],
    padding: 16,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: colors.primary['0'],
  },
});
export default Cart;
