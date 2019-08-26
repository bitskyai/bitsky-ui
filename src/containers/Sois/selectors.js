import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sois state domain
 */

const selectSoisDomain = state => state.sois || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Sois
 */

const makeSelectSois = () =>
  createSelector(
    selectSoisDomain,
    substate => substate.data,
  );

export default makeSelectSois;
export { selectSoisDomain };
