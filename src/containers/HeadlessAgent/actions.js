/*
 *
 * Intelligences actions
 *
 */

import {
  GET_HEADLESS_CONFIG,
  UPDATE_HEADLESS_CONFIG,
  START_HEADLESS_FAIL,
  START_HEADLESS_SUCCESS,
  STOP_HEADLESS_FAIL,
  STOP_HEADLESS_SUCCESS,
} from './constants';

export function getHeadlessConfig() {
  return {
    type: GET_HEADLESS_CONFIG,
  };
}

export function updateHeadlessConfig() {
  return {
    type: UPDATE_HEADLESS_CONFIG,
  };
}

export function startHeadlessSuccess() {
  return {
    type: START_HEADLESS_SUCCESS,
  };
}

export function startHeadlessFail(err) {
  return {
    type: START_HEADLESS_FAIL,
    error: err,
  };
}

export function stopHeadlessSuccess() {
  return {
    type: STOP_HEADLESS_SUCCESS,
  };
}

export function stopHeadlessFail(err) {
  return {
    type: STOP_HEADLESS_FAIL,
    error: err,
  };
}
