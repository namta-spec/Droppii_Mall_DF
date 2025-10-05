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
import { isEmpty } from 'lodash';

function SignUp({ navigation }: NativeStackProps) {
  const {
    loading,
    errorText,
    fullName,
    email,
    password,
    statusFullName,
    statusEmail,
    statusPassWord,
    disableSignUp,
    onChangeInput,
    handleCreateAccount,
  } = useAuth();

  function openLogin() {
    const exist = navigation
      .getState()
      .routes.find(item => item.name === 'Login');
    if (isEmpty(exist)) {
      navigation.navigate('Login');
      return;
    }
    navigation.goBack();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-primary-0">
        <HeaderCostumized
          viewLeft={
            <AuthHeader
              title="Create an account"
              text="Let’s create your account."
            />
          }
          viewRight={<View />}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          contentContainerClassName="grow"
        >
          <View
            className="flex-1 px-6 mt-2 gap-3"
            onStartShouldSetResponder={() => true}
          >
            <View className="gap-4">
              {errorText && loading && (
                <Text className="text-red text-base font-MontserratRegular">
                  {errorText}
                </Text>
              )}
              <InputField
                name={InputAuthName.fullname}
                onChangeText={onChangeInput}
                value={fullName}
                label="Full Name"
                placeholder="Enter your full name"
                status={statusFullName}
                textError="Please enter full name"
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
                By signing up you agree to our{' '}
              </Text>
              <Pressable>
                <Text className="font-MontserratSemiBold underline text-primary-900">
                  Terms
                </Text>
              </Pressable>
              <Pressable>
                <Text className="font-MontserratSemiBold underline text-primary-900">
                  Privacy Policy
                </Text>
              </Pressable>
              <Text className="font-MontserratRegular text-primary-900">
                {' '}
                and{' '}
              </Text>
              <Pressable>
                <Text className="font-MontserratSemiBold underline text-primary-900">
                  Cookie Use
                </Text>
              </Pressable>
            </View>
            <View className="flex-1 mt-2">
              <View className="gap-6">
                <ButtonCostumized
                  loading={loading}
                  title="Create an Account"
                  style={[
                    styles.createButtonStyle,
                    !disableSignUp && !loading
                      ? styles.createActiveButtonStyle
                      : {},
                  ]}
                  textStyle={[styles.createTextStyle]}
                  disabled={disableSignUp || loading}
                  onPress={handleCreateAccount}
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
                    title="Sign Up with Google"
                    style={[styles.GoogleButtonStyle]}
                    iconLeft={<Icons.Google />}
                    textStyle={[styles.GoogleTextStyle]}
                  />
                  <ButtonCostumized
                    title="Sign Up with Facebook"
                    iconLeft={<Icons.Facebook />}
                    style={[styles.FaceButtonStyle]}
                    textStyle={[styles.FaceTextStyle]}
                  />
                </View>
              </View>
              <View className="flex-1 flex-row justify-center items-end py-2.5">
                <Text className="text-primary-500 text-base font-MontserratRegular">
                  Already have an account?{' '}
                </Text>
                <Pressable onPress={openLogin}>
                  <Text className="text-primary-900 text-base font-MontserratSemiBold underline">
                    Log In
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

export default SignUp;
