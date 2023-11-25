// redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { RootState } from '@/plugins/redux';
import { IPhrase } from '@/modules/phrasebook/interfaces';

// type for our state
export type PhrasebookSliceState = {
  snapIndexBottomSheetCategoryList: number;
  snapIndexBottomSheetDetail: number;
  bottomSheetDetailData: IPhrase | null;
};

// initial state
export const phrasebook_initialState: PhrasebookSliceState = {
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
