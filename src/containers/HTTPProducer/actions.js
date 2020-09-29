/*
 *
 * Tasks actions
 *
 */

import {
  GET_HTTP_CONFIG,
  UPDATE_HTTP_CONFIG,
  STARTING_HTTP,
  START_HTTP,
  STOPPING_HTTP,
  STOP_HTTP,
  START_HTTP_FAIL,
  START_HTTP_SUCCESS,
  STOP_HTTP_FAIL,
  STOP_HTTP_SUCCESS,
  GET_PRODUCER_CONFIGURATION_FAIL,
  GET_PRODUCER_CONFIGURATION_SUCCESS,
} from './constants';

export function getServiceConfig() {
  console.log('getServiceConfig->GET_HTTP_CONFIG: ', GET_HTTP_CONFIG);
  return {
    type: GET_HTTP_CONFIG,
  };
}

export function updateServiceConfig(payload) {
  return {
    type: UPDATE_HTTP_CONFIG,
    payload,
  };
}

export function startService() {
  return {
    type: START_HTTP,
  };
}

export function startingHTTP(payload) {
  return {
    type: STARTING_HTTP,
    payload,
  };
}

export function stopService() {
  return {
    type: STOP_HTTP,
  };
}

export function stoppingHTTP(payload) {
  return {
    type: STOPPING_HTTP,
    payload,
  };
}

export function startServiceSuccess(payload) {
  return {
    type: START_HTTP_SUCCESS,
    payload,
  };
}

export function startServiceFail(err) {
  return {
    type: START_HTTP_FAIL,
    error: err,
  };
}

export function stopServiceSuccess(payload) {
  return {
    type: STOP_HTTP_SUCCESS,
    payload,
  };
}

export function stopServiceFail(err) {
  return {
    type: STOP_HTTP_FAIL,
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
