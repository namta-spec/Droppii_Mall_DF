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
import RootNavigator from 'navigation/RootStack';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  function getStatusBarStyle(darkMode: boolean) {
    return darkMode ? 'light-content' : 'dark-content';
  }

  return (
    <AppProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaProvider className="bg-primary-0">
          <NavigationContainer>
            <StatusBar
              className="bg-primary-0"
              barStyle={getStatusBarStyle(isDarkMode)}
            />
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </TouchableWithoutFeedback>
    </AppProvider>
  );
}
export default App;
