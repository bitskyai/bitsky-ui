import produce from 'immer';
import {
  deleteTasksForManagementAPI,
  getTasksOrHistoryForManagementAPI,
  pauseTasksForManagementAPI,
  resumeTasksForManagementAPI,
} from '../apis/tasksOrHistory';

const TasksModel = {
  namespace: 'tasks',
  state: {},
  effects: {
    *refreshTasks(_, { call, put }) {
      try {
        const producers = yield call(getTasksOrHistoryForManagementAPI);
        yield put({
          type: 'refreshTasksSuccess',
          payload: producers,
        });
      } catch (err) {
        yield put({
          type: 'refreshTasksFail',
          error: err,
        });
      }
    },
  },
  reducers: {
    refreshTasksSuccess(state, action) {
      return produce(state, draft => {
        const data = state.data || [];
        draft.data = data.concat(action.tasks);
        draft.total = action.total;
        draft.nextCursor = action.nextCursor;
        draft.previousCursor = action.previousCursor;
        draft.error = undefined;
        draft.modified = Date.now();
      });
    },
    refreshTasksFail(state, action) {
      return produce(state, draft => {
        draft.error = action.error;
        draft.modified = Date.now();
      });
    },
    resetTasks(state) {
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

export default TasksModel;
