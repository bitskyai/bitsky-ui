/*
 *
 * Intelligences actions
 *
 */

import {
  GET_SERVICE_CONFIG,
  UPDATE_SERVICE_CONFIG,
  STARTING_SERVICE,
  START_SERVICE,
  STOPPING_SERVICE,
  STOP_SERVICE,
  START_SERVICE_FAIL,
  START_SERVICE_SUCCESS,
  STOP_SERVICE_FAIL,
  STOP_SERVICE_SUCCESS,
} from './constants';

export function getServiceConfig() {
  return {
    type: GET_SERVICE_CONFIG,
  };
}

export function updateServiceConfig(payload) {
  return {
    type: UPDATE_SERVICE_CONFIG,
    payload,
  };
}

export function startService() {
  return {
    type: START_SERVICE,
  };
}

export function startingService(payload) {
  return {
    type: STARTING_SERVICE,
    payload,
  };
}

export function stopService() {
  return {
    type: STOP_SERVICE,
  };
}

export function stoppingService(payload) {
  return {
    type: STOPPING_SERVICE,
    payload,
  };
}

export function startServiceSuccess(payload) {
  return {
    type: START_SERVICE_SUCCESS,
    payload,
  };
}

export function startServiceFail(err) {
  return {
    type: START_SERVICE_FAIL,
    error: err,
  };
}

export function stopServiceSuccess(payload) {
  return {
    type: STOP_SERVICE_SUCCESS,
    payload,
  };
}

export function stopServiceFail(err) {
  return {
    type: STOP_SERVICE_FAIL,
    error: err,
  };
}
