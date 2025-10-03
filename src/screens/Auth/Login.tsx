import { isEmpty } from 'lodash';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCostumized from 'components/Header';
import InputField from 'components/InputField';
import { colors } from 'constants/color';
import ButtonCostumized from 'components/Button';
import Icons from '../../../assets/icons';
import { NativeStackProps } from '../../../routes';
import { InputAuthName } from 'constants/type';
import { useAuth } from 'contexts/hooks/useAuth';
import AuthHeader from './component/AuthHeader';

function Login({ navigation }: NativeStackProps) {
  const {
    email,
    password,
    statusEmail,
    statusPassWord,
    disableLogin,
    onChangeInput,
  } = useAuth();

  function handleLogin() {}

  function openSignUp() {
    const exist = navigation
      .getState()
      .routes.find(item => item.name === 'SignUp');
    if (isEmpty(exist)) {
      navigation.navigate('SignUp');
      return;
    }
    navigation.goBack();
  }

  function openResetPassword() {
    navigation.navigate('ForgotPassword');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-primary-0">
        <HeaderCostumized
          viewLeft={
            <AuthHeader
              title="Login to your account"
              text="It's great to see you again."
            />
          }
          viewRight={<View />}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="grow"
          keyboardDismissMode="on-drag"
        >
          <View
            className="flex-1 px-6 mt-2 gap-3"
            onStartShouldSetResponder={() => true}
          >
            <View className="gap-4">
              <InputField
                name={InputAuthName.email}
                onChangeText={onChangeInput}
                value={email}
                label="Email"
                placeholder="Enter your email addess"
                status={statusEmail}
                textError="Please enter valid email address"
              />
              <InputField
                name={InputAuthName.password}
                onChangeText={onChangeInput}
                value={password}
                label="Password"
                placeholder="Enter your password"
                status={statusPassWord}
                textError="Password not strong enough"
                secure
              />
            </View>
            <View className="flex-row flex-wrap items-center">
              <Text className="font-MontserratRegular text-primary-900">
                Forgot your password?{' '}
              </Text>
              <Pressable onPress={openResetPassword}>
                <Text className="font-MontserratSemiBold underline text-primary-900">
                  Reset your password
                </Text>
              </Pressable>
            </View>
            <View className="flex-1 mt-2">
              <View className="gap-6">
                <ButtonCostumized
                  title="Login"
                  style={[
                    styles.createButtonStyle,
                    !disableLogin ? styles.createActiveButtonStyle : {},
                  ]}
                  textStyle={[styles.createTextStyle]}
                  disabled={disableLogin}
                  onPress={handleLogin}
                />
                <View className="gap-2 flex-row items-center">
                  <View className="border-t border-primary-100 flex-1" />
                  <Text className="font-MontserratRegular text-primary-500 text-sm">
                    Or
                  </Text>
                  <View className="border-t border-primary-100 flex-1" />
                </View>
                <View className="gap-4">
                  <ButtonCostumized
                    title="Login with Google"
                    style={[styles.GoogleButtonStyle]}
                    iconLeft={<Icons.Google />}
                    textStyle={[styles.GoogleTextStyle]}
                  />
                  <ButtonCostumized
                    title="Login with Facebook"
                    iconLeft={<Icons.Facebook />}
                    style={[styles.FaceButtonStyle]}
                    textStyle={[styles.FaceTextStyle]}
                  />
                </View>
              </View>
              <View className="flex-1 flex-row justify-center items-end py-2.5">
                <Text className="text-primary-500 text-base font-MontserratRegular">
                  Don't have an account?{' '}
                </Text>
                <Pressable onPress={openSignUp}>
                  <Text className="text-primary-900 text-base font-MontserratSemiBold underline">
                    Join
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
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

export default Login;
