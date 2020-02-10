/**
 *
 * Asynchronously loads the component for Sois
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
