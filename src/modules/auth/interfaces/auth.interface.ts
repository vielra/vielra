import { IUser } from '@/modules/user';

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

// Login response
export interface IResponseLogin {
  success: boolean;
  token: string;
  token_type?: string;
  user: IUser;
}
// Type alias
export type ResponseLogin = IResponseLogin;

// Response register - it same with response login.
export interface IResponseRegister extends IResponseLogin {}

// Type alias
export type ResponseRegister = IResponseRegister;
