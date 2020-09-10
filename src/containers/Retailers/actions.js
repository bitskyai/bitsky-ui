/*
 *
 * Retailers actions
 *
 */

import { REFRESH_RETAILERS, REFRESH_RETAILERS_FAIL, REFRESH_RETAILERS_SUCCESS } from './constants';

export function refreshRetailers() {
  return {
    type: REFRESH_RETAILERS,
  };
}

export function refreshRetailersSuccess(retailers) {
  return {
    type: REFRESH_RETAILERS_SUCCESS,
    payload: retailers,
  };
}

export function refreshRetailersFail(error) {
  return {
    type: REFRESH_RETAILERS_FAIL,
    error,
  };
}
