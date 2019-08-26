/*
 * Settings Messages
 *
 * This contains all the text for the Settings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Settings';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Settings',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
  },
  profileDescription: {
    id: `${scope}.profileDescription`,
    defaultMessage: 'Your email address is your identity on Munew and is used to log in',
  },
  emailAddress: {
    id: `${scope}.emailAddress`,
    defaultMessage: 'Email Address',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Display Name',
  },
  updateProfile: {
    id: `${scope}.updateProfile`,
    defaultMessage: 'Update Profile',
  },
  emailWasRegistered: {
    id: `${scope}.emailWasRegistered`,
    defaultMessage: 'This email already be registered, please change another one',
  },
  updateProfileSuccess: {
    id: `${scope}.updateProfileSuccess`,
    defaultMessage: 'Successfully update user profile',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  passwordDescription: {
    id: `${scope}.passwordDescription`,
    defaultMessage: 'Changing your password will also reset your Security Key',
  },
  currentPassword: {
    id: `${scope}.currentPassword`,
    defaultMessage: 'Current Password',
  },
  currentPasswordPlaceholder: {
    id: `${scope}.currentPasswordPlaceholder`,
    defaultMessage: 'Please enter your current password',
  },
  currentPasswordNotMatch: {
    id: `${scope}.currentPassword`,
    defaultMessage: "Entered Password is incorrect, please re-enter the correct password ",
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'New Password',
  },
  newPasswordPlaceholder: {
    id: `${scope}.newPasswordPlaceholder`,
    defaultMessage: 'Please enter a new password',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Confirm New Password',
  },
  confirmPasswordPlaceholder: {
    id: `${scope}.confirmPasswordPlaceholder`,
    defaultMessage: 'Please enter the password again',
  },
  updatePassword: {
    id: `${scope}.updatePassword`,
    defaultMessage: 'Update Password',
  },
  updatePasswordSuccess: {
    id: `${scope}.updatePasswordSuccess`,
    defaultMessage: 'Successfuly update password',
  },
  securityKey: {
    id: `${scope}.securityKey`,
    defaultMessage: 'Security Key',
  },
  securityKeyDescription: {
    id: `${scope}.securityKeyDescription`,
    defaultMessage: 'Security Key used for identify your intelligences, SOIs and Agents',
  },
  regenerateApiKey: {
    id: `${scope}.regenerateApiKey`,
    defaultMessage: 'Regenerate Security Key',
  }, 
  deleteAccount: {
    id: `${scope}.deleteAccount`,
    defaultMessage: 'Delete Account',
  }, 
  deleteAccountDescription: {
    id: `${scope}.deleteAccountDescription`,
    defaultMessage: 'Delete your account is irreversible. All data will be removed from Database',
  }, 
  deleteThisAccount: {
    id: `${scope}.deleteThisAccount`,
    defaultMessage: 'Delete this account',
  }, 
});
