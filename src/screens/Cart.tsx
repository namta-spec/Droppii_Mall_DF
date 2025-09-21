import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { cartProductType, SizeType } from 'constants/type';
import { cn, formatNumber } from 'lib/utils';
import { SHIPPING_FEE, VAT } from 'constants/screens';
import HeaderCostumized from 'components/Header';
import DataEmpty from 'components/DataEmpty';
import ButtonCostumized from 'components/Button';
import ItemCart from 'components/ItemCart';
import Icons from '../../assets/icons/index';

type CartSummaryProps = {
  subTotal: number;
  vat: number;
  shippingFee: number;
};

const RowSumary = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <View className="flex-row justify-between items-center">
    <Text
      className={cn('font-MontserratRegular text-base text-primary-500', {
        'text-primary-900': bold,
      })}
    >
      {label}
    </Text>
    <Text
      className={cn('font-MontserratMedium text-base text-primary-900', {
        'font-MontserratSemiBold': bold,
      })}
    >
      $ {value}
    </Text>
  </View>
);

function CartSummary({ subTotal, vat, shippingFee }: CartSummaryProps) {
  const total = subTotal + vat + shippingFee;

  return (
    <View className="gap-4">
      <RowSumary label="Sub-total" value={formatNumber(subTotal)} />
      <RowSumary
        label="VAT (%)"
        value={formatNumber(vat, { minimumFractionDigits: 2 })}
      />
      <RowSumary label="Shipping fee" value={formatNumber(shippingFee)} />
      <View className="border-primary-100 border-t" />
      <RowSumary label="Total" value={formatNumber(total)} bold />
    </View>
  );
}

function Cart() {
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

  function getSubTotal(dataCartInput: cartProductType[]): number {
    return dataCartInput.reduce(
      (subtotal, item) => subtotal + item.cost * item.amount,
      0,
    );
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
          shippingFee={SHIPPING_FEE}
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
              classNameButton="gap-3 bg-primary-900 p-4"
              classNameText="text-primary-0 font-MontserratMedium text-base"
              iconRight={<Icons.ArrowRight />}
              onPress={() => console.log('Check out')}
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
});
export default Cart;
