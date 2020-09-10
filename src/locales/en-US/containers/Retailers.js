/*
 * Retailers Messages
 *
 * This contains all the text for the Retailers container.
 */

export default {
  'app.containers.Retailers.header': 'Retailer Configurations',
  'app.containers.Retailers.emptyRetailers':
    'You don\'t have any <a href="https://docs.bitsky.ai/overview#analyst-service" target="_blank">Retailer Configurations</a>. <a href="https://docs.bitsky.ai/how-tos/how-to-register-an-retailer-service">How to register an Retailer Service Service</a> will show you step by step to regiter an Retailer Service',
  'app.containers.Retailers.registerNow': 'Register',
  'app.containers.Retailers.drawerTitle': 'Register an Retailer Service',
  'app.containers.Retailers.drawerTitleUpdate': 'Modify an Retailer Service',
  'app.containers.Retailers.ping': 'Ping',
  'app.containers.Retailers.pingDescription': 'Check an Retailer Service server status',
  'app.containers.Retailers.pingSuccessful': 'Retailer Service server is running',
  'app.containers.Retailers.pingFail': 'Retailer Service server is down or cannot connect',
  'app.containers.Retailers.registerRetailerDescription':
    'Retailer Service is the service you developed to extract data from collect tasks, you can use any language to develop, only requirement is it can receive HTTP request.',
  'app.containers.Retailers.globalId': 'Global ID',
  'app.containers.Retailers.globalIdPlaceholder': 'Please enter an unique ID',
  'app.containers.Retailers.globalIdExample': '0e9fe15e-f9a0-4279-9e65-87d2e480a66e',
  'app.containers.Retailers.globalIdDescription':
    '<b>Global ID</b> is used to identify your Retailer Service, it should be global unique, <span style="color:#faad14">after it created you cannot change it</span>, and when you create tasks for this Retailer Service, you need to pass this global id, so it knows this tasks are for this Retailer Service. If you use nodejs, then you can use <a href="https://www.npmjs.com/package/uuid" target="_blank">uuid</a> to generate',
  'app.containers.Retailers.retailerName': 'Retailer Service Name',
  'app.containers.Retailers.retailerNamePlaceholder': 'Please enter your Retailer Service name',
  'app.containers.Retailers.retailerNameInvalid':
    'Retailer Service name is invalid, please enter 1 to 100 characters',
  'app.containers.Retailers.retailerNameExample': 'Collect Weather Information',
  'app.containers.Retailers.retailerNameDescription':
    'Give a meaningful name to your Retailer Service, between 1 to 100 characters',
  'app.containers.Retailers.baseURL': 'Base URL',
  'app.containers.Retailers.baseURLEmptyError': 'Please enter a valid base URL',
  'app.containers.Retailers.baseURLExample': 'http://localhost:3000',
  'app.containers.Retailers.baseURLDescription':
    'Base url of your Retailer Service, make sure DIA Producer can access your Retailer Service server',
  'app.containers.Retailers.state': 'State',
  'app.containers.Retailers.callbackSectionTitle': 'Callback',
  'app.containers.Retailers.callbackDescription':
    'Callback means when DIA Producers collect data, where should they send data to. Normally this will send back to your Retailer Service and your Retailer Service extract useful information from received data',
  'app.containers.Retailers.httpMethod': 'HTTP Method',
  'app.containers.Retailers.httpMethodPlaceHolder': 'Please select your HTTP method',
  'app.containers.Retailers.httpMethodDescription':
    'Please select your HTTP method. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Learn More.</a>',
  'app.containers.Retailers.urlPath':
    'URL path of your callback. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#Path" target="_blank">Learn More.</a>',
  'app.containers.Retailers.urlPathPlaceHolder': 'Please enter your URL path',
  'app.containers.Retailers.healthSectionTitle': 'Health Check',
  'app.containers.Retailers.healthDescription':
    'Health check API endpoint for your Retailer Service(e.g. HTTP <span class="ant-typography"><code>/health</code></span>) that returns the health of your Retailer Service. HTTP status is <span class="ant-typography"><code>2xx</code></span> means health, otherwise means unhealth. <a href="https://microservices.io/patterns/observability/health-check-api.html" target="_blank">Learn More.</a>',
  'app.containers.Retailers.registerRetailerSuccessful': 'Register Retailer Service Successful',
  'app.containers.Retailers.deleteRetailerDescription':
    'Are you sure delete this Retailer Service?',
  'app.containers.Retailers.deleteRetailerSuccessful': 'Delete Retailer Service Successful',
};
