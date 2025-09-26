import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import Address from 'screens/Address/Address';
import NewAddress from 'screens/Address/NewAddress';

const InfoPaymentStacks = createNativeStackNavigator<MainStackParamList>();

function InfoPaymentStack() {
  return (
    <InfoPaymentStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <InfoPaymentStacks.Screen name="Address" component={Address} />
      <InfoPaymentStacks.Screen name="NewAddress" component={NewAddress} />
    </InfoPaymentStacks.Navigator>
  );
}

export default InfoPaymentStack;
