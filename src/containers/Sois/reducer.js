import produce from 'immer';
import { REFRESH_SOIS_FAIL, REFRESH_SOIS_SUCCESS } from './constants';

/*
 *
 * Sois reducer
 *
 */

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const soisReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REFRESH_SOIS_SUCCESS:
        draft.data = action.sois;
        draft.error = undefined;
        draft.modifiedAt = Date.now();
        break;
      case REFRESH_SOIS_FAIL:
        draft.error = error;
        draft.modifiedAt = Date.now();
        break;
    }
  });

export default soisReducer;
