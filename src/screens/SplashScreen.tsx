import { SCREEN_HEIGHT } from 'constants/screens';
import Icons from '../../assets/icons';
import { StatusBar, StyleSheet, View } from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
type VectorIcon = { key: number; size: number };

const arrayVectorIcon: VectorIcon[] = [
  { key: 1, size: 900 },
  { key: 2, size: 800 },
  { key: 3, size: 700 },
  { key: 4, size: 600 },
];

export default function LoadingScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary-900">
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <View
        className="fixed flex-1 justify-center items-center"
        style={{
          top: WINDOW_HEIGHT * 0.005,
          left: -WINDOW_WIDTH * 0.1,
          transform: [{ rotateY: '180deg' }],
        }}
      >
        {arrayVectorIcon.map(item => {
          return (
            <Icons.Vector
              key={item.key}
              width={item.size}
              height={item.size}
              style={styles.vectorStyle}
            />
          );
        })}
      </View>
      <View
        className="absolute bg-primary-900 w-full bottom-0 items-center"
        style={styles.viewLogo}
      >
        <Icons.Logo style={styles.logoStyle} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  vectorStyle: {
    position: 'absolute',
  },
  viewLogo: {
    height: SCREEN_HEIGHT * 0.5,
  },
  logoStyle: {
    transform: [{ translateY: -50 }],
  },
});
