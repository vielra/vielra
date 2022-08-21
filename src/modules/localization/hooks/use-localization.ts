import { useAppSelector } from '@/store';
import { LocalizationState, localization_rootSelector } from '@/modules/localization/redux';

export const useLocalization = (): LocalizationState => {
  const state = useAppSelector((s) => localization_rootSelector(s));
  return state;
};
