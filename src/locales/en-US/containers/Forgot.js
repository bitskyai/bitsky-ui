/*
 * ForgotPage Messages
 *
 * This contains all the text for the ForgotPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ForgotPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Reset password',
  },
  or: {
    id: `${scope}.or`,
    defaultMessage: 'or',
  },
  reset: {
    id: `${scope}.reset`,
    defaultMessage: 'RESET',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'New Password',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Confirm Password',
  },
  emailAddress: {
    id: `${scope}.emailAddress`,
    defaultMessage: 'Email address',
  },
  checkEmailAddress: {
    id: `${scope}.checkEmailAddress`,
    defaultMessage: 'Cannot find this email, please check whether you type correct email',
  },
  invalidEmailAddress: {
    id: `${scope}.invalidEmailAddress`,
    defaultMessage: 'Invalid email address',
  },
  sendSuccessfulMsg: {
    id: `${scope}.sendSuccessfulMsg`,
    defaultMessage:
      "Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.",
  },
});
