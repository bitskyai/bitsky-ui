/*
 *
 * Settings actions
 *
 */

import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESSFUL,
  UPDATE_PROFILE_FAIL,
} from './constants';

export function updateProfileAction(profile) {
  return {
    type: UPDATE_PROFILE,
    profile
  };
}

export function updateProfileFailAction(error) {
  return {
    type: UPDATE_PROFILE_FAIL,
    error
  };
}