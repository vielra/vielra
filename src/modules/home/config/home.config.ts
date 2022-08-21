export type HomeHeaderVariant = 'variant1' | 'variant2';

export interface IHomeConfig {
  HeaderVariant: HomeHeaderVariant;
}

export const HomeConfig: IHomeConfig = {
  HeaderVariant: 'variant2',
};
