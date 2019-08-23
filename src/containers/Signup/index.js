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
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Form, Input, Icon, Button, Alert } from 'antd';
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';
import Link from 'umi/link';
import { Redirect, Route } from 'umi';
// import axios from 'axios';

import CardPageCmp from '../../components/CardPageCmp';
import { darkBlueColor } from '../../styleVariables';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
import http, { getRedirectURL } from '../../utils/http';
// import makeSelectSignupPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import messages from '../../locales/en-US/containers/Signup';
import commonMessages from '../../locales/en-US/globalMessages';
// import logoImg from '../../images/munew512.png';

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
            let statusCode,
              err = error,
              msg = formatMessage(commonMessages.serverTempDown);
            if (error && error.response && error.response.status) {
              statusCode = error.response.status;
            }
            if (statusCode == 422) {
              err = {
                status: 422,
              };
              msg = formatMessage(messages.invalid);
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
      callback(formatMessage(messages.passwordNotSame));
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: formatMessage(commonMessages.invalidEmail),
                },
                {
                  required: true,
                  message: formatMessage(commonMessages.typeValidEmail),
                },
              ],
            })(
              <Input
                size="large"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={formatMessage(commonMessages.typeValidEmail)}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: formatMessage(commonMessages.typePassword),
                },
                {
                  min: 5,
                  max: 20,
                  message: formatMessage(messages.passwordInvalid),
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
                placeholder={formatMessage(commonMessages.typePassword)}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: formatMessage(commonMessages.confirmPassword),
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
                placeholder={formatMessage(commonMessages.confirmPassword)}
                onBlur={this.handleConfirmBlur}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('profile.name', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.typeName),
                  whitespace: true,
                },
                {
                  min: 3,
                  max: 20,
                  message: formatMessage(messages.nameInvalid),
                },
              ],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={formatMessage(messages.typeName)}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              <FormattedMessage {...messages.signUp} />
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

  const cardTitle = formatMessage(messages.header);

  const cardContent = (
    <div>
      <WrappedSignupForm />
    </div>
  );
  const cardFooter = (
    <div>
      <span style={{ lineHeight: '60px' }}>
        <FormattedMessage {...messages.hasAccount} />
      </span>

      <Link to="/login">
        <Button type="primary" ghost style={{ color: darkBlueColor, marginLeft: '20px' }}>
          <FormattedMessage {...messages.login} />
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
