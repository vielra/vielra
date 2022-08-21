export type UUID = string;

export interface IActionBooleanPayload {
  payload: boolean;
}

export interface ISagaEffectWithNavigateFunction<T = any, P = any> {
  type: T;
  payload: P;
  navigate: (routeName?: string, params?: any) => void;
}
