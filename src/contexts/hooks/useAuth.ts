import { useEffect, useState } from 'react';
import { debounce, isEmpty } from 'lodash';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import { onGoogleButtonPress } from 'provider/googleAuthProvider';
import type { FirebaseError } from 'firebase/app';
import { useNetInfo } from '@react-native-community/netinfo';
import { InputAuthName, InputStatus } from 'constants/type';
import {
  getFirebaseAuthErrorMessage,
  showToast,
  // saveDataStore,
  ValidateEmail,
  ValidateFullName,
  ValidatePassword,
} from 'lib/utils';

export const useAuth = () => {
  const { type, isConnected } = useNetInfo();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [statusFullName, setStatusFullName] = useState<InputStatus>(
    InputStatus.deafult,
  );
  const [statusEmail, setStatusEmail] = useState<InputStatus>(
    InputStatus.deafult,
  );
  const [statusPassWord, setStatusPassword] = useState<InputStatus>(
    InputStatus.deafult,
  );
  const [disableSignUp, setDisableSignUp] = useState(true);
  const [disableLogin, setDisableLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errorText, setError] = useState('');

  useEffect(() => {
    if (
      statusEmail === InputStatus.success &&
      statusPassWord === InputStatus.success
    ) {
      setDisableLogin(false);
      if (!isEmpty(fullName)) {
        setDisableSignUp(false);
      }
      return;
    }
    setDisableLogin(true);
    setDisableSignUp(true);
  }, [fullName, statusEmail, statusPassWord]);

  const onChangeInput = debounce((text: string, name: InputAuthName) => {
    switch (name) {
      case InputAuthName.fullname:
        setFullName(text);
        setStatusFullName(ValidateFullName(text));
        return;
      case InputAuthName.email:
        setEmail(text);
        setStatusEmail(ValidateEmail(text));
        return;
      case InputAuthName.password:
        setPassword(text);
        setStatusPassword(ValidatePassword(text));
        return;
      default:
        return;
    }
  }, 1000);

  const handleCreateAccount = () => {
    setLoading(true);
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {})
      .catch(error => {
        const message = getFirebaseAuthErrorMessage(error as FirebaseError);
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {})
      .catch(error => {
        const message = getFirebaseAuthErrorMessage(error as FirebaseError);
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    signOut(getAuth());
  };

  const handleLoginWithGoogle = async () => {
    if (!isConnected) {
      showToast({
        title: 'Network',
        type: 'warn',
        text: 'No internet connecttion',
      });
      return;
    }
    // await saveDataStore({ hasSeenOnboarding: true });
    setLoadingGoogle(true);
    await onGoogleButtonPress();
    setLoadingGoogle(false);
  };

  return {
    loading,
    errorText,
    loadingGoogle,
    fullName,
    email,
    password,
    statusFullName,
    statusEmail,
    statusPassWord,
    disableSignUp,
    disableLogin,
    onChangeInput,
    handleCreateAccount,
    handleLogin,
    handleLoginWithGoogle,
    handleLogout,
  };
};
