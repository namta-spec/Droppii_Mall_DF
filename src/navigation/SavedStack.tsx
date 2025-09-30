import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import SavedScreen from 'screens/SavedScreen';
import SubStack from './SubStack';
import ProductStack from './ProductStack';

const SavedStacks = createNativeStackNavigator<MainStackParamList>();

function SavedStack() {
  return (
    <SavedStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <SavedStacks.Screen name="SavedScreen" component={SavedScreen} />
      <SavedStacks.Screen name="ProductStack" component={ProductStack} />
      <SavedStacks.Screen name="SubStack" component={SubStack} />
    </SavedStacks.Navigator>
  );
}

export default SavedStack;
