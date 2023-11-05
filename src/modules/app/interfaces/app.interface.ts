export type RNVectorIconProvider =
  | 'ionicons'
  | 'material-icons'
  | 'material-community-icons'
  | 'feather'
  | 'octicons'
  | 'zocial';

export type AppLanguageCode = 'en' | 'id' | 'vi';

export interface IAppLanguage {
  code: AppLanguageCode;
  name: string;
}
