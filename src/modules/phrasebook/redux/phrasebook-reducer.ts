// Enum action types
import { PhrasebookActionTypes } from './phrasebook-action-types.enum';

// Union actions type
import { PhrasebookActions } from './phrasebook-actions';

// Interfaces
import { IPhrase, IPhraseCategory } from '../interfaces';

export interface PhrasebookState {
  phraseCategory_isLoading: boolean;
  phraseCategory_isError: boolean;
  phraseCategory_errorMessage?: Array<string> | string | null;
  phraseCategory_data: Array<IPhraseCategory>;

  phraseList_isLoading: boolean;
  phraseList_isError: boolean;
  phraseList_errorMessage?: Array<string> | string | null;
  phraseList_data: { [key: string]: Array<IPhrase> } | null;

  createPhrase_isLoading: boolean;
  createPhrase_isError: boolean;
  createPhrase_errorMessage?: Array<string> | string | null;
  createPhrase_data?: IPhrase | null;

  phrase_formIsDirty: boolean;

  deletePhrase_isLoading: boolean;
  deletePhrase_isError: boolean;
  deletePhrase_errorMessage?: Array<string> | string | null;
}

const initialState: PhrasebookState = {
  phraseCategory_isLoading: false,
  phraseCategory_isError: false,
  phraseCategory_errorMessage: undefined,
  phraseCategory_data: [],

  phraseList_isLoading: false,
  phraseList_isError: false,
  phraseList_errorMessage: undefined,
  phraseList_data: null,

  createPhrase_isLoading: false,
  createPhrase_isError: false,
  createPhrase_errorMessage: undefined,
  createPhrase_data: null,

  phrase_formIsDirty: false,

  deletePhrase_isLoading: false,
  deletePhrase_isError: false,
  deletePhrase_errorMessage: undefined,
};

// prettier-ignore
export const phrasebookReducer = (state: PhrasebookState = initialState,action: PhrasebookActions): PhrasebookState => {
  switch (action.type) {
    case PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_LOADING:
      return {
        ...state,
        phraseCategory_isLoading: action.payload,
      };
    case PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_FAILURE:
      return {
        ...state,
        phraseCategory_isError: action.payload.status,
        phraseCategory_errorMessage: action.payload.messages,
      };
    case PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        phraseCategory_isLoading: false,
        phraseCategory_isError: false,
        phraseCategory_data: action.payload,
      };

    case PhrasebookActionTypes.CREATE_PHRASE_LOADING:
      return {
        ...state,
        createPhrase_isLoading: action.payload,
      };
    case PhrasebookActionTypes.CREATE_PHRASE_FAILURE:
      return {
        ...state,
        createPhrase_isError: action.payload.status,
        createPhrase_errorMessage: action.payload.messages,
      };
    case PhrasebookActionTypes.CREATE_PHRASE_SUCCESS:
      return {
        ...state,
        createPhrase_isLoading: false,
        createPhrase_isError: false,
        createPhrase_data: action.payload,
      };

    case PhrasebookActionTypes.SET_PHRASE_FORM_IS_DIRTY:
      return {
        ...state,
        phrase_formIsDirty: action.payload,
      };


    case PhrasebookActionTypes.FETCH_PHRASE_LIST_LOADING:
      return {
        ...state,
        phraseList_isLoading: action.payload,
      };
    case PhrasebookActionTypes.FETCH_PHRASE_LIST_FAILURE:
      return {
        ...state,
        phraseList_isError: action.payload.status,
        phraseList_errorMessage: action.payload.messages,
      };
    case PhrasebookActionTypes.FETCH_PHRASE_LIST_SUCCESS:
      const phrasesWithKeyCategory = Array.isArray(action.payload) ? action.payload.reduce((obj, item) => {
        return {
          ...obj,
          [item.category.slug]: item.phrases,
        };
      }) : {
        [action.payload.category.slug]: action.payload.phrases ,
      };

      return {
        ...state,
        phraseList_isLoading: false,
        phraseList_isError: false,
        phraseList_data: {
          ...state.phraseList_data,
          ...phrasesWithKeyCategory as { [key: string]: Array<IPhrase> }, // That's ok!
        },
      };

    case PhrasebookActionTypes.DELETE_PHRASE_LOADING:
      return {
        ...state,
        deletePhrase_isLoading: action.payload,
      };
    case PhrasebookActionTypes.DELETE_PHRASE_FAILURE:
      return {
        ...state,
        deletePhrase_isError: action.payload.status,
        deletePhrase_errorMessage: action.payload.messages,
      };
    case PhrasebookActionTypes.DELETE_PHRASE_SUCCESS:
      return {
        ...state,
        deletePhrase_isLoading: false,
        deletePhrase_isError: false,

      };

    default:
      return state;
  }
};
