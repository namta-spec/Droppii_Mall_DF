import { useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderCostumized from 'components/Header';
import { colors } from 'constants/color';
import ButtonCostumized from 'components/Button';
import { MainStackParamList } from '../../../routes';
import AuthHeader from './component/AuthHeader';

type Props = NativeStackScreenProps<MainStackParamList, 'Verification'>;

function Verification({ route }: Props) {
  const [disabled, setDisabled] = useState(true);
  const [code, setCode] = useState<number>();

  function handleFill(text: string) {
    setDisabled(false);
    setCode(Number(text));
    handleContinue();
  }

  function handleChange(text: string) {
    setCode(Number(text));
    if (text.length < 4) {
      setDisabled(true);
    }
  }

  function handleContinue() {
    console.log('Check: ', code);
  }

  function handleResend() {}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-primary-0">
        <HeaderCostumized viewRight={<View />} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="grow"
          keyboardDismissMode="on-drag"
        >
          <View className="flex-1 px-6 gap-6">
            <AuthHeader
              title="Enter 4 Digit Code"
              text={`Enter 4 digit code that your receive on your email (${route.params.email}).`}
            />
            <View className="gap-4">
              <OtpInput
                numberOfDigits={4}
                onFilled={handleFill}
                onTextChange={handleChange}
                hideStick={false}
                focusColor={colors.primary['100']}
                theme={{
                  containerStyle: {
                    gap: 12,
                  },
                  pinCodeContainerStyle: { flex: 1 },
                  pinCodeTextStyle: {
                    color: colors.primary['900'],
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 32,
                  },
                }}
              />
              <View className="flex-row flex-wrap items-center justify-center">
                <Text className="font-MontserratRegular text-primary-900">
                  Email not received?{' '}
                </Text>
                <Pressable onPress={handleResend}>
                  <Text className="font-MontserratSemiBold underline text-primary-900">
                    Resend code
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="px-6 py-2.5">
          <ButtonCostumized
            title="Continue"
            style={[
              styles.createButtonStyle,
              !disabled ? styles.createActiveButtonStyle : {},
            ]}
            textStyle={[styles.createTextStyle]}
            disabled={disabled}
            onPress={handleContinue}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  createButtonStyle: {
    backgroundColor: colors.primary['200'],
    paddingVertical: 16,
  },
  createActiveButtonStyle: {
    backgroundColor: colors.primary['900'],
  },
  createTextStyle: {
    color: colors.primary['0'],
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  GoogleButtonStyle: {
    backgroundColor: colors.primary['0'],
    borderColor: colors.primary['200'],
    borderWidth: 1,
    paddingVertical: 16,
    gap: 8,
  },
  GoogleTextStyle: {
    color: colors.primary['900'],
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  FaceButtonStyle: {
    backgroundColor: colors.blue,
    paddingVertical: 16,
    gap: 8,
  },
  FaceTextStyle: {
    color: colors.primary['0'],
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});

export default Verification;
