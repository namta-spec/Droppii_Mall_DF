import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import MainTab from './MainTabs';

const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainStacks() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <MainStack.Screen name="MainTab" component={MainTab} />
    </MainStack.Navigator>
  );
}

export default MainStacks;
