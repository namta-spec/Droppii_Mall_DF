import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import SearchScreen from 'screens/SearchScreen';
import SubStack from './SubStack';
import ProductStack from './ProductStack';

const SearchStacks = createNativeStackNavigator<MainStackParamList>();

function SearchStack() {
  return (
    <SearchStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <SearchStacks.Screen name="SearchScreen" component={SearchScreen} />
      <SearchStacks.Screen name="ProductStack" component={ProductStack} />
      <SearchStacks.Screen name="SubStack" component={SubStack} />
    </SearchStacks.Navigator>
  );
}

export default SearchStack;
