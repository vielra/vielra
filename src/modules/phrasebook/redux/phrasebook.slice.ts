// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { RootState } from '@/plugins/redux';
import { IPhrase, IPhrasebook, IPhraseCategory } from '@/modules/phrasebook/interfaces';

// type for our state
export type PhrasebookSliceState = {
  listCategories: Array<IPhraseCategory>;
  listPhrasebook: {
    [key: string]: IPhrasebook;
  };

  snapIndexBottomSheetCategoryList: number;
  snapIndexBottomSheetDetail: number;
  bottomSheetDetailData: IPhrase | null;
};

// initial state
export const phrasebook_initialState: PhrasebookSliceState = {
  listCategories: [],
  listPhrasebook: {},

  /**
   * Initial snap point index bottom sheet category list, default should be `-1` to initiate bottom sheet in closed state.
   */
  snapIndexBottomSheetCategoryList: -1,
  snapIndexBottomSheetDetail: -1,
  bottomSheetDetailData: null,
};

export const phrasebookSlice = createSlice({
  name: 'phrasebook',
  initialState: phrasebook_initialState,
  reducers: {
    phrasebook_setListCategories(state, action: PayloadAction<Array<IPhraseCategory>>) {
      state.listCategories = action.payload?.length > 0 ? action.payload : [];
      // state.listCategories = action.payload?.length > 0 ? action.payload.sort((a, b) => a.order - b.order)  : [];
    },
    phrasebook_setListPhrasebook(state, action: PayloadAction<IPhrasebook>) {
      if (action.payload?.category?.id) {
        state.listPhrasebook = {
          ...state.listPhrasebook,
          [action.payload.category.id]: action.payload,
        };
      }
    },
    phrasebook_setSnapIndexBottomSheetCategoryList(state, action: PayloadAction<number>) {
      state.snapIndexBottomSheetCategoryList = action.payload;
    },
    phrasebook_setSnapIndexBottomSheetDetail(state, action: PayloadAction<number>) {
      state.snapIndexBottomSheetDetail = action.payload;
    },
    phrasebook_setBottomSheetDetailData(state, action: PayloadAction<IPhrase | null>) {
      state.bottomSheetDetailData = action.payload;
    },
    phrasebook_reset() {
      return phrasebook_initialState;
    },
  },
});

export const phrasebook_reducerActions = phrasebookSlice.actions;

export const phrasebook_selector = (state: RootState): PhrasebookSliceState => state.phrasebook;
