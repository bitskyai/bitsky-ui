import produce from 'immer';
import {
  deleteIntelligencesForManagementAPI,
  getIntelligencesForManagementAPI,
  pauseIntelligencesForManagementAPI,
  resumeIntelligencesForManagementAPI,
} from '../apis/intelligencesOrHistory';

const IntelligencesModel = {
  namespace: 'intelligences',
  state: {},
  effects: {
    *refreshIntelligences(_, { call, put }) {
      try {
        const agents = yield call(getIntelligencesForManagementAPI);
        yield put({
          type: 'refreshIntelligencesSuccess',
          payload: agents,
        });
      } catch (err) {
        yield put({
          type: 'refreshIntelligencesFail',
          error: err,
        });
      }
    },
  },
  reducers: {
    refreshIntelligencesSuccess(state, action) {
      return produce(state, draft => {
        const data = state.data || [];
        draft.data = data.concat(action.intelligences);
        draft.total = action.total;
        draft.nextCursor = action.nextCursor;
        draft.previousCursor = action.previousCursor;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
    refreshIntelligencesFail(state, action) {
      return produce(state, draft => {
        draft.error = action.error;
        draft.modified = Date.now();
      });
    },
    resetIntelligences(state) {
      return produce(state, draft => {
        draft.data = [];
        draft.total = 0;
        draft.nextCursor = undefined;
        draft.previousCursor = undefined;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
  },
};

export default IntelligencesModel;
