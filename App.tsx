/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './global.css';
import RootNavigator from 'navigation/RootStack';
import { navigationRef } from 'lib/navigation';
import { AuthProvider } from 'contexts/providers/AuthProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  function getStatusBarStyle(darkMode: boolean) {
    return darkMode ? 'light-content' : 'dark-content';
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <NavigationContainer ref={navigationRef}>
              <StatusBar
                barStyle={getStatusBarStyle(isDarkMode)}
                translucent
                backgroundColor="transparent"
              />
              <RootNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
export default App;
