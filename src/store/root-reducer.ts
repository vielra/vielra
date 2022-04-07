import { combineReducers } from 'redux';
import { commonReducer, CommonState } from '@/store/common/reducer';

export interface RootState {
  common: CommonState;
}

export default combineReducers<RootState>({
  common: commonReducer,
});
