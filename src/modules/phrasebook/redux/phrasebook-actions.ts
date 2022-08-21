import { IPhrase, IPhrasebook, IPhraseCategory, IRequestCreatePhrase } from '../interfaces';
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

export interface ICreatePhraseRequested {
  type: PhrasebookActionTypes.CREATE_PHRASE_REQUESTED;
  payload: IRequestCreatePhrase;
  navigate: (routeName: string, params?: any) => void;
}
export interface ICreatePhraseLoading {
  type: PhrasebookActionTypes.CREATE_PHRASE_LOADING;
  payload: boolean;
}
export interface ICreatePhraseFailure {
  type: PhrasebookActionTypes.CREATE_PHRASE_FAILURE;
  payload: {
    status: boolean;
    messages?: Array<string> | string | null;
  };
}
export interface ICreatePhraseSuccess {
  type: PhrasebookActionTypes.CREATE_PHRASE_SUCCESS;
  payload: IPhrase;
}

export interface IFetchPhraseListRequested {
  type: PhrasebookActionTypes.FETCH_PHRASE_LIST_REQUESTED;
  payload?: string;
}
export interface IFetchPhraseListLoading {
  type: PhrasebookActionTypes.FETCH_PHRASE_LIST_LOADING;
  payload: boolean;
}
export interface IFetchPhraseListFailure {
  type: PhrasebookActionTypes.FETCH_PHRASE_LIST_FAILURE;
  payload: {
    status: boolean;
    messages?: Array<string> | string | null;
  };
}
export interface IFetchPhraseListSuccess {
  type: PhrasebookActionTypes.FETCH_PHRASE_LIST_SUCCESS;
  payload: IPhrasebook[] | IPhrasebook;
}

export interface IDeletePhraseRequested {
  type: PhrasebookActionTypes.DELETE_PHRASE_REQUESTED;
  payload: string[];
}
export interface IDeletePhraseLoading {
  type: PhrasebookActionTypes.DELETE_PHRASE_LOADING;
  payload: boolean;
}
export interface IDeletePhraseFailure {
  type: PhrasebookActionTypes.DELETE_PHRASE_FAILURE;
  payload: {
    status: boolean;
    messages?: Array<string> | string | null;
  };
}
export interface IDeletePhraseSuccess {
  type: PhrasebookActionTypes.DELETE_PHRASE_SUCCESS;
}

// --------------------------
// Union action types
// --------------------------
export type PhrasebookActions =
  | IFetchPhraseCategoryListRequested
  | IFetchPhraseCategoryListLoading
  | IFetchPhraseCategoryListFailure
  | IFetchPhraseCategoryListSuccess
  | ISetPhraseFormIsDirty
  | ICreatePhraseRequested
  | ICreatePhraseLoading
  | ICreatePhraseFailure
  | ICreatePhraseSuccess
  | IFetchPhraseListRequested
  | IFetchPhraseListLoading
  | IFetchPhraseListFailure
  | IFetchPhraseListSuccess
  | IDeletePhraseRequested
  | IDeletePhraseLoading
  | IDeletePhraseFailure
  | IDeletePhraseSuccess;

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

// prettier-ignore
export const phrasebook_actionCreatePhrase = (payload: IRequestCreatePhrase, navigate: (routeName: string, params?: any) => void): ICreatePhraseRequested => ({
  type: PhrasebookActionTypes.CREATE_PHRASE_REQUESTED,
  payload,
  navigate,
});

export const phrasebook_actionCreatePhraseLoading = (payload: boolean): ICreatePhraseLoading => ({
  type: PhrasebookActionTypes.CREATE_PHRASE_LOADING,
  payload,
});

// prettier-ignore
export const phrasebook_actionCreatePhraseFailure = (status: boolean, messages?: Array<string> | string | null): ICreatePhraseFailure => ({
  type: PhrasebookActionTypes.CREATE_PHRASE_FAILURE,
  payload: { status, messages },
});

// prettier-ignore
export const phrasebook_actionCreatePhraseSuccess = (payload: IPhrase): ICreatePhraseSuccess => ({
  type: PhrasebookActionTypes.CREATE_PHRASE_SUCCESS,
  payload,
});

export const phrasebook_actionFetchPhraseList = (payload?: string): IFetchPhraseListRequested => ({
  type: PhrasebookActionTypes.FETCH_PHRASE_LIST_REQUESTED,
  payload,
});

export const phrasebook_actionFetchPhraseListLoading = (payload: boolean): IFetchPhraseListLoading => ({
  type: PhrasebookActionTypes.FETCH_PHRASE_LIST_LOADING,
  payload,
});

// prettier-ignore
export const phrasebook_actionFetchPhraseListFailure = (status: boolean, messages?: Array<string> | string | null): IFetchPhraseListFailure => ({
  type: PhrasebookActionTypes.FETCH_PHRASE_LIST_FAILURE,
  payload: { status, messages },
});

// prettier-ignore
export const phrasebook_actionFetchPhraseListSuccess = (payload: IPhrasebook[] | IPhrasebook): IFetchPhraseListSuccess => ({
  type: PhrasebookActionTypes.FETCH_PHRASE_LIST_SUCCESS,
  payload,
});

export const phrasebook_actionDeletePhrase = (payload: string[]): IDeletePhraseRequested => ({
  type: PhrasebookActionTypes.DELETE_PHRASE_REQUESTED,
  payload,
});

export const phrasebook_actionDeletePhraseLoading = (payload: boolean): IDeletePhraseLoading => ({
  type: PhrasebookActionTypes.DELETE_PHRASE_LOADING,
  payload,
});

// prettier-ignore
export const phrasebook_actionDeletePhraseFailure = (status: boolean, messages?: Array<string> | string | null): IDeletePhraseFailure => ({
  type: PhrasebookActionTypes.DELETE_PHRASE_FAILURE,
  payload: { status, messages },
});

// prettier-ignore
export const phrasebook_actionDeletePhraseSuccess = (): IDeletePhraseSuccess => ({
  type: PhrasebookActionTypes.DELETE_PHRASE_SUCCESS,
});
