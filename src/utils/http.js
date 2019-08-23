import axios from 'axios';
import _ from 'lodash';
import HTTPError from './HTTPError';

export function getRedirectURL(response) {
  const redirectUrl = _.get(response, 'headers.["x-munew-location"]');
  const statusCode = _.get(response, 'status');
  if (statusCode === 204 && redirectUrl) {
    return redirectUrl;
  }
  return undefined;
}

function http(config) {
  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        let error = new HTTPError(err);
        reject(error);
      });
  });
}

export default http;
