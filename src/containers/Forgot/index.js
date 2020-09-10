/**
 *
 * Forgot
 *
 */

import { Alert, Button, Form, Icon, Input } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Redirect, Route } from 'umi';
import Link from 'umi/link';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'dva';
import styled from 'styled-components';
import http, { getRedirectURL } from '../../utils/http';

import CardPageCmp from '../../components/CardPageCmp';
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';
import commonMessages from '../../locales/en-US/globalMessages';
// import { connect } from 'react-redux';
// import { FormattedMessage, injectIntl } from 'react-intl';
import { darkBlueColor } from '../../styleVariables';
// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectResetPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import messages from '../../locales/en-US/containers/Forgot';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';

// import logoImg from '../../images/bitsky512.png';

class ForgotForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    redirectUrl: undefined,
    sending: false,
    sendSuccessful: false,
    error: undefined,
    errorMsg: undefined,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ ...this.state, sending: true, sendSuccessful: false });
    // const { formatMessage } = this.props.intl;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        http({
          url: '/apis/forgot',
          method: 'POST',
          data: values,
        })
          .then(response => {
            this.setState({ ...this.state, sending: false, sendSuccessful: true });
          })
          .catch(error => {
            let statusCode;
            let err = error;
            let msg = formatMessage(commonMessages.serverTempDown);
            if (error && error.response && error.response.status) {
              statusCode = error.response.status;
            }
            if (statusCode == 404) {
              err = {
                status: 404,
              };
              msg = formatMessage(messages.checkEmailAddress);
            } else if (statusCode == 422) {
              err = {
                status: 422,
              };
              msg = formatMessage(messages.invalidEmailAddress);
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
        this.setState({ ...this.state, sending: false, sendSuccessful: false });
      }
    });
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

    if (this.state.sendSuccessful) {
      return (
        <div>
          <Alert message={formatMessage(messages.sendSuccessfulMsg)} type="success" />
        </div>
      );
    }

    return (
      <div>
        <Alert
          message={this.state.errorMsg}
          type="error"
          style={{ marginBottom: '20px', display }}
        />
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label={formatMessage({ id: 'app.common.messages.emailTitle' })}>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'app.common.messages.typeValidEmail' }),
                },
                {
                  type: 'email',
                  message: formatMessage({ id: 'app.common.messages.invalidEmail' }),
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
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
              loading={this.state.sending}
            >
              <FormattedMessage {...messages.reset} />
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export function Forgot() {
  // useInjectReducer({ key: 'forgotPage', reducer });
  // useInjectSaga({ key: 'forgotPage', saga });
  // const { formatMessage } = intl;

  const WrappedSignupForm = Form.create({ name: 'forgot_form' })(
    // injectIntl(ForgotForm),
    ForgotForm,
  );

  const cardTitle = formatMessage(messages.header);

  const cardContent = (
    <div>
      <WrappedSignupForm />
    </div>
  );

  const cardFooter = (
    <div>
      <Link to="/signup">
        <Button type="primary" ghost style={{ color: darkBlueColor, marginRight: '20px' }}>
          {formatMessage({ id: 'app.common.messages.signUp' })}
        </Button>
      </Link>

      <span style={{ lineHeight: '60px' }}>{formatMessage({ id: 'app.common.messages.or' })}</span>

      <Link to="/login">
        <Button type="primary" ghost style={{ color: darkBlueColor, marginLeft: '20px' }}>
          {formatMessage({ id: 'app.common.messages.login' })}
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

export default connect(({}) => ({}))(Forgot);

// Forgot.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   resetPage: makeSelectResetPage(),
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

// export default compose(withConnect)(injectIntl(Forgot));
