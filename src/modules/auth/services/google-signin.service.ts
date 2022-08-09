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

  getCurrentUserInfo = async (): Promise<void> => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  isSignedIn = async (): Promise<boolean> => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
  };

  getCurrentUser = async (): Promise<any> => {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  };

  signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  };
}

export default new GoogleSignInService();
