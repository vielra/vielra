// Action types.
import { CommonActionTypes } from './common-actions-types.enum';

// Union action types.
import { CommonActions } from './common-actions';

// Interfaces.

export interface CommonState {
  showBottomSheetWarningAuthRequired: boolean;
}

const initialState: CommonState = {
  showBottomSheetWarningAuthRequired: false,
};

export const commonReducer = (state: CommonState = initialState, action: CommonActions): CommonState => {
  switch (action.type) {
    case CommonActionTypes.SET_BOTTOM_SHEET_WARNING_AUTH_REQUIRED:
      return {
        ...state,
        showBottomSheetWarningAuthRequired: action.payload,
      };

    default:
      return state;
  }
};
