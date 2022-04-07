import ActionTypes from './enum';

/** Actions definitions */
interface ToggleDarkMode {
  type: typeof ActionTypes.TOGGLE_DARK_MODE;
}

/** Union action types */
export type CommonAction = ToggleDarkMode;

/** Actions creators */
export const toggleDarkMode = (): ToggleDarkMode => ({
  type: ActionTypes.TOGGLE_DARK_MODE,
});
