/**
 *
 * Asynchronously loads the component for Intelligences
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
