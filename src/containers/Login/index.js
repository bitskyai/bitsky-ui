/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Form, Input, Icon, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
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
import messages from '../../locales/en-US/containers/Login';
import commonMessages from '../../locales/en-US/globalMessages';
// import logoImg from '../../images/munew512.png';

class LoginForm extends React.Component {
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
    this.setState({...this.state, sending: true});
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
            console.log(error);
            // default set it to 401
            let err = {
              status: 401,
            };
            let msg;
            if (error && error.response && error.response.status) {
              err = {
                status: error.response.status,
              };
            }
            if (error && error.response && error.response.status) {
              if (error.response.status > 400 && error.response.status < 500) {
                msg = formatMessage(commonMessages.signInFail);
              } else if (error.response.status >= 500) {
                msg = formatMessage(commonMessages.serverTempDown);
              }
            }
            this.setState({ ...this.state, error: err, errorMsg: msg, sending: false });
          });
      }else{
        this.setState({...this.state, sending: false});
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
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: formatMessage(messages.invalidEmail),
                },
                {
                  required: true,
                  message: formatMessage(messages.typeValidEmail),
                },
              ],
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder={formatMessage(messages.typeValidEmail)}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.typePassword),
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder={formatMessage(messages.typePassword)}
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
              loading={this.state.sending}>
              <FormattedMessage {...messages.login} />
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export function LoginPage() {
  // useInjectReducer({ key: 'loginPage', reducer });
  // useInjectSaga({ key: 'loginPage', saga });
  // const { formatMessage } = intl;

  const WrappedSignupForm = Form.create({ name: 'login_form' })(
    LoginForm,
  );

  const cardContent = (
    <div>
      <a href="/auth/github">
        <Button type="primary" htmlType="submit" size="large" block>
          <Icon type="github" style={{ verticalAlign: '1.5px' }} />
          <FormattedMessage {...messages.signInWithGithub} />
        </Button>
      </a>
      <div style={{ color: 'grey', textAlign: 'center', padding: '15px 0' }}>
        <FormattedMessage {...messages.or} />
      </div>
      <WrappedSignupForm />
      <div style={{ textAlign: 'center' }}>
        <Button type="link">
          <Link to="/forgot">
            <span style={{ textDecoration: 'underline' }}>
              <FormattedMessage {...messages.forgetPassword} />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
  const cardFooter = (
    <div>
      <span style={{ lineHeight: '60px' }}>
        <FormattedMessage {...messages.newUser} />
      </span>

      <Button
        type="primary"
        ghost
        style={{ color: darkBlueColor, marginLeft: '20px' }}
      >
        <Link to="/signup">
          <FormattedMessage {...messages.signUp} />
        </Link>
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

export default connect(({  }) => ({
}))(LoginPage);

// export default connect({})(LoginPage);

// LoginPage.propTypes = {
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

// export default compose(withConnect)(LoginPage);
