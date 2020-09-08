import produce from 'immer';
import { getAgentsAPI } from '../apis/producers';

const AgentsModel = {
  namespace: 'agents',
  state: {},
  effects: {
    *refreshAgents(_, { call, put }) {
      try {
        const agents = yield call(getAgentsAPI);
        yield put({
          type: 'refreshAgentsSuccess',
          payload: agents,
        });
      } catch (err) {
        yield put({
          type: 'refreshAgentsFail',
          error: err,
        });
      }
    },
  },
  reducers: {
    refreshAgentsSuccess(state, action) {
      return produce(state, draft => {
        draft.data = action.payload;
        draft.error = undefined;
        draft.modifiedAt = Date.now();
      });
    },
    refreshAgentsFail(state, action) {
      return produce(state, draft => {
        // draft.data = action.payload;
        draft.error = action.error;
        draft.modifiedAt = Date.now();
      });
    },
  },
};

export default AgentsModel;
