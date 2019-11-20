import produce from 'immer';
import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESSFUL } from './constants';

/*
 *
 * Settings reducer
 *
 */

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_PROFILE_SUCCESSFUL:
        break;
      case UPDATE_PROFILE_FAIL:
        draft.updateProfileError = action.error;
        break;
    }
  });

export default settingsReducer;
