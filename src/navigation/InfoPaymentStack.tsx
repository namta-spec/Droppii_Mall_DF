import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import Address from 'screens/Address/Address';
import NewAddress from 'screens/Address/NewAddress';
import PaymentMethod from 'screens/PaymentMethod/PaymentMethod';
import NewCard from 'screens/PaymentMethod/NewCard';

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
      <InfoPaymentStacks.Screen
        name="PaymentMethod"
        component={PaymentMethod}
      />
      <InfoPaymentStacks.Screen name="NewCard" component={NewCard} />
    </InfoPaymentStacks.Navigator>
  );
}

export default InfoPaymentStack;
