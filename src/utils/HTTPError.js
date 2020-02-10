import _ from 'lodash';

/**
 * @class
 */
export class CustomError extends Error {
  constructor(error, ...args) {
    super();
    const data = _.get(error, 'response.data');
    const code = _.get(data, 'code');
    this.code = code;
    this.data = data;
    // this.causedBy = error;
  }
}

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
    this.status = _.get(error, 'response.status');
  }
}
