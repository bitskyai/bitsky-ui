import { call, put, select, takeLatest } from 'redux-saga/effects';

import _ from 'lodash';
import { UPDATE_PROFILE } from './constants';
import { updateProfile as updateProfileApi } from '../../apis/account';
import { updateProfileFailAction } from './actions';

export function* updateProfile(actionData) {
  try {
    const data = yield call(updateProfileApi, actionData.profile);
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
