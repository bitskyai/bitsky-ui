import produce from 'immer';
import { getRetailers } from '../apis/retailers';

const RetailersModel = {
  namespace: 'retailers',
  state: {},
  effects: {
    *refreshRetailers(_, { call, put }) {
      try {
        const agents = yield call(getRetailers);
        yield put({
          type: 'refreshRetailersSuccess',
          payload: agents,
        });
      } catch (err) {
        yield put({
          type: 'refreshRetailersFail',
          error: err,
        });
      }
    },
  },
  reducers: {
    refreshRetailersSuccess(state, action) {
      return produce(state, draft => {
        draft.data = action.payload;
        draft.error = undefined;
        draft.modifiedAt = Date.now();
      });
    },
    refreshRetailersFail(state, action) {
      return produce(state, draft => {
        // draft.data = action.payload;
        draft.error = action.error;
        draft.modifiedAt = Date.now();
      });
    },
  },
};

export default RetailersModel;
