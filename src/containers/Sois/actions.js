/*
 *
 * Sois actions
 *
 */

import { REFRESH_SOIS, REFRESH_SOIS_FAIL, REFRESH_SOIS_SUCCESS } from './constants';

export function refreshSOIs() {
  return {
    type: REFRESH_SOIS,
  };
}

export function refreshSOIsSuccess(sois) {
  return {
    type: REFRESH_SOIS_SUCCESS,
    payload: sois,
  };
}

export function refreshSOIsFail(error) {
  return {
    type: REFRESH_SOIS_FAIL,
    error,
  };
}
