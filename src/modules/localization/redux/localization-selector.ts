import { RootState } from '@/store/root-reducer';
import { LocalizationState } from './localization-reducer';

export const localization_rootSelector = (state: RootState): LocalizationState => state.localization;
