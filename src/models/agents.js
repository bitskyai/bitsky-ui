import produce from 'immer';
import { getProducersAPI } from '../apis/producers';

const ProducersModel = {
  namespace: 'producers',
  state: {},
  effects: {
    *refreshProducers(_, { call, put }) {
      try {
        const producers = yield call(getProducersAPI);
        yield put({
          type: 'refreshProducersSuccess',
          payload: producers,
        });
      } catch (err) {
        yield put({
          type: 'refreshProducersFail',
          error: err,
        });
      }
    },
  },
  reducers: {
    refreshProducersSuccess(state, action) {
      return produce(state, draft => {
        draft.data = action.payload;
        draft.error = undefined;
        draft.modifiedAt = Date.now();
      });
    },
    refreshProducersFail(state, action) {
      return produce(state, draft => {
        // draft.data = action.payload;
        draft.error = action.error;
        draft.modifiedAt = Date.now();
      });
    },
  },
};

export default ProducersModel;
