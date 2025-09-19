import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import Search from 'screens/Search';
import SubStack from './SubStack';

const SearchStacks = createNativeStackNavigator<MainStackParamList>();

function SearchStack() {
  return (
    <SearchStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <SearchStacks.Screen name="SearchScreen" component={Search} />
      <SearchStacks.Screen name="SubStack" component={SubStack} />
    </SearchStacks.Navigator>
  );
}

export default SearchStack;
