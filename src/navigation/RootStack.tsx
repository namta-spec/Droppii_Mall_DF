import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import OnBoarding from 'screens/Onboarding';
import MainStack from './MainStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <RootStack.Screen name="Onboarding" component={OnBoarding} />
      <RootStack.Screen name="Main" component={MainStack} />
    </RootStack.Navigator>
  );
}

export default RootNavigator;
