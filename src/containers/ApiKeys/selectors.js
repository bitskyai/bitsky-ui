import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the apiKeys state domain
 */

const selectApiKeysDomain = state => state.apiKeys || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ApiKeys
 */

const makeSelectApiKeys = () =>
  createSelector(
    selectApiKeysDomain,
    substate => substate,
  );

export default makeSelectApiKeys;
export { selectApiKeysDomain };
