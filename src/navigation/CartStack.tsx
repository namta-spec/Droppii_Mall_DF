import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import Cart from 'screens/Cart';
import Checkout from 'screens/Checkout/Checkout';
import SubStack from './SubStack';
import InfoPaymentStack from './InfoPaymentStack';

const CartStacks = createNativeStackNavigator<MainStackParamList>();

function CartStack() {
  return (
    <CartStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <CartStacks.Screen name="CartScreen" component={Cart} />
      <CartStacks.Screen name="Checkout" component={Checkout} />
      <CartStacks.Screen name="InfoPaymentStack" component={InfoPaymentStack} />
      <CartStacks.Screen name="SubStack" component={SubStack} />
    </CartStacks.Navigator>
  );
}

export default CartStack;
