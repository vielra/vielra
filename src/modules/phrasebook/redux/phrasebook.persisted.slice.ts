// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { RootState } from '@/plugins/redux';
import { IPhrasebook, IPhraseCategory } from '@/modules/phrasebook/interfaces';

// type for our state
export type PhrasebookPersistedSliceState = {
  listCategories: Array<IPhraseCategory>;
  listPhrasebook: {
    [key: string]: IPhrasebook;
  };
};

// initial state
export const phrasebookPersisted_initialState: PhrasebookPersistedSliceState = {
  listCategories: [],
  listPhrasebook: {},
};

export const phrasebookPersistedSlice = createSlice({
  name: 'phrasebook.persisted',
  initialState: phrasebookPersisted_initialState,
  reducers: {
    phrasebookPersisted_setListCategories(state, action: PayloadAction<Array<IPhraseCategory>>) {
      state.listCategories = action.payload?.length > 0 ? action.payload : [];
    },
    phrasebookPersisted_setListPhrasebook(state, action: PayloadAction<IPhrasebook>) {
      if (action.payload?.category?.id) {
        state.listPhrasebook = {
          ...state.listPhrasebook,
          [action.payload.category.id]: action.payload,
        };
      }
    },
    phrasebookPersisted_reset() {
      return phrasebookPersisted_initialState;
    },
  },
});

export const phrasebookPersisted_reducerActions = phrasebookPersistedSlice.actions;

export const phrasebookPersisted_selector = (state: RootState): PhrasebookPersistedSliceState =>
  state['phrasebook.persisted'];
