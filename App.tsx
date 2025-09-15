/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
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
      <SafeAreaProvider className="bg-primary-0">
        <NavigationContainer>
          <StatusBar
            className="bg-primary-0"
            barStyle={getStatusBarStyle(isDarkMode)}
          />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}
export default App;
