import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the intelligences state domain
 */

const selectIntelligencesDomain = state => state.intelligences || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Intelligences
 */

const makeSelectIntelligences = () =>
  createSelector(
    selectIntelligencesDomain,
    substate => substate,
  );

export default makeSelectIntelligences;
export { selectIntelligencesDomain };
