import { useEffect, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { categoryMethod, TypePaymentMethod } from 'constants/type';
import { cn } from 'lib/utils';
import HeaderCostumized from 'components/Header';
import ButtonCostumized from 'components/Button';
import { MainStackParamList } from '../../../routes';
import DeliveryAddress from './component/DeliveryAddress';
import PaymentMethod from './component/PaymentMethod';
import Summary from './component/Summary';
import { colors } from 'constants/color';
import { useAddress } from 'contexts/hooks/useAddress';

type Props = NativeStackScreenProps<MainStackParamList, 'Checkout'>;

function Checkout({ route }: Props) {
  const { address } = useAddress();
  const [visible, setVisible] = useState(true);
  const [VAT, setVAT] = useState<number>(route?.params?.VAT || 0);
  const [shippingFee, setShippingFee] = useState<number>(
    route?.params?.shippingFee || 0,
  );
  const [code, setCode] = useState('');
  const [method, setMethod] = useState<TypePaymentMethod>({
    id: 1,
    title: 'Card',
    category: categoryMethod.Card,
  });

  useEffect(() => {
    if (!address) return;
    // Call API to set VAT and ShippingFee
    setVAT(0);
    setShippingFee(80);
  }, [address]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setVisible(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setTimeout(() => {
        setVisible(true);
      }, 100);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function openAddress() {}

  function handleChangeMethod(inputMethod: TypePaymentMethod) {
    setMethod(inputMethod);
  }

  function handleChangeCode(codeInput: string) {
    setCode(codeInput);
  }

  function handleAddCode() {
    setShippingFee(80);
    setVAT(0);
  }

  function handleOrder() {}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-primary-0">
        <HeaderCostumized
          title="Checkout"
          classNameHead="bg-primary-0"
          classNameText="font-MontserratSemiBold primary-900 text-2xl"
        />
        <ScrollView>
          <View
            className="flex-1 px-6 mt-4 gap-5"
            onStartShouldSetResponder={() => true}
          >
            <DeliveryAddress
              defaultAddress={address}
              openAddress={openAddress}
            />
            <PaymentMethod
              method={method}
              onChangeMethod={handleChangeMethod}
            />
            <Summary
              code={code}
              handleAddCode={handleAddCode}
              handleChangeCode={handleChangeCode}
              subTotal={route?.params?.subTotal}
              VAT={VAT}
              shippingFee={shippingFee}
            />
          </View>
        </ScrollView>

        <View
          className={cn('px-6 py-5', {
            'hidden border-hidden': !visible,
          })}
        >
          <ButtonCostumized
            title="Place Order"
            style={[styles.buttonStyle]}
            textStyle={[styles.textStyle]}
            onPress={handleOrder}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary['900'],
    paddingVertical: 16,
  },
  textStyle: {
    color: colors.primary['0'],
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});

export default Checkout;
