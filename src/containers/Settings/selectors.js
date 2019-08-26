import { createSelector } from 'reselect';
import { initialState } from './reducer';
import create from 'antd/lib/icon/IconFont';

/**
 * Direct selector to the settings state domain
 */

const selectSettingsDomain = state => state.settings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Settings
 */

const makeSelectSettings = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate,
  );

const updateProfileError = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.updateProfileError,
  );

export default makeSelectSettings;
export { selectSettingsDomain, updateProfileError };
