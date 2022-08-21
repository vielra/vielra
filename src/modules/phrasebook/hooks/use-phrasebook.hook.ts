import { useAppSelector } from '@/store';
import { PhrasebookState, phrasebook_rootSelector } from '@/modules/phrasebook/redux';

export interface IUsePhrasebook extends PhrasebookState {}

export const usePhrasebook = (): IUsePhrasebook => {
  const phrasebookState = useAppSelector((s) => phrasebook_rootSelector(s));

  // Additional or custom hook ?

  return phrasebookState;
};
