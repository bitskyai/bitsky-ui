/**
 *
 * Reset
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';

import { Form, Input, Icon, Button } from 'antd';
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';
import Link from 'umi/link';
import { Redirect, Route } from 'umi';

import CardPageCmp from '../../components/CardPageCmp';
import { darkBlueColor } from '../../styleVariables';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectResetPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import messages from '../../locales/en-US/containers/Reset';
// import commonMessages from '../../locales/en-US/globalMessages';
import http, { getRedirectURL } from '../../utils/http';
// import logoImg from '../../images/munew512.png';

class ResetForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    redirectUrl: undefined,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        http({
          url: `/apis/reset/${this.props.token}`,
          method: 'POST',
          data: values,
        })
          .then(response => {
            const redirectUrl = getRedirectURL(response);
            if (redirectUrl) {
              this.setState({
                redirectUrl,
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
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

    if (this.state.redirectUrl) {
      return <Redirect to={this.state.redirectUrl} />;
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label={formatMessage({ id: 'app.common.messages.passwordTitle' })}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'app.common.messages.typePassword' }),
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
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" block>
            <FormattedMessage {...messages.reset} />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export function Reset() {
  // useInjectReducer({ key: 'resetPage', reducer });
  // useInjectSaga({ key: 'resetPage', saga });
  // const { formatMessage } = intl;

  const WrappedSignupForm = Form.create({ name: 'reset_form' })(
    // injectIntl(ResetForm),
    ResetForm,
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

  return <CardPageCmp cardTitle={cardTitle} cardContent={cardContent} cardFooter={cardFooter} />;
}

export default connect(({}) => ({}))(Reset);

// Reset.propTypes = {
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

// export default compose(withConnect)(injectIntl(Reset));
