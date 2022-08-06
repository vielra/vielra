// Axios instance
import { http } from '@/utils';

// Interfaces.
import { IRequestLogin, IRequestRegister, ResponseLogin, ResponseRegister } from '@/modules/auth/interfaces';
import { AxiosResponse } from 'axios';

// Auth api endpoints
import { AuthApiEndpoints } from './auth-api-endpoints.enum';

/**
 * Auth api service.
 */
class AuthApiService {
  /**
   * @description - Login user with email and password.
   * @param {IRequestLogin} body
   * @returns Promise<AxiosResponse<ResponseLogin>>
   */
  loginWithEmailAndPassword = async (body: IRequestLogin): Promise<AxiosResponse<ResponseLogin>> => {
    return await http.post(AuthApiEndpoints.login, body);
  };

  /**
   * @description - Register user with email, username and password.
   * @param {IRequestRegister} body
   * @returns Promise<AxiosResponse<ResponseRegister>>
   */
  register = async (body: IRequestRegister): Promise<AxiosResponse<ResponseRegister>> => {
    return await http.post(AuthApiEndpoints.register, body);
  };

  /**
   * @description - Revoking sanctum token from the server.
   * @returns Promise<AxiosResponse<null>>
   */
  revokeToken = async (): Promise<AxiosResponse<null>> => {
    return await http.post(AuthApiEndpoints.revokeToken);
  };
}

export default new AuthApiService();
