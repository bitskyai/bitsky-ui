import { call, put, takeLatest } from 'redux-saga/effects';
import { refreshSOIsFail, refreshSOIsSuccess } from './actions';

import { REFRESH_SOIS } from './constants';
import { getSOIs } from '../../apis/sois';

export function* refreshSOIs() {
  try {
    const sois = yield call(getSOIs);
    yield put(refreshSOIsSuccess(sois));
  } catch (err) {
    yield put(refreshSOIsFail(err));
  }
}

// Individual exports for testing
export default function* soisSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REFRESH_SOIS, refreshSOIs);
}
