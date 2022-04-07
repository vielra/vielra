import { PaletteMode } from '@/interfaces/theme';
import { CommonAction } from './actions';
import ActionTypes from './enum';

export interface CommonState {
  mode: PaletteMode;
}

const initialState: CommonState = {
  mode: 'light',
};

export const commonReducer = (state: CommonState = initialState, action: CommonAction): CommonState => {
  switch (action.type) {
    case ActionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        mode: state.mode === 'dark' ? 'light' : 'dark',
      };

    default:
      return state;
  }
};
