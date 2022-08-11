import { IPhraseCategory } from '../interfaces';
import { PhrasebookActionTypes } from './phrasebook-action-types.enum';

// --------------------------
// Action definitions
// --------------------------
export interface IFetchPhraseCategoryListRequested {
  type: PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_REQUESTED;
}
export interface IFetchPhraseCategoryListLoading {
  type: PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_LOADING;
  payload: boolean;
}
export interface IFetchPhraseCategoryListFailure {
  type: PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_FAILURE;
  payload: {
    status: boolean;
    messages?: Array<string> | string | null;
  };
}
export interface IFetchPhraseCategoryListSuccess {
  type: PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_SUCCESS;
  payload: Array<IPhraseCategory>;
}
export interface ISetPhraseFormIsDirty {
  type: PhrasebookActionTypes.SET_PHRASE_FORM_IS_DIRTY;
  payload: boolean;
}

// --------------------------
// Union action types
// --------------------------
export type PhrasebookActions =
  | IFetchPhraseCategoryListRequested
  | IFetchPhraseCategoryListLoading
  | IFetchPhraseCategoryListFailure
  | IFetchPhraseCategoryListSuccess
  | ISetPhraseFormIsDirty;

// --------------------------
// Actions creators
// --------------------------
export const phrasebook_actionFetchPraseCategory = (): IFetchPhraseCategoryListRequested => ({
  type: PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_REQUESTED,
});

export const phrasebook_actionFetchPraseCategoryLoading = (payload: boolean): IFetchPhraseCategoryListLoading => ({
  type: PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_LOADING,
  payload,
});

// prettier-ignore
export const phrasebook_actionFetchPraseCategoryFailure = (status: boolean, messages?: Array<string> | string | null): IFetchPhraseCategoryListFailure => ({
  type: PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_FAILURE,
  payload: { status, messages },
});

// prettier-ignore
export const phrasebook_actionFetchPraseCategorySuccess = (payload: Array<IPhraseCategory>): IFetchPhraseCategoryListSuccess => ({
  type: PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_SUCCESS,
  payload,
});

export const phrasebook_actionSetPhraseFormIsDirty = (payload: boolean): ISetPhraseFormIsDirty => ({
  type: PhrasebookActionTypes.SET_PHRASE_FORM_IS_DIRTY,
  payload,
});
