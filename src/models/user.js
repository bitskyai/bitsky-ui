const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {},
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;
