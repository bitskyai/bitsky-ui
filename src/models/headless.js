import produce from 'immer';
import * as _ from 'lodash';
import { message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

import { sendToElectron } from '../utils/utils';

export default {
  namespace: 'headless',
  state: {
    data: {},
    error: undefined,
    modified: Date.now(),
  },
  effects: {
    *getConfig(payload, { call, put }) {
      try {
        yield put({
          type: 'loadingData',
          payload: {
            loadingData: true,
          },
        });
        const cbData = yield call(sendToElectron, 'headless/getConfig');
        console.log(`headless getConfig->cbData: `, cbData);
        if (_.get(cbData, 'status')) {
          yield put({
            type: 'getHeadlessConfigSuccess',
            payload: cbData,
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
    *updateConfig({ payload }, { call, put }) {
      try {
        yield call(sendToElectron, 'headless/updateConfig', payload);
        message.success(formatMessage({ id: 'app.common.messages.updatedConfigSuccessful' }));
      } catch (err) {
        message.success(formatMessage({ id: 'app.common.messages.updatedConfigFail' }));
        yield put({
          type: 'updateHeadlessConfigFail',
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
        const cbData = yield call(sendToElectron, 'headless/start');
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
        const cbData = yield call(sendToElectron, 'headless/stop');
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
    getHeadlessConfigSuccess(state, { payload }) {
      return produce(state, draft => {
        draft.loadingData = false;
        draft.data = payload.data;
        draft.options = payload.options;
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
    getProducerConfigurationSuccess(state, { payload }) {
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
  },
  subscriptions: {},
};
