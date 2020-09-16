import * as _ from 'lodash';
import http from '../utils/http';
import { HTTP_HEADERS, BITSKY_SUPPLIER } from '../utils/constants';

export async function registerProducerAPI(producer) {
  try {
    const result = await http({
      url: '/apis/producers',
      method: 'POST',
      data: producer,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * check BitSky health status
 * @param {string} method - HTTP request method
 * @param {string} url - HTTP request url
 * @return {object} -
 */
export async function checkSupplierHealthAPI(method, url, skipErrorHandler) {
  try {
    const response = await http({
      url,
      method,
      skipErrorHandler,
    });

    const responsedWith = _.get(response, `headers[${HTTP_HEADERS.X_RESPONSED_WITH}]`);
    if (responsedWith !== BITSKY_SUPPLIER) {
      // it isn't return by supplier
      return {
        health: false,
        status: response.status,
        supplier: false,
      };
    }

    if (response.status >= 200 && response.status < 300) {
      // connected to supplier and supplier is running
      return {
        health: true,
        supplier: true,
        status: response.status,
      };
    }

    return {
      health: false,
      supplier: true,
      status: response.status,
    };
  } catch (err) {
    if (err.responsedWith !== BITSKY_SUPPLIER) {
      return {
        health: false,
        status: err.status,
        supplier: false,
      };
    }

    return {
      health: false,
      status: err.status,
      supplier: true,
    };
  }
}
