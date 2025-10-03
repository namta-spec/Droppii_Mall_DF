import { colors } from 'constants/color';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingScreen = () => (
  <SafeAreaView style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size={'large'} color={colors.primary['900']} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoadingScreen;
