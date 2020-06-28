/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
export default {
  'app.containers.HeadlessAgent.subTitle':
    'Launch a Chromium instance and execute your Tasks',
  'app.containers.HeadlessAgent.description':
    'Headless agent is based on <a href="https://pptr.dev/">Puppeteer</a>, and it is good for crawl data from Single Page Application.',
  'app.containers.HeadlessAgent.saveAndRestart': 'Save & Restart',
  'app.containers.HeadlessAgent.headless': 'Headless Mode',
  'app.containers.HeadlessAgent.headlessDescription':
    'Whether to run browser in <a href="https://developers.google.com/web/updates/2017/04/headless-chrome">headless mode</a>',
  'app.containers.HeadlessAgent.screenshots': 'Capture Screenshots',
  'app.containers.HeadlessAgent.screenshotsDescription':
    'Whether to captch screenshots. You can access it by view <span class="ant-typography"><code>http://localhost:Port</code></span>',
  'app.containers.HeadlessAgent.customFunctionTimeout': 'Custom Function Timeout',
  'app.containers.HeadlessAgent.customFunctionTimeoutInvalid':
    'Please enter a valid custom function timeout value',
  // eslint-disable-next-line quotes
  'app.containers.HeadlessAgent.userDataDirDescription': `<p class="munew-form-description-p">Path to a <a href="https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md">User Data Directory</a>. The user data directory contains profile data such as history, bookmarks, and cookies, as well as other per-installation local state. </p>
                                                          <p class="munew-form-description-p">After you set, then <b>Headless Agent</b> will have all those data, this means if you log in to <b>Gmail</b>, and session still valid, <b>Headless Agent</b> also will automatically login to <b>Gmail</b>.</p>
                                                          <p class="munew-form-description-p"><b>Important:</b>The <b>User Data Directory</b> should be the <b>User Data Directory</b> of the <b>Chrome</b>(<span class="ant-typography"><code>Browser Installation Path</code></span>) you selected</p>
                                                          <p class="munew-form-description-p">Example(Mac OSX): <span class="ant-typography"><code>/Users/Alice/Library/Application Support/Google/Chrome</code></span></p>`,
  'app.containers.HeadlessAgent.bundledChromium': 'Bundled Chromium',
  'app.containers.HeadlessAgent.browserInstallations': 'Browser Installation Path',
  // eslint-disable-next-line quotes
  'app.containers.HeadlessAgent.browserInstallationsDescription': `<p class="munew-form-description-p">Default use <span class="ant-typography"><code>Bundled Chromium</code></span>. You can choose an installed Chrome from dropdown.</p>
                                                                   <p class="munew-form-description-p"><b>Note:&nbsp;</b><a href="https://github.com/puppeteer/puppeteer/#q-why-doesnt-puppeteer-vxxx-work-with-chromium-vyyy">Puppeteer</a> is only guaranteed to work with the <span class="ant-typography"><code>Bundled Chromium</code></span></p>`,
  'app.containers.HeadlessAgent.customFunctionTimeoutExample': '60000',
  'app.containers.HeadlessAgent.customFunctionTimeoutDescription':
    'Timeout value for executing custom function, value is based on <span class="ant-typography"><code>ms</code></span>',
  'app.containers.HeadlessAgent.userDataDir': 'User Data Directory',
  'app.containers.HeadlessAgent.userDataDirExample': '/Users/Alice/Library/Application Support/Google/Chrome',
  // eslint-disable-next-line quotes
  'app.containers.HeadlessAgent.invalidDataDir': `User Data Directory doesn't exist, please type valid User Data Directory. This change will not be saved before you fix it`,
  // eslint-disable-next-line quotes
  'app.containers.HeadlessAgent.notAValidDataDir': `Seems not a valid User Data Directory. This change was saved, but maybe doesn't change the behavior`,
};
