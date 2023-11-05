// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { RootState } from '@/plugins/redux';
import { IPhrasebook, IPhraseCategory } from '@/modules/phrasebook/interfaces';

// type for our state
export type PhrasebookSliceState = {
  listCategories: Array<IPhraseCategory>;
  listPhrasebook: {
    [key: string]: IPhrasebook;
  };
};

// initial state
export const phrasebook_initialState: PhrasebookSliceState = {
  listCategories: [],
  listPhrasebook: {},
};

export const phrasebookSlice = createSlice({
  name: 'phrasebook',
  initialState: phrasebook_initialState,
  reducers: {
    phrasebook_setListCategories(state, action: PayloadAction<Array<IPhraseCategory>>) {
      state.listCategories = action.payload?.length > 0 ? action.payload.sort((a, b) => a.order - b.order) : [];
    },
    phrasebook_setListPhrasebook(state, action: PayloadAction<IPhrasebook>) {
      state.listPhrasebook = {
        ...state.listPhrasebook,
        [action.payload.category.id]: action.payload,
      };
    },
    phrasebook_reset() {
      return phrasebook_initialState;
    },
  },
});

export const phrasebook_reducerActions = phrasebookSlice.actions;

export const phrasebook_selector = (state: RootState): PhrasebookSliceState => state.phrasebook;
