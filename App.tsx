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
import OnBoarding from 'screens/Onboarding';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </AppProvider>
  );
}

function AppContent() {
  return <OnBoarding />;
}

export default App;
