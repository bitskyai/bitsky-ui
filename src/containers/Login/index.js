/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Form, Input, Icon, Button, Alert } from 'antd';
// import { Link } from 'react-router-dom';
import Link from 'umi/link';
import { Redirect, Route } from 'umi';
// import { Redirect } from 'react-router';

import CardPageCmp from '../../components/CardPageCmp';
import { darkBlueColor } from '../../styleVariables';

// import { useInjectSaga } from '@/utils/injectSaga';
// import { useInjectReducer } from '@/utils/injectReducer';
import http, { getRedirectURL } from '../../utils/http';
// import makeSelectLoginPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';
// import logoImg from '../../images/munew512.png';

class LoginForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    redirectUrl: undefined,
    sending: false,
    alertType: 'error',
    error: undefined,
    errorMsg: undefined,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ ...this.state, sending: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        http({
          url: '/apis/login',
          method: 'POST',
          data: values,
        })
          .then(response => {
            this.setState({ ...this.state, error: undefined, sending: false });
            const redirectUrl = getRedirectURL(response);
            if (redirectUrl) {
              // this.setState({
              //   redirectUrl,
              // });
              location.href = redirectUrl;
            }
          })
          .catch(error => {
            // console.log(error);
            // default set it to 401
            let err = {
              status: 500,
            };
            let msg = formatMessage({ id: 'app.common.messages.serverTempDown' });
            if (error && error.status) {
              err = {
                status: error.status,
              };
            }
            if (error && error.status) {
              if (error.status > 400 && error.status < 500) {
                msg = formatMessage({ id: 'app.common.messages.signInFail' });
              } else if (error.status >= 500) {
                msg = formatMessage({ id: 'app.common.messages.serverTempDown' });
              }
            }
            this.setState({ ...this.state, error: err, errorMsg: msg, sending: false });
          });
      } else {
        this.setState({ ...this.state, sending: false });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { autoCompleteResult } = this.state;
    // const { formatMessage } = this.props.intl;
    let hash = (location && location.hash) || '';
    let display = 'none';
    let errorMsg = this.state.errorMsg;
    let alertType = this.state.alertType;
    let errorDescription = '';

    if (this.state.redirectUrl) {
      return <Redirect to={this.state.redirectUrl} />;
    }

    if (this.state.error) {
      display = 'block';
    } else if (hash.search('existing') === 1) {
      display = 'block';
      alertType = 'info';
      errorMsg = formatMessage({ id: 'app.containers.LoginPage.existingAccount' });
      errorDescription = formatMessage({
        id: 'app.containers.LoginPage.existingAccountDescription',
      });
    }

    return (
      <div>
        <Alert
          message={errorMsg}
          description={errorDescription}
          type={alertType}
          style={{ marginBottom: '20px', display }}
        />
        <a href="/auth/github">
          <Button type="primary" htmlType="submit" size="large" block>
            <Icon type="github" style={{ verticalAlign: '1.5px' }} />
            {formatMessage({ id: 'app.containers.LoginPage.signInWithGithub' })}
          </Button>
        </a>
        <div style={{ color: 'grey', textAlign: 'center', padding: '15px 0' }}>
          {formatMessage({ id: 'app.containers.LoginPage.or' })}
        </div>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <Form.Item label={formatMessage({ id: 'app.common.messages.emailTitle' })}>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: formatMessage({ id: 'app.common.messages.invalidEmail' }),
                },
                {
                  required: true,
                  message: formatMessage({ id: 'app.common.messages.typeValidEmail' }),
                },
              ],
            })(
              <Input
                size="large"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={formatMessage({ id: 'app.common.messages.emailPlaceholder' })}
              />,
            )}
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'app.common.messages.passwordTitle' })}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'app.containers.LoginPage.typePassword' }),
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={formatMessage({ id: 'app.common.messages.passwordPlaceholder' })}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
              ghost
              style={{ color: darkBlueColor }}
              loading={this.state.sending}
            >
              {formatMessage({ id: 'app.containers.LoginPage.login' })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export function Login() {
  // useInjectReducer({ key: 'loginPage', reducer });
  // useInjectSaga({ key: 'loginPage', saga });
  // const { formatMessage } = intl;

  const WrappedSignupForm = Form.create({ name: 'login_form' })(LoginForm);

  const cardContent = (
    <div>
      <WrappedSignupForm />
      <div style={{ textAlign: 'center' }}>
        <Button type="link">
          <Link to="/forgot">
            <span style={{ textDecoration: 'underline' }}>
              {formatMessage({ id: 'app.containers.LoginPage.forgetPassword' })}
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
  const cardFooter = (
    <div>
      <span style={{ lineHeight: '60px' }}>
        {formatMessage({ id: 'app.containers.LoginPage.newUser' })}
      </span>

      <Button type="primary" ghost style={{ color: darkBlueColor, marginLeft: '20px' }}>
        <Link to="/signup">{formatMessage({ id: 'app.containers.LoginPage.signUp' })}</Link>
      </Button>
    </div>
  );

  // const cardTitle = formatMessage(messages.header);

  return (
    <CardPageCmp
      // cardTitle={cardTitle}
      cardContent={cardContent}
      cardFooter={cardFooter}
    />
  );
}

export default connect(({}) => ({}))(Login);

// export default connect({})(Login);

// Login.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   // loginPage: makeSelectLoginPage(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(Login);
