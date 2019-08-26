/*
 * Sois Messages
 *
 * This contains all the text for the Sois container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Sois';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'SOIs',
  },
  emptySOIs: {
    id: `${scope}.emptySOIs`,
    defaultMessage: `You don't have any <a href="https://docs.munew.io/guide/concepts/soi" target="_blank">SOIs</a>`
  },
  registerNow: {
    id: `${scope}.registerNow`,
    defaultMessage: `Register`
  },
  drawerTitle: {
    id: `${scope}.drawerTitle`,
    defaultMessage: `Register a SOI`
  },
  registerSOIDescription: {
    id: `${scope}.registerSOIDescription`,
    defaultMessage: 'SOI is the service you developed to extract data from collect intelligences, you can use any language to develop, only requirement is it can receive HTTP request.'
  },
  globalId: {
    id: `${scope}.globalId`,
    defaultMessage: `Global ID`
  },
  globalIdPlaceholder: {
    id: `${scope}.globalIdPlaceholder`,
    defaultMessage: `Please enter an unique ID`
  },
  globalIdExample: {
    id: `${scope}.globalIdExample`,
    defaultMessage: `0e9fe15e-f9a0-4279-9e65-87d2e480a66e`
  },
  globalIdDescription: {
    id: `${scope}.globalIdDescription`,
    defaultMessage: `<b>Global ID</b> is used to identify your SOI, it should be global unique, <span style="color:#faad14">after it created you cannot change it</span>, and when you create intelligences for this SOI, you need to pass this global id, so it knows this intelligences are for this SOI. If you use nodejs, then you can use <a href="https://www.npmjs.com/package/uuid" target="_blank">uuid</a> to generate`
  },
  soiName: {
    id: `${scope}.soiName`,
    defaultMessage: `SOI Name`
  },
  soiNamePlaceholder: {
    id: `${scope}.soiNamePlaceholder`,
    defaultMessage: `Please enter your SOI's name`
  },
  soiNameInvalid: {
    id: `${scope}.soiNameInvalid`,
    defaultMessage: `SOI Name is invalid, please enter 3 to 50 characters`
  },
  soiNameExample: {
    id: `${scope}.soiNameExample`,
    defaultMessage: 'Collect Weather Information'
  },
  soiNameDescription: {
    id: `${scope}.soiNameDescription`,
    defaultMessage: 'Give a meaningful name to your SOI, between 3 to 50 characters'
  },
  baseURL: {
    id: `${scope}.baseURL`,
    defaultMessage: 'Base URL'
  },
  baseURLEmptyError: {
    id: `${scope}.baseURLEmptyError`,
    defaultMessage: 'Please enter a valid base URL'
  },
  baseURLExample: {
    id: `${scope}.baseURLExample`,
    defaultMessage: 'http://localhost:3000'
  },
  baseURLDescription: {
    id: `${scope}.baseURLDescription`,
    defaultMessage: 'Base url of your SOI, make sure DIA Agent can access your SOI server'
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: `Status`
  },
  callbackSectionTitle: {
    id: `${scope}.callbackSectionTitle`,
    defaultMessage: 'Callback'
  },
  callbackDescription: {
    id: `${scope}.callbackDescription`,
    defaultMessage: 'Callback means when DIA Agents collect data, where should they send data to. Normally this will send back to your SOI and your SOI extract useful information from received data'
  },
  httpMethod: {
    id: `${scope}.httpMethod`,
    defaultMessage: 'HTTP Method'
  },
  httpMethodPlaceHolder: {
    id: `${scope}.httpMethodPlaceHolder`,
    defaultMessage: 'Please select your HTTP method'
  },
  httpMethodDescription: {
    id: `${scope}.httpMethodDescription`,
    defaultMessage: 'Please select your HTTP method. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Learn More.</a>'
  },
  urlPath: {
    id: `${scope}.urlPath`,
    defaultMessage: 'URL Path'
  },
  urlPathPlaceHolder: {
    id: `${scope}.urlPathPlaceHolder`,
    defaultMessage: 'Please enter your URL path'
  },
  urlPathDescription: {
    id: `${scope}.urlPath`,
    defaultMessage: 'URL path of your callback. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#Path" target="_blank">Learn More.</a>'
  },
  healthTitle: {
    id: `${scope}.healthSectionTitle`,
    defaultMessage: 'Health Check'
  },
  healthDescription: {
    id: `${scope}.healthDescription`,
    defaultMessage: 'Health check API endpoint for your SOI(e.g. HTTP <span class="ant-typography"><code>/health</code></span>) that returns the health of your SOI. HTTP status is <span class="ant-typography"><code>2xx</code></span> means health, otherwise means unhealth. <a href="https://microservices.io/patterns/observability/health-check-api.html" target="_blank">Learn More.</a>'
  },
  registerSOISuccessful: {
    id: `${scope}.registerSOISuccessful`,
    defaultMessage: 'Register SOI Successful'
  },
  deleteSOIDescription: {
    id: `${scope}.deleteSOIDescription`,
    // defaultMessage: 'Are you sure delete this SOI? It will delete all intelligences that relative to this SOI and this SOI itself.'
    defaultMessage: 'Are you sure delete this SOI?'
  },
  deleteSOISuccessful: {
    id: `${scope}.deleteSOISuccessful`,
    defaultMessage: 'Delete SOI Successful'
  },
  
});
 