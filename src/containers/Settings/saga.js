import _ from 'lodash';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { updateProfile as updateProfileApi } from '../../apis/account';
import { UPDATE_PROFILE } from './constants';
import { updateProfileFailAction } from './actions';

export function* updateProfile(actionData) {
  try {
    let data = yield call(updateProfileApi, actionData.profile);
    return data;
  } catch (err) {
    yield put(updateProfileFailAction(err));
  }
}

// Individual exports for testing
export default function* settingsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(UPDATE_PROFILE, updateProfile);
}
