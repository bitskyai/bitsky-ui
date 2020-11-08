import produce from 'immer';
import * as _ from 'lodash';
import { message } from 'antd';
import { useIntl } from 'umi';

import { sendToElectron } from '../utils/utils';

export default {
  namespace: 'http',
  state: {
    data: {},
    error: undefined,
    modified: Date.now(),
  },
  effects: {
    *getConfig(payload, { call, put }) {
      try {
        console.log(`http.js->getConfig`);
        yield put({
          type: 'loadingData',
          payload: {
            loadingData: true,
          },
        });
        const cbData = yield call(sendToElectron, 'http/getConfig');
        console.log(`http.js->cbData: `, cbData);
        if (_.get(cbData, 'status')) {
          yield put({
            type: 'getConfigSuccess',
            payload: _.get(cbData, 'data'),
          });
        } else {
          yield put({
            type: 'getConfigFail',
            error: _.get(cbData, 'error'),
          });
        }
      } catch (err) {
        yield put({
          type: 'getConfigFail',
          error: err,
        });
      }
    },
    *updateConfig({ payload }, { call, put }) {
      try {
        yield call(sendToElectron, 'http/updateConfig', payload);
        message.success(formatMessage({ id: 'app.common.messages.updatedConfigSuccessful' }));
      } catch (err) {
        message.success(formatMessage({ id: 'app.common.messages.updatedConfigFail' }));
        yield put({
          type: 'http/updateConfigFail',
          error: err,
        });
      }
    },
    *start(payload, { call, put }) {
      try {
        yield put({
          type: 'loadingData',
          payload: {
            data: {
              STARTING: true,
              STOPPING: false,
            },
          },
        });
        const cbData = yield call(sendToElectron, 'http/start');
        if (!_.get(cbData, 'status')) {
          yield put({
            type: 'startFail',
            error: _.get(cbData, 'error'),
          });
        }
      } catch (err) {
        yield put({
          type: 'startFail',
          error: err,
        });
      }
    },
    *stop(payload, { call, put }) {
      try {
        yield put({
          type: 'loadingData',
          payload: {
            data: {
              STARTING: false,
              STOPPING: true,
            },
          },
        });
        const cbData = yield call(sendToElectron, 'http/stop');
        if (!_.get(cbData, 'status')) {
          yield put({
            type: 'stopFail',
            error: _.get(cbData, 'error'),
          });
        }
      } catch (err) {
        yield put({
          type: 'stopFail',
          error: err,
        });
      }
    },
  },
  reducers: {
    loadingData(state, { payload }) {
      return produce(state, draft => {
        draft.loadingData = payload.loadingData;
        if (payload.data) {
          draft.data = {};
          draft.data.STARTING = payload.data.STARTING;
          draft.data.STOPPING = payload.data.STOPPING;
        }
      });
    },
    getConfigSuccess(state, { payload }) {
      console.log(`getConfigSuccess: `, payload);
      return produce(state, draft => {
        draft.loadingData = false;
        draft.data = payload;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
    getConfigFail(state, { error }) {
      return produce(state, draft => {
        draft.loadingData = false;
        draft.error = error;
        draft.modified = Date.now();
      });
    },
    starting(state, { payload }) {
      return produce(state, draft => {
        draft.data = payload;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
    startSuccess(state, { payload }) {
      return produce(state, draft => {
        draft.data = payload;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
    startFail(state, { error }) {
      return produce(state, draft => {
        draft.loadingData = false;
        draft.error = error;
        draft.modified = Date.now();
      });
    },
    stopping(state, { payload }) {
      return produce(state, draft => {
        draft.data = payload;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
    stopSuccess(state, { payload }) {
      return produce(state, draft => {
        draft.data = payload;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
    stopFail(state, { error }) {
      return produce(state, draft => {
        draft.loadingData = false;
        draft.error = error;
        draft.modified = Date.now();
      });
    },
    getProducerConfigurationSuccess(state, { payload }) {
      console.log(`getProducerConfigurationSuccess: `, payload);
      return produce(state, draft => {
        draft.loadingData = false;
        draft.producer = payload;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
    getProducerConfigurationFail(state, { error }) {
      return produce(state, draft => {
        draft.loadingData = false;
        draft.producer = {};
        draft.error = error;
        draft.modified = Date.now();
      });
    },
  },
  subscriptions: {},
};
