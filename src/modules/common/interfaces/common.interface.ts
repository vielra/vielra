export type UUID = string;

export interface IActionBooleanPayload {
  payload: boolean;
}

export interface ISagaEffectWithNavigateFunction<T = any, P = any> {
  type: T;
  payload: P;
  navigate: (routeName?: string, params?: any) => void;
}

export interface IDropdown<T> {
  value: T;
  label: string;
}

export interface IDropdownValue<T> extends IDropdown<T> {}
