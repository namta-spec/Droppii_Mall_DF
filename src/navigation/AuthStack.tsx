import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import Login from 'screens/Auth/Login';
import SignUp from 'screens/Auth/Signup';
import ForgotPassword from 'screens/Auth/ForgotPassword';
import Verification from 'screens/Auth/Verification';

const AuthStack = createNativeStackNavigator<MainStackParamList>();

function AuthStacks() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="Verification" component={Verification} />
    </AuthStack.Navigator>
  );
}

export default AuthStacks;
