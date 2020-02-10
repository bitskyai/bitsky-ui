import produce from 'immer';
import {
  REFRESH_INTELLIGENCES,
  REFRESH_INTELLIGENCES_FAIL,
  REFRESH_INTELLIGENCES_SUCCESS,
  RESET_INTELLIGENCES,
} from './constants';

/*
 *
 * Intelligences reducer
 *
 */

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const intelligencesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REFRESH_INTELLIGENCES_SUCCESS:
        const data = state.data || [];
        draft.data = data.concat(action.intelligences);
        draft.total = action.total;
        draft.nextCursor = action.nextCursor;
        draft.previousCursor = action.previousCursor;
        draft.error = undefined;
        draft.modified = Date.now();
        break;
      case REFRESH_INTELLIGENCES_FAIL:
        draft.error = action.error;
        draft.modified = Date.now();
        break;
      case RESET_INTELLIGENCES:
        draft.data = [];
        draft.total = 0;
        draft.nextCursor = undefined;
        draft.previousCursor = undefined;
        draft.error = undefined;
        draft.modified = Date.now();
        break;
    }
  });

export default intelligencesReducer;
