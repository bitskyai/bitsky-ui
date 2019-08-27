import { getSOIs } from '../apis/sois';
import produce from 'immer';
const SoisModel = {
  namespace: 'sois',
  state: {},
  effects: {
    *refreshSois(_, { call, put }) {
      try {
        const agents = yield call(getSOIs);
        yield put({
          type: 'refreshSoisSuccess',
          payload: agents,
        });
      } catch (err) {
        yield put({
          type: 'refreshSoisFail',
          error: err
        });
      }
    },
  },
  reducers: {
    refreshSoisSuccess(state, action) {
      return produce(state, (draft)=>{
        draft.data = action.payload;
        draft.error = undefined;
        draft.modifiedAt = Date.now();
      });
    },
    refreshSoisFail(state, action) {
      return produce(state, (draft)=>{
        // draft.data = action.payload;
        draft.error = action.error;
        draft.modifiedAt = Date.now();
      });
    },
  },
};

export default SoisModel;
