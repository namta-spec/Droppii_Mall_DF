import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import Notification from 'screens/Notification';

const SubStacks = createNativeStackNavigator<MainStackParamList>();

function SubStack() {
  return (
    <SubStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <SubStacks.Screen name="Notification" component={Notification} />
    </SubStacks.Navigator>
  );
}

export default SubStack;
