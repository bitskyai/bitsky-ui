/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

// import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default {
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Log in to your account',
  },
  or: {
    id: `${scope}.or`,
    defaultMessage: 'OR',
  },
  signInWithGithub: {
    id: `${scope}.signInWithGithub`,
    defaultMessage: 'Sign in with GitHub',
  },
  forgetPassword: {
    id: `${scope}.forgetPassword`,
    defaultMessage: 'Forget your password?',
  },
  newUser: {
    id: `${scope}.newUser`,
    defaultMessage: 'New to Munew ?',
  },
  signUp: {
    id: `${scope}.signUp`,
    defaultMessage: 'SIGN UP',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'LOG IN',
  },
  productName: {
    id: `${scope}.productName`,
    defaultMessage: 'Munew',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'The input is not valid E-mail!'
  },
  typeValidEmail: {
    id: `${scope}.typeValidEmail`,
    defaultMessage: 'Please input your E-mail!'
  },
  typePassword: {
    id: `${scope}.typePassword`,
    defaultMessage: 'Please input your password!'
  }
};
