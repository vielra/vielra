import { RootState } from '@/store/root-reducer';
import { PhrasebookState } from './phrasebook-reducer';

export const phrasebook_rootSelector = (state: RootState): PhrasebookState => state.phrasebook;
