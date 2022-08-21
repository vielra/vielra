import { RootState } from '@/store/root-reducer';
import { CommonState } from './common-reducer';

export const common_rootSelector = (state: RootState): CommonState => state.common;
