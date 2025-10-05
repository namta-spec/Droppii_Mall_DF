import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import OnBoarding from 'screens/Onboarding';
import MainStacks from './MainStack';
import AuthStacks from './AuthStack';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/contexts/AuthContext';
import { isEmpty } from 'lodash';
import { setUser } from 'contexts/actions/AuthAction';
import { IUserState } from 'contexts/interfaces';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import {
  addressType,
  CardType,
  cartProductType,
  SizeType,
} from 'constants/type';
import LoadingScreen from 'screens/LoadingScreen';

const RootStack = createNativeStackNavigator<MainStackParamList>();

function RootNavigator() {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), firebaseUser => {
      if (firebaseUser) {
        // call API to set info user
        let dataCart: cartProductType[] = [
          {
            id: 1,
            name: 'Regular Fit Slogan',
            cost: 1190,
            amount: 2,
            size: SizeType.L,
            categoryId: 1,
            image:
              'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
          },
          {
            id: 1,
            name: 'Regular Fit Slogan',
            cost: 1190,
            amount: 2,
            size: SizeType.M,
            categoryId: 1,
            image:
              'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
          },
          {
            id: 3,
            name: 'Regular Fit Black',
            cost: 1690,
            amount: 1,
            size: SizeType.L,
            categoryId: 1,
            image:
              'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
          },
        ];
        let dataAddress: addressType = {
          id: 1,
          title: 'Home',
          address: '925 S Chugach St #APT 10, Alaska 99645',
          default: true,
        };
        let dataCard: CardType = {
          token: 'pm_1PqABC123xyz',
          card: {
            brand: 'visa',
            last_four: 4242,
            exp_month: 12,
            exp_year: 2028,
          },
          default: true,
        };
        const dataUser: IUserState = {
          id: firebaseUser.uid,
          fullName: 'DangNam',
          email: firebaseUser.email || '',
          address: dataAddress,
          listAddress: [],
          cart: dataCart,
          listCard: [],
          card: dataCard,
        };
        dispatch(setUser(dataUser));
      } else {
        dispatch(setUser(null));
      }
      if (loading) {
        setloading(false);
      }
    });
    return unsubscribe;
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      {!isEmpty(user) ? (
        <RootStack.Screen name="MainStack" component={MainStacks} />
      ) : (
        <>
          <RootStack.Screen name="Onboarding" component={OnBoarding} />
          <RootStack.Screen name="AuthStack" component={AuthStacks} />
        </>
      )}
    </RootStack.Navigator>
  );
}

export default RootNavigator;
