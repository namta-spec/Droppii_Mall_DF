import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import AccountScreen from 'screens/AccountScreen';
import SubStack from './SubStack';
import InfoPaymentStack from './InfoPaymentStack';
import MyOrderTab from './MyOrderStack';

const AccountStacks = createNativeStackNavigator<MainStackParamList>();

function AccountStack() {
  return (
    <AccountStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <AccountStacks.Screen name="AccountScreen" component={AccountScreen} />
      <AccountStacks.Screen name="SubStack" component={SubStack} />
      <AccountStacks.Screen
        name="InfoPaymentStack"
        component={InfoPaymentStack}
      />
      <AccountStacks.Screen name="MyOrders" component={MyOrderTab} />
    </AccountStacks.Navigator>
  );
}

export default AccountStack;
