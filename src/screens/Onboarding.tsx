import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import image from '@assets/images/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useRef } from 'react';
import Icons from '../../assets/icons/index';
import ButtonCostumized from '@components/Button';

function OnBoarding() {
  const textAnim = useRef(new Animated.Value(-300)).current;
  const imageAnim = useRef(new Animated.Value(300)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const moveIn = useCallback(() => {
    Animated.timing(textAnim, {
      toValue: 0, // End animation
      duration: 1500, // Animation run time is 1500ms
      useNativeDriver: true, // Allow animations to run on the UI thread (Native) instead of the JS thread.
    }).start();

    Animated.timing(imageAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonAnim, {
      toValue: 1,
      delay: 1500,
      duration: 100,
      useNativeDriver: true,
    }).start();
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
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          }}
          className="fixed top-[200px] flex-1 justify-center items-center"
        >
          <Icons.Vector width={810} height={810} style={styles.vectorStyle} />
          <Icons.Vector width={740} height={740} style={styles.vectorStyle} />
          <Icons.Vector width={670} height={670} style={styles.vectorStyle} />
          <Icons.Vector width={610} height={610} style={styles.vectorStyle} />
        </Animated.View>
        <Animated.View
          className="w-[100%] h-[100%] absolute"
          style={[
            {
              transform: [{ translateX: textAnim }],
            },
          ]}
        >
          <Text
            style={[styles.textStyle]}
            className="font-MontserratSemiBold text-[60px] left-[24px] top-[59px]"
          >
            Define yourself in your unique way.
          </Text>
        </Animated.View>
        <Animated.View
          className="w-[100%] h-[100%] absolute"
          style={[
            {
              transform: [{ translateX: imageAnim }],
            },
          ]}
        >
          <Image style={styles.imageStyle} source={image.image_onboarding} />
        </Animated.View>
        <Animated.View
          className="px-[24px] py-[22px] bg-white"
          style={[styles.buttonStyle, { opacity: buttonAnim }]}
        >
          <ButtonCostumized
            onPress={handleTap}
            title="Get Started"
            classNameButton="bg-primary-900"
            classNameText="color-white text-[16px]"
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
    left: 32,
    top: 147,
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
