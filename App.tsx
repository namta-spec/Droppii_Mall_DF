/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import AppProvider from './src/context/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import { RootBottomParamList, RootStackParamList } from './routes';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBar from 'components/TabBar';
import OnBoarding from '@screens/Onboarding';
import HomePage from '@screens/HomePage';
import Account from '@screens/Account';
import Search from '@screens/Search';
import Saved from '@screens/Saved';
import Cart from '@screens/Cart';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootBottomParamList>();

function CustomTabBar(props: BottomTabBarProps) {
  return <TabBar {...props} />;
}

function RootTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
      tabBar={CustomTabBar}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Saved" component={Saved} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <Stack.Screen name="Onboarding" component={OnBoarding} />
      <Stack.Screen name="Main" component={RootTab} />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaProvider className="bg-primary-0">
          <NavigationContainer>
            <StatusBar
              className="bg-primary-0"
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppContent />
          </NavigationContainer>
        </SafeAreaProvider>
      </TouchableWithoutFeedback>
    </AppProvider>
  );
}

function AppContent() {
  return <RootStack />;
}

export default App;
