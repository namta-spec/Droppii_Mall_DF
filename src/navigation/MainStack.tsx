import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import MainTabs from './MainTabs';
import Notification from 'screens/Notification';

const RootStack = createNativeStackNavigator<MainStackParamList>();

function MainStack() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
      initialRouteName="MainTabs"
    >
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen name="Notification" component={Notification} />
    </RootStack.Navigator>
  );
}

export default MainStack;
