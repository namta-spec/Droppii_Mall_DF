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
import ToastManager from 'toastify-react-native';
import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';
import './global.css';
import RootNavigator from 'navigation/RootStack';
import { navigationRef } from 'lib/navigation';
import { AuthProvider } from 'contexts/providers/AuthProvider';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 3,
  retryDelay: 3000,
  sourceAnimationDuration: 500,
  thumbnailAnimationDuration: 500,
};

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
              <ToastManager />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
export default App;
