import { SocialAccountProvider } from '@/modules/auth/interfaces';

export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  photo_url: string | null;
  gender: string | null;
  mobile_phone: string | null;
  birthday: string | null;
  about: string | null;
  created_at: string | null;
  updated_at: string | null;
  status: 'active' | 'inactive';
  social_account: ISocialAccount | null;
}

export interface ISocialAccount {
  id: number;
  social_id: string;
  social_name: string;
  social_photo_url: string | null;
  social_provider: SocialAccountProvider;
}
