import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import Saved from 'screens/Saved';
import SubStack from './SubStack';

const SavedStacks = createNativeStackNavigator<MainStackParamList>();

function SavedStack() {
  return (
    <SavedStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <SavedStacks.Screen name="SavedScreen" component={Saved} />
      <SavedStacks.Screen name="SubStack" component={SubStack} />
    </SavedStacks.Navigator>
  );
}

export default SavedStack;
