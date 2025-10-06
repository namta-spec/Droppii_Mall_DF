import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCostumized from 'components/Header';
import InputField from 'components/InputField';
import { colors } from 'constants/color';
import ButtonCostumized from 'components/Button';
import { NativeStackProps } from '../../../routes';
import { InputAuthName, InputStatus } from 'constants/type';
import { useAuth } from 'contexts/hooks/useAuth';
import AuthHeader from './component/AuthHeader';

function ForgotPassword({ navigation }: NativeStackProps) {
  const { email, statusEmail, onChangeInput } = useAuth();

  function handleSendCode() {
    navigation.navigate('Verification', { email });
  }

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
              title="Forgot password"
              text="Enter your email for the verification process. We will send 4
                digits code to your email."
              style={styles.textHeaderStyle}
            />
            <InputField
              name={InputAuthName.email}
              onChangeText={onChangeInput}
              value={email}
              label="Email"
              placeholder="Enter your email addess"
              status={statusEmail}
              textError="Please enter valid email address"
            />
          </View>
        </ScrollView>
        <View className="px-6 py-2.5">
          <ButtonCostumized
            title="Send Code"
            style={[
              styles.createButtonStyle,
              statusEmail === InputStatus.success
                ? styles.createActiveButtonStyle
                : {},
            ]}
            textStyle={[styles.createTextStyle]}
            disabled={statusEmail !== InputStatus.success}
            onPress={handleSendCode}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textHeaderStyle: {
    lineHeight: 40,
  },
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

export default ForgotPassword;
