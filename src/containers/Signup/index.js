// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Alert, Button, Form, Icon, Input } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Redirect, Route } from 'umi';
// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';

import Link from 'umi/link';
/**
 *
 * Signup
 *
 */
import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'dva';
import CardPageCmp from '../../components/CardPageCmp';
import http, { getRedirectURL } from '../../utils/http';
import { darkBlueColor } from '../../styleVariables';
// import axios from 'axios';

// import makeSelectSignupPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';
// import logoImg from '../../images/bitsky512.png';

class SignupForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    redirectUrl: undefined,
    sending: false,
    error: undefined,
    errorMsg: undefined,
  };

  handleSubmit = e => {
    e.preventDefault();
    // const { formatMessage } = this.props.intl;
    this.setState({ ...this.state, sending: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        http({
          url: '/apis/signup',
          method: 'POST',
          data: values,
        })
          .then(response => {
            const redirectUrl = getRedirectURL(response);
            if (redirectUrl) {
              // this.setState({
              //   redirectUrl,
              // });
              location.href = redirectUrl;
            }
            this.setState({ ...this.state, sending: false, sendSuccessful: true });
          })
          .catch(error => {
            let statusCode;
            let err = error;
            let msg = formatMessage({ id: 'app.common.messages.serverTempDown' });
            if (error && error.status) {
              statusCode = error.status;
            }
            if (statusCode == 422) {
              // 00154220002 - this email already registered, so need to redirect user to login page
              if (error.code === '00154220002') {
                this.setState({
                  redirectUrl: '/login#existing',
                });
                return;
              }

              err = {
                status: 422,
              };
              msg = formatMessage({ id: 'app.containers.SignupPage.invalid' });
            }

            this.setState({
              ...this.state,
              error: err,
              errorMsg: msg,
              sending: false,
              sendSuccessful: false,
            });
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

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    // const { formatMessage } = this.props.intl;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'app.containers.SignupPage.passwordNotSame' }));
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { formatMessage } = this.props.intl;

    let display = 'none';

    if (this.state.redirectUrl) {
      return <Redirect to={this.state.redirectUrl} />;
    }

    if (this.state.error) {
      display = 'block';
    }

    return (
      <div>
        <Alert
          message={this.state.errorMsg}
          type="error"
          style={{ marginBottom: '20px', display }}
        />
        <Form layout="vertical" onSubmit={this.handleSubmit}>
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
                  message: formatMessage({ id: 'app.common.messages.typePassword' }),
                },
                {
                  min: 5,
                  max: 20,
                  message: formatMessage({ id: 'app.containers.SignupPage.passwordInvalid' }),
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
          <Form.Item label={formatMessage({ id: 'app.common.messages.confirmPasswordTitle' })}>
            {getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'app.common.messages.emptyConfirmPassword' }),
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={formatMessage({ id: 'app.common.messages.confirmPassword' })}
                onBlur={this.handleConfirmBlur}
              />,
            )}
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'app.common.messages.nameTitle' })}>
            {getFieldDecorator('profile.name', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'app.containers.SignupPage.typeName' }),
                  whitespace: true,
                },
                {
                  min: 1,
                  max: 100,
                  message: formatMessage({ id: 'app.containers.SignupPage.nameInvalid' }),
                },
              ],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={formatMessage({ id: 'app.common.messages.namePlaceholder' })}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              {formatMessage({ id: 'app.containers.SignupPage.signUp' })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export function Signup() {
  // useInjectReducer({ key: 'signupPage', reducer });
  // useInjectSaga({ key: 'signupPage', saga });
  // const { formatMessage } = intl;

  const WrappedSignupForm = Form.create({ name: 'signup_form' })(SignupForm);

  const cardTitle = formatMessage({ id: 'app.containers.SignupPage.header' });

  const cardContent = (
    <div>
      <WrappedSignupForm />
    </div>
  );
  const cardFooter = (
    <div>
      <span style={{ lineHeight: '60px' }}>
        {formatMessage({ id: 'app.containers.SignupPage.hasAccount' })}
      </span>

      <Link to="/login">
        <Button type="primary" ghost style={{ color: darkBlueColor, marginLeft: '20px' }}>
          {formatMessage({ id: 'app.containers.SignupPage.login' })}
        </Button>
      </Link>
    </div>
  );

  return (
    <CardPageCmp
      // cardTitle={cardTitle}
      cardContent={cardContent}
      cardFooter={cardFooter}
    />
  );
}

export default connect(({}) => ({}))(Signup);

// const mapStateToProps = createStructuredSelector({
//   signupPage: makeSelectSignupPage(),
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

// export default compose(withConnect)(injectIntl(Signup));
