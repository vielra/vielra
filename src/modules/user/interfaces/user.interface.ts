export interface IUser {
  name: string;
  username: string;
  email: string;
  availableStatusText: 'available' | 'away' | 'do not disturb' | 'offline';
}
