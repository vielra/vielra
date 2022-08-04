import { RootState } from '@/store/root-reducer';
import { AuthState } from './auth-reducer';

export const auth_rootSelector = (state: RootState): AuthState => state.auth;
