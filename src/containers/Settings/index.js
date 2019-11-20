// import { FormattedMessage, injectIntl } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Modal,
  Row,
  Typography,
  message,
} from 'antd';
import { FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
// import DiaPageHeader from '../../components/Common';
// import { appInitedSelector, userSelector } from '../App/selectors';
// import { initApplicationSuccess } from '../App/actions';

// import { useInjectSaga } from 'utils/injectSaga';
// import injectSaga from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import injectReducer from 'utils/injectReducer';
// import makeSelectSettings from './selectors';
// import { updateProfileError } from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import PropTypes from 'prop-types';
import React from 'react';
/**
 *
 * Settings
 *
 */
import _ from 'lodash';
// import { connect } from 'react-redux';
import { connect } from 'dva';
import styled from 'styled-components';
import { ERROR_CODES } from './constants';
import { darkBlueColor, largeBodyFontSize, maxWidth } from '../../styleVariables';
import { changePassword, deleteThisAccount, updateProfile } from '../../apis/account';

const { Paragraph } = Typography;

const SectionTitle = styled.p`
  font-size: ${largeBodyFontSize};
  color: ${darkBlueColor};
  font-weight: bold;
`;

class ProfileForm extends React.Component {
  state = {
    sending: false,
    emailRegistered: false,
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = e => {
    e.preventDefault();
    // const { formatMessage } = this.props.intl;
    this.setState({ ...this.state, sending: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // this.props.dispatch(updateProfileAction(values));
        try {
          await updateProfile(values);
          this.setState({
            sending: false,
            emailRegistered: false,
          });
          const msg = formatMessage({ id: 'app.containers.Settings.updateProfileSuccess' });
          message.success(msg);
          // update global user information
          this.props.dispatch();
        } catch (err) {
          if (err.status == 400) {
            // email registered
            this.setState({
              ...this.state,
              sending: false,
              emailRegistered: true,
            });
          }
        }
      } else {
        this.setState({ ...this.state, sending: false });
      }
    });
  };

  // componentDidMount() {
  //   this.props.form.validateFields();
  //   this.props.form.setFieldsValue({
  //     name: this.props.name,
  //     email: this.props.email,
  //   });
  // }
  render() {
    const {
      getFieldDecorator,
      getFieldError,
      getFieldsError,
      isFieldsTouched,
      isFieldTouched,
    } = this.props.form;
    // const { formatMessage } = this.props.intl;

    // Only show error after a field is touched.
    let emailError = isFieldTouched('email') && getFieldError('email');
    const nameError = isFieldTouched('name') && getFieldError('name');

    if (this.state.emailRegistered) {
      emailError = formatMessage({ id: 'app.containers.Settings.emailWasRegistered' });
    }

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item
          label={formatMessage({ id: 'app.containers.Settings.emailAddress' })}
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
        >
          {getFieldDecorator('email', {
            initialValue: this.props.email,
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
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'app.common.messages.typeValidEmail' })}
            />,
          )}
        </Form.Item>
        <Form.Item
          label={formatMessage({ id: 'app.containers.Settings.name' })}
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('name', {
            initialValue: this.props.name,
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'app.common.messages.typeName' }),
                whitespace: true,
              },
              {
                min: 3,
                max: 20,
                message: formatMessage({ id: 'app.common.messages.nameInvalid' }),
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'app.common.messages.typeName' })}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            loading={this.state.sending}
            type="primary"
            htmlType="submit"
            disabled={!isFieldsTouched() || this.hasErrors(getFieldsError())}
          >
            <FormattedMessage id="app.containers.Settings.updateProfile" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

ProfileForm.propTypes = {
  // email: PropTypes.string,
  // name: PropTypes.string,
  // error: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

class PasswordForm extends React.Component {
  state = {
    confirmDirty: false,
    sending: false,
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = e => {
    e.preventDefault();
    // const { formatMessage } = this.props.intl;
    this.setState({ ...this.state, sending: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          await changePassword(values);
          this.setState({
            ...this.state,
            sending: false,
          });
          const msg = formatMessage({ id: 'app.containers.Settings.updatePasswordSuccess' });
          message.success(msg);
        } catch (err) {
          if (err.code == ERROR_CODES.passwordNotMatch) {
            this.props.form.setFields({
              currentPassword: {
                value: values.currentPassword,
                errors: [
                  new Error(
                    formatMessage({ id: 'app.containers.Settings.currentPasswordNotMatch' }),
                  ),
                ],
              },
            });
          } else {
            // default error handle
            const msg = formatMessage({ id: 'app.common.messages.serverTempDown' });
            message.error(msg);
          }

          this.setState({
            ...this.state,
            sending: false,
          });
        }
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
      callback(formatMessage({ id: 'app.common.messages.passwordNotSame' }));
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
    const {
      getFieldDecorator,
      getFieldError,
      getFieldsError,
      isFieldsTouched,
      isFieldTouched,
    } = this.props.form;
    // const { formatMessage } = this.props.intl;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item label={formatMessage({ id: 'app.containers.Settings.currentPassword' })}>
          {getFieldDecorator('currentPassword', {
            rules: [
              {
                required: true,
                message: formatMessage({
                  id: 'app.containers.Settings.currentPasswordPlaceholder',
                }),
              },
              {
                min: 5,
                max: 20,
                message: formatMessage({ id: 'app.common.messages.passwordInvalid' }),
              },
            ],
          })(
            <Input
              type="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({
                id: 'app.containers.Settings.currentPasswordPlaceholder',
              })}
            />,
          )}
        </Form.Item>
        <Divider />
        <Form.Item label={formatMessage({ id: 'app.containers.Settings.newPassword' })}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'app.containers.Settings.newPasswordPlaceholder' }),
              },
              {
                min: 5,
                max: 20,
                message: formatMessage({ id: 'app.common.messages.passwordInvalid' }),
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              type="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'app.containers.Settings.newPasswordPlaceholder' })}
            />,
          )}
        </Form.Item>
        <Form.Item label={formatMessage({ id: 'app.containers.Settings.confirmPassword' })}>
          {getFieldDecorator('confirmPassword', {
            rules: [
              {
                required: true,
                message: formatMessage({
                  id: 'app.containers.Settings.confirmPasswordPlaceholder',
                }),
              },
              {
                min: 5,
                max: 20,
                message: formatMessage({ id: 'app.common.messages.passwordInvalid' }),
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              type="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({
                id: 'app.containers.Settings.confirmPasswordPlaceholder',
              })}
              onBlur={this.handleConfirmBlur}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            loading={this.state.sending}
            type="primary"
            htmlType="submit"
            disabled={!isFieldsTouched() || this.hasErrors(getFieldsError())}
          >
            <FormattedMessage id="app.containers.Settings.updatePassword" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

class APIKeyForm extends React.Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      securityKey: this.props.securityKey,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { formatMessage } = this.props.intl;
    return (
      <Form layout="vertical">
        <Form.Item label={formatMessage({ id: 'app.containers.Settings.securityKey' })}>
          {getFieldDecorator('securityKey', {
            rules: [],
          })(
            <Input
              disabled
              prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'app.common.messages.typeName' })}
            />,
          )}
        </Form.Item>
        {/* <Form.Item>
          <Button type="primary">
            <FormattedMessage {...messages.regenerateApiKey} />
          </Button>
        </Form.Item> */}
      </Form>
    );
  }
}

export class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      confirmLoading: false,
    };
    // injectReducer('settings', reducer);
    // injectSaga('settings', saga);

    this.clickDeleteAccount.bind(this);
  }

  clickDeleteAccount(event) {
    event.preventDefault();
    this.setState({
      visible: true,
    });
  }

  handleOk = async () => {
    // const { formatMessage } = this.props.intl;
    try {
      this.setState({
        confirmLoading: true,
      });
      const redirectUrl = await deleteThisAccount();
      this.setState({
        confirmLoading: true,
        visible: false,
      });
      if (redirectUrl) {
        location.href = redirectUrl;
      }
    } catch (err) {
      const msg = formatMessage({ id: 'app.common.messages.serverTempDown' });
      message.error(msg);

      this.setState({
        confirmLoading: false,
        visible: false,
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { user } = this.props;
    // let intl = this.props.intl;
    const { dispatch } = this.props;
    // const { formatMessage } = intl;

    const { visible, confirmLoading, ModalText } = this.state;

    const WrappedProfileForm = Form.create({ name: 'profile_form' })(ProfileForm);
    const WrappedPasswordForm = Form.create({ name: 'password_form' })(PasswordForm);
    const WrappedAPIKeyForm = Form.create({ name: 'apikey_form' })(APIKeyForm);

    return (
      <Card>
        {/* <DiaPageHeader
          title={formatMessage({id:"app.containers.Settings.emailWasRegistered"}header)}
          style={{ color: darkBlueColor }}
        /> */}
        <div style={{ padding: '0 24px', maxWidth }}>
          <Row>
            <Col span={12}>
              <SectionTitle>
                <FormattedMessage id="app.containers.Settings.securityKey" />
              </SectionTitle>
              <Paragraph>
                <FormattedMessage id="app.containers.Settings.securityKeyDescription" />
              </Paragraph>
            </Col>
            <Col span={12}>
              <WrappedAPIKeyForm securityKey={user.securityKey} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <SectionTitle>
                <FormattedMessage id="app.containers.Settings.profile" />
              </SectionTitle>
              <Paragraph>
                <FormattedMessage id="app.containers.Settings.profileDescription" />
              </Paragraph>
            </Col>
            <Col span={12}>
              <WrappedProfileForm
                email={_.get(user, 'email')}
                name={_.get(user, 'profile.name')}
                // error={updateProfileError}
                dispatch={dispatch}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <SectionTitle>
                <FormattedMessage id="app.containers.Settings.password" />
              </SectionTitle>
              <Paragraph>
                <FormattedMessage id="app.containers.Settings.passwordDescription" />
              </Paragraph>
            </Col>
            <Col span={12}>
              <WrappedPasswordForm />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <SectionTitle>
                <FormattedMessage id="app.containers.Settings.deleteAccount" />
              </SectionTitle>
              <Paragraph>
                <FormattedMessage id="app.containers.Settings.deleteAccountDescription" />
              </Paragraph>
            </Col>
            <Col span={12}>
              <Button type="danger" onClick={this.clickDeleteAccount.bind(this)}>
                <FormattedMessage id="app.containers.Settings.deleteThisAccount" />
              </Button>
            </Col>
          </Row>
          <Modal
            title={formatMessage({ id: 'app.containers.Settings.deleteAccount' })}
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>
              <FormattedMessage id="app.containers.Settings.deleteAccountDescription" />
            </p>
          </Modal>
        </div>
      </Card>
    );
  }
}

export default connect(({ user }) => ({
  user: user && user.currentUser,
}))(Settings);

// Settings.propTypes = {
//   inited: PropTypes.bool,
//   user: PropTypes.object,
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   user: userSelector(),
//   inited: appInitedSelector(),
//   settings: makeSelectSettings(),
//   updateProfileError: updateProfileError(),
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

// export default compose(withConnect)(injectIntl(Settings));
