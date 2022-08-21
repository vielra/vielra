import { SagaIterator } from '@redux-saga/types';
import { spawn } from 'redux-saga/effects';

// Sagas
import { authSaga } from '@/modules/auth/redux';
import { phrasebookSaga } from '@/modules/phrasebook/redux';

// Root sagas.
export default function* rootSaga(): SagaIterator {
  yield spawn(authSaga);
  yield spawn(phrasebookSaga);
}
