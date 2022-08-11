// Enum action types
import { PhrasebookActionTypes } from './phrasebook-action-types.enum';

// Union actions type
import { PhrasebookActions } from './phrasebook-actions';

// Interfaces
import { IPhraseCategory } from '../interfaces';

export interface PhrasebookState {
  phraseCategory_isLoading: boolean;
  phraseCategory_isError: boolean;
  phraseCategory_errorMessage?: Array<string> | string | null;
  phraseCategory_data: Array<IPhraseCategory>;

  phrase_formIsDirty: boolean;
}

const initialState: PhrasebookState = {
  phraseCategory_isLoading: false,
  phraseCategory_isError: false,
  phraseCategory_errorMessage: undefined,
  phraseCategory_data: [],

  phrase_formIsDirty: false,
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

    case PhrasebookActionTypes.SET_PHRASE_FORM_IS_DIRTY:
      return {
        ...state,
        phrase_formIsDirty: action.payload,
      };

    default:
      return state;
  }
};
