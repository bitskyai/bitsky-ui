/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import { FormattedMessage } from 'react-intl';
import React from 'react';
import messages from './messages';

export default function NotFound() {
  return (
    <h1>
      <FormattedMessage {...messages.header} />
    </h1>
  );
}
