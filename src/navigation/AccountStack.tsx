import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import Account from 'screens/Account';
import SubStack from './SubStack';

const AccountStacks = createNativeStackNavigator<MainStackParamList>();

function AccountStack() {
  return (
    <AccountStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <AccountStacks.Screen name="AccountScreen" component={Account} />
      <AccountStacks.Screen name="SubStack" component={SubStack} />
    </AccountStacks.Navigator>
  );
}

export default AccountStack;
