import { SagaIterator } from '@redux-saga/types';
import { spawn } from 'redux-saga/effects';

// Sagas
import { authSaga } from '@/modules/auth/redux/auth-saga';

// Root sagas.
export default function* rootSaga(): SagaIterator {
  yield spawn(authSaga);
}
