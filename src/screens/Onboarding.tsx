import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import image from '@assets/images/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useRef } from 'react';
import Icons from '../../assets/icons/index';
import ButtonCostumized from '@components/Button';

type VectorIcon = { key: number; size: number };
function OnBoarding() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const textAnim = useRef(new Animated.Value(-300)).current;
  const imageAnim = useRef(new Animated.Value(300)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const arrayVectorIcon: VectorIcon[] = [
    { key: 1, size: 800 },
    { key: 2, size: 740 },
    { key: 3, size: 670 },
    { key: 4, size: 610 },
  ];

  const moveIn = useCallback(() => {
    Animated.sequence([
      // waiting for each to complete before starting the next.
      Animated.parallel([
        // starts the animations in order, starts a number of animations at the same time.
        Animated.timing(textAnim, {
          toValue: 0, // End animation
          duration: 1500, // Animation run time is 1500ms
          useNativeDriver: true, // Allow animations to run on the UI thread (Native) instead of the JS thread.
        }),
        Animated.timing(imageAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, textAnim, imageAnim, buttonAnim]);

  const handleTap = () => {
    console.log('Ok Tap');
  };

  useEffect(() => {
    moveIn();
  }, [moveIn]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            top: screenHeight * 0.35,
          }}
          className="fixed flex-1 justify-center items-center"
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
        </Animated.View>
        <Animated.View
          className="w-full h-full absolute"
          style={{
            transform: [{ translateX: textAnim }],
            top: screenHeight * 0.05,
          }}
        >
          <Text
            style={styles.textStyle}
            className="font-MontserratSemiBold text-7xl inset-x-6 text-primary-900"
          >
            Define yourself in your unique way.
          </Text>
        </Animated.View>
        <Animated.View
          className="w-full h-full absolute"
          style={{
            transform: [{ translateX: imageAnim }],
            top: screenHeight * 0.15,
            left: screenWidth * 0.1,
          }}
        >
          <Image style={styles.imageStyle} source={image.image_onboarding} />
        </Animated.View>
        <Animated.View
          className="px-6 py-5.5 bg-white"
          style={[styles.buttonStyle, { opacity: buttonAnim }]}
        >
          <ButtonCostumized
            onPress={handleTap}
            title="Get Started"
            classNameButton="bg-primary-900"
            classNameText="color-white text-xl"
            iconRight={<Icons.ArrowRight width={24} height={24} />}
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vectorStyle: {
    position: 'absolute',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  textStyle: {
    lineHeight: 50,
    letterSpacing: -5,
    position: 'absolute',
    height: '100%',
  },
});

export default OnBoarding;
