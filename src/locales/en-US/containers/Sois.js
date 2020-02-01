/*
 * Sois Messages
 *
 * This contains all the text for the Sois container.
 */

export default {
  'app.containers.Sois.header': 'Analyst Services',
  'app.containers.Sois.emptySOIs':
    'You don\'t have any <a href="https://docs.munew.io/guide/concepts/soi" target="_blank">Analyst Services</a>. <a href="https://docs.munew.io/how-tos/how-to-register-an-soi-service">How to register an Analyst Service Service</a> will show you step by step to regiter an Analyst Service',
  'app.containers.Sois.registerNow': 'Register',
  'app.containers.Sois.drawerTitle': 'Register an Analyst Service',
  'app.containers.Sois.drawerTitleUpdate': 'Modify an Analyst Service',
  'app.containers.Sois.ping': 'Ping',
  'app.containers.Sois.pingDescription': 'Check an Analyst Service server status',
  'app.containers.Sois.pingSuccessful': 'Successfully check an Analyst Service server status',
  'app.containers.Sois.registerSOIDescription':
    'Analyst Service is the service you developed to extract data from collect intelligences, you can use any language to develop, only requirement is it can receive HTTP request.',
  'app.containers.Sois.globalId': 'Global ID',
  'app.containers.Sois.globalIdPlaceholder': 'Please enter an unique ID',
  'app.containers.Sois.globalIdExample': '0e9fe15e-f9a0-4279-9e65-87d2e480a66e',
  'app.containers.Sois.globalIdDescription':
    '<b>Global ID</b> is used to identify your Analyst Service, it should be global unique, <span style="color:#faad14">after it created you cannot change it</span>, and when you create intelligences for this Analyst Service, you need to pass this global id, so it knows this intelligences are for this Analyst Service. If you use nodejs, then you can use <a href="https://www.npmjs.com/package/uuid" target="_blank">uuid</a> to generate',
  'app.containers.Sois.soiName': 'Analyst Service Name',
  'app.containers.Sois.soiNamePlaceholder': 'Please enter your Analyst Service name',
  'app.containers.Sois.soiNameInvalid': 'Analyst Service name is invalid, please enter 3 to 50 characters',
  'app.containers.Sois.soiNameExample': 'Collect Weather Information',
  'app.containers.Sois.soiNameDescription':
    'Give a meaningful name to your Analyst Service, between 3 to 50 characters',
  'app.containers.Sois.baseURL': 'Base URL',
  'app.containers.Sois.baseURLEmptyError': 'Please enter a valid base URL',
  'app.containers.Sois.baseURLExample': 'http://localhost:3000',
  'app.containers.Sois.baseURLDescription':
    'Base url of your Analyst Service, make sure DIA Agent can access your Analyst Service server',
  'app.containers.Sois.status': 'Status',
  'app.containers.Sois.callbackSectionTitle': 'Callback',
  'app.containers.Sois.callbackDescription':
    'Callback means when DIA Agents collect data, where should they send data to. Normally this will send back to your Analyst Service and your Analyst Service extract useful information from received data',
  'app.containers.Sois.httpMethod': 'HTTP Method',
  'app.containers.Sois.httpMethodPlaceHolder': 'Please select your HTTP method',
  'app.containers.Sois.httpMethodDescription':
    'Please select your HTTP method. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Learn More.</a>',
  'app.containers.Sois.urlPath':
    'URL path of your callback. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#Path" target="_blank">Learn More.</a>',
  'app.containers.Sois.urlPathPlaceHolder': 'Please enter your URL path',
  'app.containers.Sois.healthSectionTitle': 'Health Check',
  'app.containers.Sois.healthDescription':
    'Health check API endpoint for your Analyst Service(e.g. HTTP <span class="ant-typography"><code>/health</code></span>) that returns the health of your Analyst Service. HTTP status is <span class="ant-typography"><code>2xx</code></span> means health, otherwise means unhealth. <a href="https://microservices.io/patterns/observability/health-check-api.html" target="_blank">Learn More.</a>',
  'app.containers.Sois.registerSOISuccessful': 'Register Analyst Service Successful',
  'app.containers.Sois.deleteSOIDescription': 'Are you sure delete this Analyst Service?',
  'app.containers.Sois.deleteSOISuccessful': 'Delete Analyst Service Successful',
};
