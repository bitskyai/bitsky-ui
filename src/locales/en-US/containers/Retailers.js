/*
 * Retailers Messages
 *
 * This contains all the text for the Retailers container.
 */

export default {
  'app.containers.Retailers.header': 'Retailer Configurations',
  'app.containers.Retailers.emptyRetailers': `You don't have any <a href="https://docs.bitsky.ai/overview#retailer" target="_blank">Retailer Configurations</a>`,
  'app.containers.Retailers.drawerTitle': 'Create a Retailer Configuration',
  'app.containers.Retailers.drawerTitleUpdate': 'Modify this Retailer Configuration',
  'app.containers.Retailers.ping': 'Ping',
  'app.containers.Retailers.pingDescription': 'Check correspond Retailer health status',
  'app.containers.Retailers.pingSuccessful': 'Correspond <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> is running',
  'app.containers.Retailers.pingFail': 'Correspond <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> is down or cannot connect',
  'app.containers.Retailers.registerRetailerDescription':
    `<a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> is used to extract data from websites, and a <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> needs to connect to a Reatailer Configuation use <b>Global ID</b>
    before the <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> can be used. If you are using <a href="http://bitsky.ai/">BitSky Desktop Application</a>, it includes a <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a>(<b>Hello Retailer Service</b>) to help you getting start`,
  'app.containers.Retailers.globalIdPlaceholder': 'Please enter an unique ID',
  'app.containers.Retailers.globalIdDescription':
    'A <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> uses <b>Global ID</b> to connect to this Retailer Configuration, you need to configure <b>Global ID</b> to your <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a>. <b>Global ID</b> is global unique.',
  'app.containers.Retailers.retailerName': 'Name',
  'app.containers.Retailers.retailerNamePlaceholder': 'Please enter your Retailer Configuration name',
  'app.containers.Retailers.retailerNameInvalid':
    'Retailer Configuration name is invalid, please enter 1 to 100 characters',
  'app.containers.Retailers.retailerNameExample': 'Collect Weather Information',
  'app.containers.Retailers.retailerNameDescription':
    'Give a meaningful name to this Retailer Configuration, between 1 to 100 characters',
  'app.containers.Retailers.baseURL': 'Base URL',
  'app.containers.Retailers.baseURLEmptyError': 'Please enter a valid base URL',
  'app.containers.Retailers.baseURLExample': 'http://localhost:8081',
  'app.containers.Retailers.baseURLDescription':
    `Base URL of the <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> that will connect to this Retailer Configuration.
    If you don't have a <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> now, you can add a placeholder value(e.g. <code>http://localhost:8081</code>), and update to correct <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> base URL later `,
  'app.containers.Retailers.state': 'State',
  'app.containers.Retailers.callbackSectionTitle': 'Receive Tasks',
  'app.containers.Retailers.callbackDescription':
    `Receive <a href="https://docs.bitsky.ai/overview#task">Tasks</a> that are successfully executed by <a href="https://docs.bitsky.ai/overview#producer">Producers</a>.
     Those <a href="https://docs.bitsky.ai/overview#task">Tasks</a> contain the raw data(e.g. <code>HTML</code>) that you can extract useful information or create other <a href="https://docs.bitsky.ai/overview#task">Tasks</a> based on received raw data. You need to implement this RESTFul API in your Retailer`,
  'app.containers.Retailers.httpMethod': 'HTTP Method',
  'app.containers.Retailers.httpMethodPlaceHolder': 'Please select your HTTP method',
  'app.containers.Retailers.httpMethodDescription':
    'Please select your HTTP method. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Learn More.</a>',
  'app.containers.Retailers.urlPath':
    'Receive Tasks URL Path. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#Path" target="_blank">Learn More.</a>',
  'app.containers.Retailers.urlPathPlaceHolder': 'Please enter your URL path',
  'app.containers.Retailers.healthSectionTitle': 'Health Check',
  'app.containers.Retailers.healthDescription':
    'Health check API endpoint for your <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a>(e.g. HTTP <span class="ant-typography"><code>/health</code></span>) that returns the health status of your <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a>. HTTP status is <span class="ant-typography"><code>2xx</code></span> means health, otherwise means unhealth. <a href="https://microservices.io/patterns/observability/health-check-api.html" target="_blank">Learn More.</a>',
  'app.containers.Retailers.registerRetailerSuccessful': 'Register <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> Successful',
  'app.containers.Retailers.deleteRetailerDescription':
    'Are you sure delete this Retailer Configuration?',
  'app.containers.Retailers.deleteRetailerSuccessful': 'Delete <a href="https://docs.bitsky.ai/overview#retailer">Retailer</a> Successful',
};
