import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
/*
 *
 * ApiKeys reducer
 *
 */

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const apiKeysReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default apiKeysReducer;
