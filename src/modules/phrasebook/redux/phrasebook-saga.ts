import { SagaReturnType, put, call, takeLatest, SimpleEffect } from 'redux-saga/effects';
import { PhrasebookActionTypes } from './phrasebook-action-types.enum';

// Action creators
import {
  phrasebook_actionFetchPraseCategoryLoading,
  phrasebook_actionFetchPraseCategorySuccess,
  phrasebook_actionFetchPraseCategoryFailure,
  phrasebook_actionCreatePhraseLoading,
  phrasebook_actionCreatePhraseFailure,
  phrasebook_actionCreatePhraseSuccess,
  phrasebook_actionFetchPhraseListLoading,
  phrasebook_actionFetchPhraseListFailure,
  phrasebook_actionFetchPhraseListSuccess,
  phrasebook_actionDeletePhraseLoading,
  phrasebook_actionDeletePhraseFailure,
  phrasebook_actionDeletePhraseSuccess,
} from './phrasebook-actions';

import { toast_actionSetToast } from '@/modules/toast/redux';

// Api service
import { PhrasebookApiService } from '@/modules/phrasebook/services';
import { IRequestCreatePhrase } from '../interfaces';
import { ISagaEffectWithNavigateFunction } from '@/modules/common';
import { RoutesConstant } from '@/constants';

// Type definitions of return of result.
type ResponsePhraseCategoryList = SagaReturnType<typeof PhrasebookApiService.getPhraseCategories>;
type ResponsePhraseList = SagaReturnType<typeof PhrasebookApiService.getPhraseList>;
type ResponseCreatePhrase = SagaReturnType<typeof PhrasebookApiService.createPhrase>;
type ResponseDeletePhrase = SagaReturnType<typeof PhrasebookApiService.deletePhrase>;

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

// prettier-ignore
type CreatePhraseEffect = ISagaEffectWithNavigateFunction<typeof PhrasebookActionTypes.CREATE_PHRASE_REQUESTED, IRequestCreatePhrase>;

// prettier-ignore
function* saga_createPhrase(params: CreatePhraseEffect) {
  yield put(phrasebook_actionCreatePhraseLoading(true));
  try {
    const { status, data }: ResponseCreatePhrase = yield call(PhrasebookApiService.createPhrase, params.payload);
    if (status === 201) {
      yield put(phrasebook_actionCreatePhraseSuccess(data));

      if (typeof params.navigate === 'function') {
        params.navigate(RoutesConstant.RootStack.BottomTabStack, {
          screen: RoutesConstant.BottomTab.Phrasebook,
        });
      }
    } else {
      yield put(phrasebook_actionFetchPraseCategoryLoading(false));
      yield put(phrasebook_actionCreatePhraseFailure(true, 'Failed to create phrase'));
    }
  } catch (e) {
    yield put(phrasebook_actionFetchPraseCategoryLoading(false));
    yield put(phrasebook_actionCreatePhraseFailure(true, 'Failed to create phrase'));

    // dispatch toast
    yield put(
      toast_actionSetToast({
        show: true,
        placement: 'bottom',
        variant: 'filled',
        severity: 'error',
        messages: 'Failed to get phrase category',
      }),
    );
  }
}

type FetchPhraseListEffect = SimpleEffect<typeof PhrasebookActionTypes.FETCH_PHRASE_LIST_REQUESTED, string>;
function* saga_fetchPhraseList({ payload }: FetchPhraseListEffect) {
  yield put(phrasebook_actionFetchPhraseListLoading(true));
  try {
    const { status, data }: ResponsePhraseList = yield call(PhrasebookApiService.getPhraseList, payload);
    if (status === 200) {
      yield put(phrasebook_actionFetchPhraseListSuccess(data));
    }
  } catch (e) {
    yield put(phrasebook_actionFetchPhraseListLoading(false));
    yield put(phrasebook_actionFetchPhraseListFailure(true, 'Failed to get phrase list'));

    // dispatch toast
    yield put(
      toast_actionSetToast({
        show: true,
        placement: 'bottom',
        variant: 'filled',
        severity: 'error',
        messages: 'Failed to get phrase list',
      }),
    );
  }
}

type DeletePhaseEffect = SimpleEffect<typeof PhrasebookActionTypes.DELETE_PHRASE_REQUESTED, string[]>;
function* saga_deletePhrase({ payload }: DeletePhaseEffect) {
  yield put(phrasebook_actionDeletePhraseLoading(true));
  try {
    const { status }: ResponseDeletePhrase = yield call(PhrasebookApiService.deletePhrase, payload);
    if (status === 200) {
      yield put(phrasebook_actionDeletePhraseSuccess());
      // dispatch toast
      yield put(
        toast_actionSetToast({
          show: true,
          placement: 'bottom',
          variant: 'filled',
          severity: 'success',
          messages: 'Phrase deleted successful!',
        }),
      );
    }
  } catch (e) {
    yield put(phrasebook_actionDeletePhraseLoading(false));
    yield put(phrasebook_actionDeletePhraseFailure(true, 'Failed to delete phrase'));

    // dispatch toast
    yield put(
      toast_actionSetToast({
        show: true,
        placement: 'bottom',
        variant: 'filled',
        severity: 'error',
        messages: 'Failed to delete phrase',
      }),
    );
  }
}

export const phrasebookSaga = function* () {
  yield takeLatest(PhrasebookActionTypes.FETCH_PHRASE_CATEGORY_LIST_REQUESTED, saga_fetchPhraseCategoryList);
  yield takeLatest(PhrasebookActionTypes.CREATE_PHRASE_REQUESTED, saga_createPhrase);
  yield takeLatest(PhrasebookActionTypes.FETCH_PHRASE_LIST_REQUESTED, saga_fetchPhraseList);
  yield takeLatest(PhrasebookActionTypes.DELETE_PHRASE_REQUESTED, saga_deletePhrase);
};
