// import { refreshAgents } from './actions';
import {
  Alert,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Typography,
  message,
  Icon,
} from 'antd';
import {
  FormattedHTMLMessage,
  formatHTMLMessage,
  formatMessage,
  FormattedMessage,
} from 'umi-plugin-react/locale';
import { connect } from 'dva';
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

// import { filterOutEmptyValue } from '../../utils/utils';
import { LOG_LEVEL } from '../../utils/constants';
import { getHeadlessConfig } from './actions';

const { Paragraph, Text } = Typography;

const FormDescription = styled(Paragraph)`
  padding: 5px 0;
  margin-bottom: 0 !important;
`;

const formItemStyle = { marginBottom: 0, paddingBottom: 0 };
const FormItemContainer = styled.div`
  margin-bottom: 5px;
`;

class HeadlessAgentForm extends React.Component {
  state = { sending: false, alertType: undefined, alertMessage: '' };

  componentDidMount() {}

  onFormChange() {
    clearTimeout(this.onFormChangeHandler);
    this.onFormChangeHandler = setTimeout(() => {
      // console.log(arguments);
      const values = this.props.form.getFieldsValue();
      console.log('onFormChange->values: ', values);
      this.dynamicValidateForm();
    }, 200);
  }

  render() {
    // let content = <HeadlessAgentSkeleton />;
    const { getFieldsValue, getFieldDecorator, isFieldsTouched } = this.props.form;
    const { alertType, alertMessage } = this.state;
    const headless = this.props.headless || {};
    const headlessConfig = headless.data;
    const primaryButtonTitle = formatMessage({ id: 'app.containers.HeadlessAgent.saveAndRestart' });

    if (isFieldsTouched()) {
      console.log('isFieldsTouched: ', isFieldsTouched());
    }

    return (
      <div>
        {alertType ? (
          <Alert
            type={alertType}
            message={alertMessage}
            showIcon
            style={{ marginBottom: '16px' }}
          />
        ) : (
          ''
        )}
        <Form className="agent-form" layout="vertical" style={{ paddingBottom: '35px' }}>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.common.messages.baseURL' })}
              style={formItemStyle}
            >
              {getFieldDecorator('MUNEW_BASE_URL', {
                initialValue: headlessConfig.MUNEW_BASE_URL || '',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.common.messages.baseURLInvalid' }),
                  },
                  {
                    min: 1,
                    max: 500,
                    message: formatMessage({ id: 'app.common.messages.baseURLInvalid' }),
                  },
                ],
              })(
                <Input placeholder={formatMessage({ id: 'app.common.messages.baseURLExample' })} />,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.common.messages.baseURLDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.common.messages.globalId' })}
              style={formItemStyle}
            >
              {getFieldDecorator('globalId', {
                initialValue: headlessConfig.GLOBAL_ID || '',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.common.messages.logLevelInvalid' }),
                  },
                  {
                    min: 1,
                    max: 200,
                    message: formatMessage({
                      id: 'app.common.messages.globalIdInvalid',
                    }),
                  },
                ],
              })(
                <Input
                  disabled={false}
                  placeholder={formatMessage({
                    id: 'app.common.messages.globalIdExample',
                  })}
                />,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.common.messages.globalIdDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.common.messages.port' })}
              style={formItemStyle}
            >
              {getFieldDecorator('PORT', {
                initialValue: headlessConfig.PORT || '',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.common.messages.logLevelInvalid' }),
                  },
                  {
                    min: 1,
                    max: 65535,
                    message: formatMessage({
                      id: 'app.common.messages.portInvalid',
                    }),
                  },
                ],
              })(
                <InputNumber
                  disabled={false}
                  placeholder={formatMessage({
                    id: 'app.common.messages.portExample',
                  })}
                />,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.common.messages.portDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.common.messages.agentHomeFolder' })}
              style={formItemStyle}
              hasFeedback={false}
            >
              {getFieldDecorator('AGENT_HOME', {
                initialValue: headlessConfig.AGENT_HOME,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'app.common.messages.agentHomeFolderInvalid',
                    }),
                  },
                ],
              })(
                <div>
                  <Text code>{headlessConfig.AGENT_HOME}</Text>
                  <Button
                    size="small"
                    title={formatMessage({
                      id: 'app.common.messages.agentHomeFolderPicker',
                    })}
                  >
                    <Icon type="folder-open" />
                  </Button>
                </div>,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.common.messages.agentHomeFolderDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.common.messages.logLevel' })}
              style={formItemStyle}
            >
              {getFieldDecorator('LOG_LEVEL', {
                initialValue: _.toLower(headlessConfig.LOG_LEVEL),
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.common.messages.logLevelInvalid' }),
                  },
                ],
              })(
                <Select
                  placeholder={formatMessage({
                    id: 'app.common.messages.logLevelExample',
                  })}
                  onChange={value => {
                    console.log('log level: ', value);
                    // this.onLogLevl(value);
                  }}
                >
                  <Select.Option value={LOG_LEVEL.debug}>
                    <FormattedHTMLMessage id="app.common.messages.logLevelDebug" />
                  </Select.Option>
                  <Select.Option value={LOG_LEVEL.info}>
                    <FormattedHTMLMessage id="app.common.messages.logLevelInfo" />
                  </Select.Option>
                  <Select.Option value={LOG_LEVEL.warn}>
                    <FormattedHTMLMessage id="app.common.messages.logLevelWarn" />
                  </Select.Option>
                  <Select.Option value={LOG_LEVEL.error}>
                    <FormattedHTMLMessage id="app.common.messages.logLevelError" />
                  </Select.Option>
                </Select>,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.common.messages.logLevelDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.containers.HeadlessAgent.headless' })}
              style={formItemStyle}
            >
              {getFieldDecorator('HEADLESS', {
                initialValue: headlessConfig.HEADLESS,
                valuePropName: 'checked',
              })(
                <Switch
                  checkedChildren={formatMessage({ id: 'app.common.messages.switchOn' })}
                  unCheckedChildren={formatMessage({
                    id: 'app.common.messages.switchOff',
                  })}
                />,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.containers.HeadlessAgent.headlessDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.containers.HeadlessAgent.screenshots' })}
              style={formItemStyle}
            >
              {getFieldDecorator('SCREENSHOT', {
                initialValue: headlessConfig.SCREENSHOT,
                valuePropName: 'checked',
              })(
                <Switch
                  checkedChildren={formatMessage({
                    id: 'app.common.messages.switchOn',
                  })}
                  unCheckedChildren={formatMessage({
                    id: 'app.common.messages.switchOff',
                  })}
                />,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.containers.HeadlessAgent.screenshotsDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.containers.HeadlessAgent.customFunctionTimeout' })}
              style={formItemStyle}
            >
              {getFieldDecorator('CUSTOM_FUNCTION_TIMEOUT', {
                initialValue: headlessConfig.CUSTOM_FUNCTION_TIMEOUT,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'app.containers.HeadlessAgent.customFunctionTimeoutInvalid',
                    }),
                  },
                  {
                    min: 0,
                    message: formatMessage({
                      id: 'app.containers.HeadlessAgent.customFunctionTimeoutInvalid',
                    }),
                  },
                ],
              })(
                <InputNumber
                  disabled={false}
                  placeholder={formatMessage({
                    id: 'app.containers.HeadlessAgent.customFunctionTimeoutExample',
                  })}
                />,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.containers.HeadlessAgent.customFunctionTimeoutDescription" />
            </FormDescription>
          </FormItemContainer>
        </Form>
      </div>
    );
  }
}

export default connect(({ headless }) => ({
  headless,
}))(Form.create()(HeadlessAgentForm));
