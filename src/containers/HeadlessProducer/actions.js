/*
 *
 * Tasks actions
 *
 */

import {
  GET_HEADLESS_CONFIG,
  UPDATE_HEADLESS_CONFIG,
  STARTING_HEADLESS,
  START_HEADLESS,
  STOPPING_HEADLESS,
  STOP_HEADLESS,
  START_HEADLESS_FAIL,
  START_HEADLESS_SUCCESS,
  STOP_HEADLESS_FAIL,
  STOP_HEADLESS_SUCCESS,
  GET_PRODUCER_CONFIGURATION_FAIL,
  GET_PRODUCER_CONFIGURATION_SUCCESS,
} from './constants';

export function getHeadlessConfig() {
  return {
    type: GET_HEADLESS_CONFIG,
  };
}

export function updateHeadlessConfig(payload) {
  return {
    type: UPDATE_HEADLESS_CONFIG,
    payload,
  };
}

export function startHeadless() {
  return {
    type: START_HEADLESS,
  };
}

export function startingHeadless(payload) {
  return {
    type: STARTING_HEADLESS,
    payload,
  };
}

export function stopHeadless() {
  return {
    type: STOP_HEADLESS,
  };
}

export function stoppingHeadless(payload) {
  return {
    type: STOPPING_HEADLESS,
    payload,
  };
}

export function startHeadlessSuccess(payload) {
  return {
    type: START_HEADLESS_SUCCESS,
    payload,
  };
}

export function startHeadlessFail(err) {
  return {
    type: START_HEADLESS_FAIL,
    error: err,
  };
}

export function getProducerConfigurationSuccess(payload) {
  return {
    type: GET_PRODUCER_CONFIGURATION_SUCCESS,
    payload,
  };
}

export function getProducerConfigurationFail(err) {
  return {
    type: GET_PRODUCER_CONFIGURATION_FAIL,
    error: err,
  };
}

export function stopHeadlessSuccess(payload) {
  return {
    type: STOP_HEADLESS_SUCCESS,
    payload,
  };
}

export function stopHeadlessFail(err) {
  return {
    type: STOP_HEADLESS_FAIL,
    error: err,
  };
}
