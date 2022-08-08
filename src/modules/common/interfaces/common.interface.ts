export interface IActionBooleanPayload {
  payload: boolean;
}

export interface ISagaEffectWithNavigation<T = any, P = any> {
  type: T;
  payload: P;
  navigate: (routeName: string) => void;
}
