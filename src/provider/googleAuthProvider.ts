import {
  FirebaseAuthTypes,
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  SignInResponse,
} from '@react-native-google-signin/google-signin';
import { isEmpty } from 'lodash';

export async function onGoogleButtonPress(): Promise<FirebaseAuthTypes.UserCredential | null> {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const signInResult: SignInResponse = await GoogleSignin.signIn();

  if (signInResult.type === 'cancelled' || isEmpty(signInResult.data)) {
    return null;
  }
  let idToken = signInResult.data?.idToken;
  if (!idToken) {
    throw new Error('No ID token found from Google Sign-In');
  }

  const googleCredential = GoogleAuthProvider.credential(idToken);

  return await signInWithCredential(getAuth(), googleCredential);
}
