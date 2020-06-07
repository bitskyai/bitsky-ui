import produce from 'immer';
import * as _ from 'lodash';
import { sendToElectron } from '../utils/utils';

export default {
  namespace: 'headless',
  state: {
    running: false,
    data: {},
    error: undefined,
    modified: Date.now(),
  },
  effects: {
    *getHeadlessConfig(payload, { call, put }) {
      try {
        yield put({
          type: 'loadingData',
        });
        const cbData = yield call(sendToElectron, 'getHeadlessConfig');
        if (_.get(cbData, 'status')) {
          yield put({
            type: 'getHeadlessConfigSuccess',
            payload: _.get(cbData, 'data'),
          });
        } else {
          yield put({
            type: 'getHeadlessConfigFail',
            error: _.get(cbData, 'error'),
          });
        }
      } catch (err) {
        yield put({
          type: 'getHeadlessConfigFail',
          error: err,
        });
      }
    },
  },
  reducers: {
    loadingData(state) {
      return produce(state, draft => {
        draft.loadingData = true;
      });
    },
    getHeadlessConfigSuccess(state, { payload }) {
      return produce(state, draft => {
        draft.loadingData = false;
        draft.data = payload;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
    getHeadlessConfigFail(state, { error }) {
      return produce(state, draft => {
        draft.loadingData = false;
        draft.error = error;
        draft.modified = Date.now();
      });
    },
    updateHeadlessConfigSuccess(state, action) {},
    updateHeadlessConfigFail(state, action) {},
    startSuccess(state, action) {},
    startFail(state, action) {},
    stopSuccess(state, action) {},
    stopFail(state, action) {},
  },
  subscriptions: {},
};
