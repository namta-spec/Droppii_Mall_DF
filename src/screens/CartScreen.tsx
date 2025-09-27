import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View } from 'react-native';
import { addressType, cartProductType } from 'constants/type';
import { cn, getDefaultAddress } from 'lib/utils';
import HeaderCostumized from 'components/Header';
import DataEmpty from 'components/DataEmpty';
import ButtonCostumized from 'components/Button';
import ItemCart from 'components/ItemCart';
import Icons from '../../assets/icons/index';
import CartSummary from 'components/CartSummary';
import { NativeStackProps } from '../../routes';
import { colors } from 'constants/color';
import { useAddress } from 'contexts/hooks/useAddress';
import { useCart } from 'contexts/hooks/useCart';

function CartScreen({ navigation }: NativeStackProps) {
  const { cart, getCart } = useCart();
  const { address, listAddress } = useAddress();
  const [VAT, setVAT] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    const selectedAddress =
      address ||
      (listAddress.length > 0 ? getDefaultAddress(listAddress) : null);
    if (selectedAddress) {
      getShippingFee(selectedAddress);
    } else {
      navigation.navigate('InfoPaymentStack', { screen: 'Address' });
    }
  }, [address, listAddress, navigation]);

  function getShippingFee(addressInput: addressType | null) {
    if (!addressInput) return;
    // Call API to set VAT and ShippingFee by addressInput
    setVAT(0);
    setShippingFee(80);
  }

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
    if (cart.length > 0) {
      return (
        <CartSummary
          subTotal={getSubTotal(cart)}
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
      subTotal: getSubTotal(cart),
    });
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary-0">
      <HeaderCostumized title="My Cart" viewLeft={<></>} />
      <View
        className={cn('flex-1 px-6 mt-4', {
          'flex-row justify-center items-center': cart.length === 0,
        })}
      >
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={cart}
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
        {cart.length > 0 && (
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
export default CartScreen;
