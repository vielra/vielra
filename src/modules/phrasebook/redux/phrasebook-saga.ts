import { SagaReturnType, put, call, takeLatest } from 'redux-saga/effects';
import { PhrasebookActionTypes } from './phrasebook-action-types.enum';

// Action creators
import {
  phrasebook_actionFetchPraseCategoryLoading,
  phrasebook_actionFetchPraseCategorySuccess,
  phrasebook_actionFetchPraseCategoryFailure,
} from './phrasebook-actions';

import { toast_actionSetToast } from '@/modules/toast/redux';

// Api service
import { PhrasebookApiService } from '@/modules/phrasebook/services';

// Type definitions of return of result.
type ResponsePhraseCategoryList = SagaReturnType<typeof PhrasebookApiService.getPhraseCategories>;

// prettier-ignore
// type FetchPhraseCategoryListEffect = SimpleEffect<typeof PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_REQUESTED, undefined>;
// prettier-ignore
function* saga_fetchPhraseCategoryList() {
  yield put(phrasebook_actionFetchPraseCategoryLoading(true));
  try {
    const { status, data }: ResponsePhraseCategoryList = yield call(PhrasebookApiService.getPhraseCategories);
    if (status === 200) {
      yield put(phrasebook_actionFetchPraseCategorySuccess(data));
    }
  } catch (e) {
    yield put(phrasebook_actionFetchPraseCategoryLoading(false));
    yield put(phrasebook_actionFetchPraseCategoryFailure(true, 'Failed to get phrase category'));

    // dispatch toast
    yield put(toast_actionSetToast({
      show: true,
      placement: 'bottom',
      variant: 'filled',
      severity:'error',
      messages: 'Failed to get phrase category',
    }));
  }
}

export const phrasebookSaga = function* () {
  yield takeLatest(PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_REQUESTED, saga_fetchPhraseCategoryList);
};
