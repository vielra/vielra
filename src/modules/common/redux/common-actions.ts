// Enum action types.
import { CommonActionTypes } from './common-actions-types.enum';

// Interfaces.
import { IActionBooleanPayload } from '@/modules/common/interfaces';

/** Actions definitions */
interface ISetBottomSheetWarningAuthRequired extends IActionBooleanPayload {
  type: typeof CommonActionTypes.SET_BOTTOM_SHEET_WARNING_AUTH_REQUIRED;
}

/** Union action types */
export type CommonActions = ISetBottomSheetWarningAuthRequired;

/** Actions creators */
export const common_actionSetBottomSheetAuthRequired = (payload: boolean): ISetBottomSheetWarningAuthRequired => ({
  type: CommonActionTypes.SET_BOTTOM_SHEET_WARNING_AUTH_REQUIRED,
  payload,
});
