import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import HomePage from 'screens/HomePage';
import SubStack from './SubStack';

const HomeStacks = createNativeStackNavigator<MainStackParamList>();

function HomeStack() {
  return (
    <HomeStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <HomeStacks.Screen name="HomeScreen" component={HomePage} />
      <HomeStacks.Screen name="SubStack" component={SubStack} />
    </HomeStacks.Navigator>
  );
}

export default HomeStack;
