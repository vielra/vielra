// Redux.
import { combineReducers } from 'redux';

// Reducers.
import { themeReducer, ThemeState } from '@/modules/theme/redux';

// Root State.
export type RootState = {
  theme: ThemeState;
};

export default combineReducers<RootState>({
  theme: themeReducer,
});
