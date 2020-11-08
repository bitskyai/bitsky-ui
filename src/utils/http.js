import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import { notification, Button, Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { formatMessage, formatHTMLMessage } from 'umi';
import HTTPError from './HTTPError';
import errorMessage from '../locales/en-US/error';
import { HTTP_HEADERS } from './constants';

export function getRedirectURL(response) {
  const redirectUrl = _.get(response, 'headers.["x-bitsky-location"]');
  const statusCode = _.get(response, 'status');
  if (statusCode === 204 && redirectUrl) {
    return redirectUrl;
  }
  return undefined;
}

function showErrorDetailModal(title, data) {
  Modal.error({
    title,
    content: <pre>{JSON.stringify(data, null, 2)}</pre>,
    width: '70%',
  });
}

function defaultErrorHandler(httpError) {
  const statusCode = httpError && httpError.status;
  // const message = httpError.message;
  let titleKey = 'app.error.default';
  let descriptionkey = 'app.error.default.description';
  if (statusCode) {
    if (errorMessage[`app.error.default.${statusCode}`]) {
      titleKey = `app.error.default.${statusCode}`;
      descriptionkey = `app.error.default.${statusCode}.description`;
    } else if (statusCode > 300 && statusCode < 500) {
      titleKey = 'app.error.default.4xx';
      descriptionkey = 'app.error.default.4xx.description';
    } else {
      titleKey = 'app.error.default.5xx';
      descriptionkey = 'app.error.default.5xx.description';
    }
  }

  const title = formatMessage({ id: titleKey });

  notification.error({
    duration: 0,
    message: title,
    description: (
      <div>
        {formatHTMLMessage({ id: descriptionkey })}
        <Button
          type="link"
          onClick={() => {
            notification.destroy();
            showErrorDetailModal(title, httpError.data);
          }}
        >
          {formatMessage({ id: 'app.error.showErrorDetail' })}
        </Button>
      </div>
    ),
  });
}

function http(config) {
  return new Promise((resolve, reject) => {
    const mergedConfig = config;
    const defaultHeader = {};
    defaultHeader[HTTP_HEADERS.X_REQUESTED_WITH] = 'bitsky-ui';
    defaultHeader[HTTP_HEADERS.X_JOB_ID] = uuidv4();
    mergedConfig.headers = _.merge({}, defaultHeader, config.headers || {});

    axios
      .request(mergedConfig)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        const error = new HTTPError(err);
        if (!mergedConfig.skipErrorHandler) {
          defaultErrorHandler(error);
        }
        reject(error);
      });
  });
}

export default http;
