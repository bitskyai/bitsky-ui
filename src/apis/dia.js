import * as _ from 'lodash';
import http from '../utils/http';
import { HTTP_HEADERS, BITSKY_SUPPLIER } from '../utils/constants';

export async function registerAgentAPI(agent) {
  try {
    const result = await http({
      url: '/apis/producers',
      method: 'POST',
      data: agent,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * check DIA health status
 * @param {string} method - HTTP request method
 * @param {string} url - HTTP request url
 * @return {object} -
 */
export async function checkEngineHealthAPI(method, url, skipErrorHandler) {
  try {
    const response = await http({
      url,
      method,
      skipErrorHandler,
    });

    const responsedWith = _.get(response, `headers[${HTTP_HEADERS.X_RESPONSED_WITH}]`);
    if (responsedWith !== BITSKY_SUPPLIER) {
      // it isn't return by engine
      return {
        health: false,
        status: response.status,
        engine: false,
      };
    }

    if (response.status >= 200 && response.status < 300) {
      // connected to engine and engine is running
      return {
        health: true,
        engine: true,
        status: response.status,
      };
    }

    return {
      health: false,
      engine: true,
      status: response.status,
    };
  } catch (err) {
    if (err.responsedWith !== BITSKY_SUPPLIER) {
      return {
        health: false,
        status: err.status,
        engine: false,
      };
    }

    return {
      health: false,
      status: err.status,
      engine: true,
    };
  }
}
