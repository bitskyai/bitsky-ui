/*
 *
 * Intelligences actions
 *
 */

import {
  GET_HEADLESS_CONFIG_FAIL,
  GET_HEADLESS_CONFIG_SUCCESS,
  UPDATE_HEADLESS_CONFIG_FAIL,
  UPDATE_HEADLESS_CONFIG_SUCCESS,
  START_HEADLESS_FAIL,
  START_HEADLESS_SUCCESS,
  STOP_HEADLESS_FAIL,
  STOP_HEADLESS_SUCCESS,
} from './constants';

export function getHeadlessConfigSuccess(config) {
  return {
    type: GET_HEADLESS_CONFIG_SUCCESS,
    config,
  };
}

export function getHeadlessConfigFail(err) {
  return {
    type: GET_HEADLESS_CONFIG_FAIL,
    error: err,
  };
}

export function updateHeadlessConfigSuccess() {
  return {
    type: UPDATE_HEADLESS_CONFIG_SUCCESS,
  };
}

export function updateHeadlessConfigFail(err) {
  return {
    type: UPDATE_HEADLESS_CONFIG_FAIL,
    error: err,
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
