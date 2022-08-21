import { useAppSelector } from '@/store';
import { CommonState, common_rootSelector } from '@/modules/common/redux';

export interface IUseCommon extends CommonState {}

export const useCommon = (): IUseCommon => {
  const common = useAppSelector((s) => common_rootSelector(s));

  // Additional or custom hook ?

  return common;
};
