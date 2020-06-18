// import { refreshAgents } from './actions';
import {
  Alert,
  // Button,
  Form,
  Input,
  InputNumber,
  Select,
  // Switch,
  Typography,
  // message,
  // Icon,
} from 'antd';
import { FormattedHTMLMessage, formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

// import { filterOutEmptyValue } from '../../utils/utils';
import { LOG_LEVEL, ENGINE_HEALTH_METHOD, ENGINE_HEALTH_PATH } from '../../utils/constants';
import { updateServiceConfig } from './actions';
import { getAgentAPI } from '../../apis/agents';
import { checkEngineHealthAPI } from '../../apis/dia';
import HTTPError from '../../utils/HTTPError';

const { Paragraph } = Typography;

const FormDescription = styled(Paragraph)`
  padding: 5px 0;
  margin-bottom: 0 !important;
`;

const formItemStyle = { marginBottom: 0, paddingBottom: 0 };
const FormItemContainer = styled.div`
  margin-bottom: 5px;
`;

class ServiceAgentForm extends React.Component {
  constructor() {
    super();

    // Set default state
    this.state = {
      alertType: undefined,
      // validating: true,
      alertMessage: "This agent isn't fully configured",
    };

    this.saveConfiguration.bind(this);
    this.onValidateForm.bind(this);

    // setTimeout handler
    this.validateFormHandler = undefined;
    this.saveConfigurationHanlder = undefined;
  }

  componentDidMount() {
    setTimeout(() => {
      this.onValidateForm();
    }, 1000);
  }

  async onValidateForm() {
    clearTimeout(this.validateFormHandler);
    this.validateFormHandler = setTimeout(async () => {
      const state = {
        validating: true,
      };
      this.setState(state);
      this.props.form.validateFields(['MUNEW_BASE_URL', 'GLOBAL_ID'], async (errs, values) => {
        if (!values.MUNEW_BASE_URL || !values.GLOBAL_ID) {
          state.alertType = 'warning';
          state.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.http.unregisterAgentDescription" />
          );
        }

        // Set UI Side Validation first
        if (errs && errs.MUNEW_BASE_URL) {
          state.baseURLValidateStatus = 'error';
        } else {
          state.baseURLValidateStatus = '';
        }
        if (errs && errs.GLOBAL_ID) {
          state.agentGlobalIdValidateStatus = 'error';
        } else {
          state.agentGlobalIdValidateStatus = '';
        }

        try {
          if ((!errs || !errs.MUNEW_BASE_URL) && values.MUNEW_BASE_URL) {
            this.setState({
              baseURLValidateStatus: 'validating',
            });
            // Do server side validation
            const baseURLValidateResult = await this.validateBaseURL(values.MUNEW_BASE_URL);
            state.baseURLValidateStatus = baseURLValidateResult.status || 'error';
            if (baseURLValidateResult.alertType) {
              state.alertType = baseURLValidateResult.alertType;
            }
            if (baseURLValidateResult.alertMessage) {
              state.alertMessage = baseURLValidateResult.alertMessage;
            }
            // if baseURL isn't valid, then don't need to continue
            // validate security key and global id
            if (baseURLValidateResult.status !== 'success') {
              state.validating = false;
              this.overWriteState(state);
              return;
            }
          }

          if ((!errs || !errs.GLOBAL_ID) && values.MUNEW_BASE_URL && values.GLOBAL_ID) {
            this.setState({
              agentGlobalIdValidateStatus: 'validating',
            });
            const service = this.props.service || {};
            const serviceConfig = service.data;
            // Do server side validation
            const agentValidateResult = await this.getAgentConfiguration(
              values.MUNEW_BASE_URL,
              values.GLOBAL_ID,
              serviceConfig.AGENT_SERIAL_ID,
            );
            state.agentGlobalIdValidateStatus = agentValidateResult.status || 'error';

            if (agentValidateResult.alertType) {
              state.alertType = agentValidateResult.alertType;
            }
            if (agentValidateResult.alertMessage) {
              state.alertMessage = agentValidateResult.alertMessage;
            }
            if (
              _.toUpper(_.get(agentValidateResult, 'data.type')) &&
              _.toUpper(_.get(agentValidateResult, 'data.type')) !==
                _.toUpper(_.get(this.props, 'service.data.TYPE'))
            ) {
              state.agentGlobalIdValidateStatus = 'error';
              state.alertType = 'error';
              state.alertMessage = (
                <FormattedHTMLMessage id="app.common.messages.http.unmatchedAgentType" />
              );
            }
          }
          state.validating = false;
          this.overWriteState(state);
        } catch (err) {
          state.validating = false;
          this.overWriteState(state);
        }
      });
    }, 1000);
  }

  /**
   * Get agent configuration from server side and update state based on response from server side
   * @param {string} baseURL - Base URL to DIA. Like: http://localhost:3000
   * @param {string} gid - Agent Global ID. Like: db642a82-2178-43a2-b8b7-000e37f3766e
   * @param {string} securityKey - Security Key. Like: 59f43b55-46a3-4efc-a960-018bcca91f46
   *
   * @returns {ValidateResult} - Agent Configuration. Please take a look of Agent Schema for detail
   */
  // eslint-disable-next-line class-methods-use-this
  async getAgentConfiguration(baseURL, gid, serialId) {
    try {
      // If *globalId* exist, then get agent information from server side.
      const agentConfig = await getAgentAPI(baseURL, gid, serialId, true);
      return {
        status: 'success',
        data: agentConfig,
      };
    } catch (err) {
      const result = {
        status: 'error',
      };
      if (err instanceof HTTPError) {
        // if http status is 404, means this agent doesn't be registered
        if (err.status === 404) {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.http.unregisterAgentDescription" />
          );
        } else if (err.status === 401) {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.http.securityKeyRequired" />
          );
        } else if (err.status >= 500) {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.http.internalError" />
          );
        } else if (err.status === 403) {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.http.agentWasConnected" />
          );
        } else if (err.status >= 400 && err.code === '00144000002') {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage
              id="app.common.messages.http.missedsSerialId"
              values={{ serialIdHeader: 'x-munew' }}
            />
          );
        } else if (err.status >= 400) {
          result.alertType = 'error';
          result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.inputError" />;
        } else {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.http.internalError" />
          );
        }
      } else {
        result.alertType = 'error';
        result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.internalError" />;
      }
      return result;
    }
  }

  overWriteState(s) {
    let state = s;
    if (!state) {
      state = {
        viewMode: true,
        alertType: undefined,
        alertMessage: (
          <FormattedHTMLMessage id="app.common.messages.http.unregisterAgentDescription" />
        ),
        configuration: {},
      };
    }

    if (!state.alertType) {
      state.alertType = undefined;
    }
    if (!state.configuration) {
      state.configuration = {};
    }

    // console.log('overWriteState -> state: ', state);
    this.setState(state);
  }

  /**
   * Validate whether can connect to DIA server through passed baseUrl
   * @param {string} baseUrl - DIA Base URL
   *
   * @returns {ValidateResult} - validate result
   */
  // eslint-disable-next-line class-methods-use-this
  async validateBaseURL(baseUrl) {
    try {
      const url = new URL(ENGINE_HEALTH_PATH, baseUrl).toString();
      const status = await checkEngineHealthAPI(ENGINE_HEALTH_METHOD, url, true);
      if (status) {
        return {
          status: 'success',
        };
      }
      return {
        status: 'error',
      };
    } catch (err) {
      const result = {
        status: 'error',
      };
      if (err instanceof HTTPError) {
        // if http status is 404, means this agent doesn't be registered
        if (err.status >= 500) {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.http.internalError" />
          );
        } else if (err.status >= 400) {
          result.alertType = 'error';
          result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.inputError" />;
        } else {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.http.internalError" />
          );
        }
      } else {
        result.alertType = 'error';
        result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.internalError" />;
      }
      return result;
    }
  }

  saveConfiguration() {
    clearTimeout(this.saveConfigurationHanlder);
    this.saveConfigurationHanlder = setTimeout(() => {
      try {
        const values = this.props.form.getFieldsValue();
        this.props.dispatch(updateServiceConfig(values));
        this.onValidateForm();
      } catch (err) {
        // message.error(formatMessage(messages.saveFailed));
      }
    }, 1000);
  }

  render() {
    // let content = <ServiceAgentSkeleton />;
    const { getFieldDecorator } = this.props.form;
    const {
      baseURLValidateStatus,
      agentGlobalIdValidateStatus,
      // validating,
      alertType,
      alertMessage,
    } = this.state;
    const service = this.props.service || {};
    const serviceConfig = service.data;

    // when server is starting or stopping, don't allow to change before finish
    const disableEdit = serviceConfig.STARTING || serviceConfig.STOPPING;

    let baseURLProps = {};
    if (baseURLValidateStatus) {
      baseURLProps = {
        hasFeedback: true,
        validateStatus: baseURLValidateStatus,
      };
    }

    let globalIdProps = {};
    if (agentGlobalIdValidateStatus) {
      globalIdProps = {
        hasFeedback: true,
        validateStatus: agentGlobalIdValidateStatus,
      };
    }

    // if (isFieldsTouched()) {
    //   console.log('isFieldsTouched: ', isFieldsTouched());
    // }

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
              label={formatMessage({ id: 'app.common.messages.serialId' })}
              style={formItemStyle}
            >
              {getFieldDecorator('AGENT_SERIAL_ID', {
                initialValue: serviceConfig.AGENT_SERIAL_ID,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.common.messages.serialIdInvalid' }),
                  },
                ],
              })(
                <Input
                  disabled
                  placeholder={formatMessage({ id: 'app.common.messages.serialIdExample' })}
                />,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.common.messages.serialIdDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.common.messages.baseURL' })}
              style={formItemStyle}
              {...baseURLProps}
            >
              {getFieldDecorator('MUNEW_BASE_URL', {
                initialValue: serviceConfig.MUNEW_BASE_URL || '',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.common.messages.baseURLInvalid' }),
                  },
                  {
                    pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)([-a-zA-Z0-9@:%._+~#=]){1,256}(:[0-9]{1,5})?(\/.*)?$/i,
                    message: formatMessage({ id: 'app.common.messages.baseURLInvalid' }),
                  },
                ],
              })(
                <Input
                  disabled={disableEdit}
                  placeholder={formatMessage({ id: 'app.common.messages.baseURLExample' })}
                  onChange={e => this.saveConfiguration(e)}
                />,
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
              {...globalIdProps}
            >
              {getFieldDecorator('GLOBAL_ID', {
                initialValue: serviceConfig.GLOBAL_ID || '',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.common.messages.globalIdInvalid' }),
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
                  disabled={disableEdit}
                  placeholder={formatMessage({
                    id: 'app.common.messages.globalIdExample',
                  })}
                  onChange={e => this.saveConfiguration(e)}
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
                initialValue: serviceConfig.PORT || '',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.common.messages.portInvalid' }),
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
                  disabled
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
                initialValue: serviceConfig.AGENT_HOME,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'app.common.messages.agentHomeFolderInvalid',
                    }),
                  },
                ],
              })(
                <Input
                  disabled={disableEdit}
                  placeholder={formatMessage({
                    id: 'app.common.messages.agentHomeFolderExample',
                  })}
                  onChange={e => this.saveConfiguration(e)}
                />,
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
                initialValue: _.toLower(serviceConfig.LOG_LEVEL),
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.common.messages.logLevelInvalid' }),
                  },
                ],
              })(
                <Select
                  disabled={disableEdit}
                  placeholder={formatMessage({
                    id: 'app.common.messages.logLevelExample',
                  })}
                  onChange={e => this.saveConfiguration(e)}
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
        </Form>
      </div>
    );
  }
}

export default connect(({ service }) => ({
  service,
}))(Form.create()(ServiceAgentForm));
