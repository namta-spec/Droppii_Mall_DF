import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import HomeScreen from 'screens/HomeScreen';
import SubStack from './SubStack';
import ProductStack from './ProductStack';

const HomeStacks = createNativeStackNavigator<MainStackParamList>();

function HomeStack() {
  return (
    <HomeStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <HomeStacks.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStacks.Screen name="ProductStack" component={ProductStack} />
      <HomeStacks.Screen name="SubStack" component={SubStack} />
    </HomeStacks.Navigator>
  );
}

export default HomeStack;
