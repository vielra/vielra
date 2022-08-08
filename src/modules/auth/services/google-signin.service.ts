/**
 * Google SignIn Service
 */
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Interfaces
import { ResponseGoogleSignIn } from '@/modules/auth/interfaces';

class GoogleSignInService {
  signIn = async (): Promise<ResponseGoogleSignIn | undefined | null> => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response !== null) {
        return response;
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Login on progress');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      return null;
    }
  };
}

export default new GoogleSignInService();
