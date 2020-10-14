import _ from 'lodash';
import { HTTP_HEADERS } from './constants';
/**
 * @class
 */
export class CustomError extends Error {}

/**
 * @class
 */
export default class HTTPError extends CustomError {
  /**
   * @constructor HTTPError
   * @param {object} error - Error get from server side
   * @param  {...any} args - Additional Parameters
   */
  constructor(error, ...args) {
    super(error, args);
    let data;
    let code;
    let status;
    let responsedWith;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      data = _.get(error, 'response.data');
      code = _.get(data, 'code');
      status = _.get(error, 'response.status');
      responsedWith = _.get(error, `response.headers[${HTTP_HEADERS.X_RESPONSED_WITH}]`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      data = {};
      status = 0;
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message);
    }
    this.message = error.message;
    this.code = code;
    this.data = data;
    this.status = status;
    this.responsedWith = responsedWith;
  }
}
