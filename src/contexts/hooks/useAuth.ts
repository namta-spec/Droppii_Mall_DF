import { useEffect, useState } from 'react';
import { debounce, isEmpty } from 'lodash';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { InputAuthName, InputStatus } from 'constants/type';
import {
  getFirebaseAuthErrorMessage,
  ValidateEmail,
  ValidateFullName,
  ValidatePassword,
} from 'lib/utils';

export const useAuth = () => {
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
  const [loading, setloading] = useState(false);
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
    setloading(true);
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {})
      .catch(error => {
        const message = getFirebaseAuthErrorMessage(error as FirebaseError);
        setError(message);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const handleLogin = () => {
    setloading(true);
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {})
      // .then(async (res: FirebaseAuthTypes.UserCredential) => {
      //   // call API to get info user
      //   let dataCart: cartProductType[] = [
      //     {
      //       id: 1,
      //       name: 'Regular Fit Slogan',
      //       cost: 1190,
      //       amount: 2,
      //       size: SizeType.L,
      //       categoryId: 1,
      //       image:
      //         'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
      //     },
      //     {
      //       id: 1,
      //       name: 'Regular Fit Slogan',
      //       cost: 1190,
      //       amount: 2,
      //       size: SizeType.M,
      //       categoryId: 1,
      //       image:
      //         'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
      //     },
      //     {
      //       id: 3,
      //       name: 'Regular Fit Black',
      //       cost: 1690,
      //       amount: 1,
      //       size: SizeType.L,
      //       categoryId: 1,
      //       image:
      //         'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
      //     },
      //   ];
      //   let dataAddress: addressType = {
      //     id: 1,
      //     title: 'Home',
      //     address: '925 S Chugach St #APT 10, Alaska 99645',
      //     default: true,
      //   };
      //   let dataCard: CardType = {
      //     token: 'pm_1PqABC123xyz',
      //     card: {
      //       brand: 'visa',
      //       last_four: 4242,
      //       exp_month: 12,
      //       exp_year: 2028,
      //     },
      //     default: true,
      //   };
      //   const dataUser: IUserState = {
      //     id: res.user.uid,
      //     fullName: fullName,
      //     email: res.user.email || email,
      //     address: dataAddress,
      //     listAddress: [],
      //     cart: dataCart,
      //     listCard: [],
      //     card: dataCard,
      //   };
      //   dispatch(setUser(dataUser));
      // })
      .catch(error => {
        const message = getFirebaseAuthErrorMessage(error as FirebaseError);
        setError(message);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const handleLogout = () => {
    signOut(getAuth());
  };

  return {
    loading,
    errorText,
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
    handleLogout,
  };
};
