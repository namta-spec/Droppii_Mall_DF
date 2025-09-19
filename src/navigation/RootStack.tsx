import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import OnBoarding from 'screens/Onboarding';
import MainStacks from './MainStack';

const RootStack = createNativeStackNavigator<MainStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <RootStack.Screen name="Onboarding" component={OnBoarding} />
      <RootStack.Screen name="MainStack" component={MainStacks} />
    </RootStack.Navigator>
  );
}

export default RootNavigator;
