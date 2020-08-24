/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

// import { defineMessages } from 'react-intl';

export const scope = 'app.global.messages';

export default {
  productName: {
    id: `${scope}.productName`,
    defaultMessage: 'BitSky',
  },
  slogan: {
    id: `${scope}.slogan`,
    defaultMessage: 'Make Life Productive',
  },
  serverTempDown: {
    id: `${scope}.serverTempDown`,
    description: 'this is error message for 500 error',
    defaultMessage: 'Oops, something went wrong. Please try again later.',
  },
  signInFail: {
    id: `${scope}.signInFail`,
    description: 'this is error message for 500 error',
    defaultMessage: 'Incorrect username or password.',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'The enter is not valid E-mail!',
  },
  typeName: {
    id: `${scope}.typeName`,
    defaultMessage: 'Please enter your name',
  },
  typeValidEmail: {
    id: `${scope}.typeValidEmail`,
    defaultMessage: 'Please enter your E-mail!',
  },
  typePassword: {
    id: `${scope}.typePassword`,
    defaultMessage: 'Please enter your password!',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Please confirm your password!',
  },
  passwordInvalid: {
    id: `${scope}.passwordInvalid`,
    defaultMessage: "Make sure it's at least 5 characters, and at most 20 characters",
  },
  passwordNotSame: {
    id: `${scope}.passwordNotSame`,
    defaultMessage: 'Two passwords that you enter is inconsistent!',
  },
  signUp: {
    id: `${scope}.signUp`,
    defaultMessage: 'SIGN UP',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'LOG IN',
  },
  nameInvalid: {
    id: `${scope}.nameInvalid`,
    defaultMessage: "Make sure it's at least 3 characters, and at most 20 characters",
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  globalId: {
    id: `${scope}.globalId`,
    defaultMessage: 'Global ID',
  },
  globalIdPlaceholder: {
    id: `${scope}.globalIdPlaceholder`,
    defaultMessage: 'Please enter an unique ID',
  },
  globalIdExample: {
    id: `${scope}.globalIdExample`,
    defaultMessage: '0e9fe15e-f9a0-4279-9e65-87d2e480a66e',
  },
  globalIdDescription: {
    id: `${scope}.globalIdDescription`,
    defaultMessage:
      '<b>Global ID</b> is used to identify your Producer, it should be global unique, <span style="color:#faad14">after it created you cannot change it</span>. If you use nodejs, then you can use <a href="https://www.npmjs.com/package/uuid" target="_blank">uuid</a> to generate',
  },
  state: {
    id: `${scope}.state`,
    defaultMessage: 'State',
  },
  action: {
    id: `${scope}.action`,
    defaultMessage: 'Action',
  },
  httpMethod: {
    id: `${scope}.httpMethod`,
    defaultMessage: 'HTTP Method',
  },
  httpMethodPlaceHolder: {
    id: `${scope}.httpMethodPlaceHolder`,
    defaultMessage: 'Please select your HTTP method',
  },
  httpMethodDescription: {
    id: `${scope}.httpMethodDescription`,
    defaultMessage:
      'Please select your HTTP method. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Learn More.</a>',
  },
  urlPath: {
    id: `${scope}.urlPath`,
    defaultMessage: 'URL Path',
  },
  urlPathPlaceHolder: {
    id: `${scope}.urlPathPlaceHolder`,
    defaultMessage: 'Please enter your URL path',
  },
  urlPathDescription: {
    id: `${scope}.urlPath`,
    defaultMessage:
      'URL path of your callback. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#Path" target="_blank">Learn More.</a>',
  },
  healthTitle: {
    id: `${scope}.healthSectionTitle`,
    defaultMessage: 'Health Check',
  },
  activate: {
    id: `${scope}.activate`,
    defaultMessage: 'Activate',
  },
  deactivate: {
    id: `${scope}.deactivate`,
    defaultMessage: 'Deactivate',
  },
  stateDraft: {
    id: `${scope}.stateDraft`,
    defaultMessage: 'Draft',
  },
  stateConfigured: {
    id: `${scope}.stateConfigured`,
    defaultMessage: 'Configured',
  },
  stateFinished: {
    id: `${scope}.stateFinished`,
    defaultMessage: 'Finished',
  },
  stateRunning: {
    id: `${scope}.stateRunning`,
    defaultMessage: 'Running',
  },
  stateFailed: {
    id: `${scope}.stateFailed`,
    defaultMessage: 'Failed',
  },
  statePaused: {
    id: `${scope}.statePaused`,
    defaultMessage: 'Paused',
  },
  stateTimeout: {
    id: `${scope}.stateTimeout`,
    defaultMessage: 'Timeout',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  reset: {
    id: `${scope}.reset`,
    defaultMessage: 'Reset',
  },
};
