import { takeLatest, call, put } from 'redux-saga/effects';
import { REFRESH_SOIS } from './constants';
import { refreshSOIsSuccess, refreshSOIsFail } from './actions'
import { getSOIs } from '../../apis/sois';

export function* refreshSOIs(){
  try{
    const sois = yield call(getSOIs);
    yield put(refreshSOIsSuccess(sois));
  }catch(err){
    yield put(refreshSOIsFail(err));
  }
}

// Individual exports for testing
export default function* soisSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REFRESH_SOIS, refreshSOIs);
}
