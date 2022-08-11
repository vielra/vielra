import { IUser } from '@/modules/user';

// Google SignIn
import { User as ResponseReactNativeGoogleSignIn } from '@react-native-google-signin/google-signin';

/** Request body for login user */
export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IRequestRegister {
  name: string;
  email: string;
  // username: string;
  password: string;
  password_confirmation: string;
}

// Request body login with social account
export interface IRequestLoginSocialAccount {
  social_id: string;
  social_name: string;
  social_email: string;
  social_photo_url?: string | null;
}

// Login response
export interface IResponseLogin {
  // success: boolean;
  // token_type?: string;
  token: string;
  user: IUser;
}

export type ResponseGoogleSignIn = ResponseReactNativeGoogleSignIn;

export type SocialAccountProvider = 'google' | 'facebook';

// Type alias
export type ResponseLogin = IResponseLogin;

// Response register - it same with response login.
export interface IResponseRegister extends IResponseLogin {}

// Type alias
export type ResponseRegister = IResponseRegister;
