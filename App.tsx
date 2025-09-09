/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { Button, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import "./global.css"
import AppProvider, { AppContext, AppContextType } from 'context/AppContext';
import { useContext } from 'react';

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
  const safeAreaInsets = useSafeAreaInsets();
  const {isDarkMode, setIsDarkMode} = useContext(AppContext) as AppContextType;

  console.log(isDarkMode ? 'light-content' : 'dark-content');

  return (
    <View style={styles.container}>  
    <Button title="Tap to switch" onPress={() => setIsDarkMode(!isDarkMode)}/>   
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
