import { getSelf } from '@/apis/account';

const GlobalModel = {
  namespace: 'global',
  state: {
    initedApp: false, // indicate whether this application is inited
    collapsed: false,
    notices: [],
    landing: false, // current whether is in landing mode
  },
  effects: {
    *initApp(_, { call, put }) {
      // init application
      yield put({
        type: 'initingApp',
      });
      const currentUser = yield call(getSelf);
      yield put({
        type: 'user/saveCurrentUser',
        payload: currentUser,
      });

      yield put({
        type: 'initedApp',
      });
    },

    *initLanding(_, { call, put }) {
      // init landing application
      yield put({
        type: 'initedLanding',
      });
    },
  },
  reducers: {
    initingApp(state) {
      // update initedApp to false
      return { ...state, initedApp: false };
    },
    initedApp(state) {
      return { ...state, initedApp: true };
    },
    initedLanding(state) {
      return { ...state, initedApp: true, landing: true };
    },
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default GlobalModel;
