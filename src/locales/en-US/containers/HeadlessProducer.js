/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
export default {
  'app.containers.HeadlessProducer.subTitle': 'Launch a Chromium instance and execute your Tasks',
  'app.containers.HeadlessProducer.description':
    'Headless producer is based on <a href="https://pptr.dev/">Puppeteer</a>, and it is good for crawl data from Single Page Application.',
  'app.containers.HeadlessProducer.saveAndRestart': 'Save & Restart',
  'app.containers.HeadlessProducer.headless': 'Headless Mode',
  'app.containers.HeadlessProducer.headlessDescription':
    'Whether to run browser in <a href="https://developers.google.com/web/updates/2017/04/headless-chrome">headless mode</a>',
  'app.containers.HeadlessProducer.screenshots': 'Capture Screenshots',
  'app.containers.HeadlessProducer.screenshotsDescription':
    'Whether to captch screenshots. You can access it by view <span class="ant-typography"><code>http://localhost:Port</code></span>',
  'app.containers.HeadlessProducer.customFunctionTimeout': 'Custom Function Timeout',
  'app.containers.HeadlessProducer.customFunctionTimeoutInvalid':
    'Please enter a valid custom function timeout value',
  // eslint-disable-next-line quotes
  'app.containers.HeadlessProducer.userDataDirDescription': `<p class="munew-form-description-p">Path to a <a href="https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md">User Data Directory</a>. The user data directory contains profile data such as history, bookmarks, and cookies, as well as other per-installation local state. </p>
                                                          <p class="munew-form-description-p">After you set, then <b>Headless Producer</b> will have all those data, this means if you log in to <b>Gmail</b>, and session still valid, <b>Headless Producer</b> also will automatically login to <b>Gmail</b>.</p>
                                                          <p class="munew-form-description-p"><b>Important:</b>The <b>User Data Directory</b> should be the <b>User Data Directory</b> of the <b>Chrome</b>(<span class="ant-typography"><code>Browser Installation Path</code></span>) you selected</p>
                                                          <p class="munew-form-description-p">Example(Mac OSX): <span class="ant-typography"><code>/Users/Alice/Library/Application Support/Google/Chrome</code></span></p>`,
  'app.containers.HeadlessProducer.bundledChromium': 'Bundled Chromium',
  'app.containers.HeadlessProducer.browserInstallations': 'Browser Installation Path',
  // eslint-disable-next-line quotes
  'app.containers.HeadlessProducer.browserInstallationsDescription': `<p class="munew-form-description-p">Default use <span class="ant-typography"><code>Bundled Chromium</code></span>. You can choose an installed Chrome from dropdown.</p>
                                                                   <p class="munew-form-description-p"><b>Note:&nbsp;</b><a href="https://github.com/puppeteer/puppeteer/#q-why-doesnt-puppeteer-vxxx-work-with-chromium-vyyy">Puppeteer</a> is only guaranteed to work with the <span class="ant-typography"><code>Bundled Chromium</code></span></p>`,
  'app.containers.HeadlessProducer.customFunctionTimeoutExample': '60000',
  'app.containers.HeadlessProducer.customFunctionTimeoutDescription':
    'Timeout value for executing custom function, value is based on <span class="ant-typography"><code>ms</code></span>',
  'app.containers.HeadlessProducer.userDataDir': 'User Data Directory',
  'app.containers.HeadlessProducer.userDataDirExample':
    '/Users/Alice/Library/Application Support/Google/Chrome',
  // eslint-disable-next-line quotes
  'app.containers.HeadlessProducer.invalidDataDir': `User Data Directory doesn't exist, please type valid User Data Directory. This change will not be saved before you fix it`,
  // eslint-disable-next-line quotes
  'app.containers.HeadlessProducer.notAValidDataDir': `Seems not a valid User Data Directory. This change was saved, but maybe doesn't change the behavior`,
};
