import { SocialAccountProvider } from '@/modules/auth';

export interface IUser {
  name: string;
  username: string;
  email: string;
  availableStatusText: 'available' | 'away' | 'do not disturb' | 'offline';
  social_account: ISocialAccount | null;
}

export interface ISocialAccount {
  id: number;
  social_id: string;
  social_name: string;
  social_photo_url: string | null;
  social_provider: SocialAccountProvider;
}
