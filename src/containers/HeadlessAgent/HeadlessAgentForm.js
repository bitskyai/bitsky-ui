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
  // message,
  Icon,
  message,
} from 'antd';
import { FormattedHTMLMessage, formatMessage, formatHTMLMessage } from 'umi-plugin-react/locale';
import { Link } from 'umi';
import { connect } from 'dva';
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

// import { filterOutEmptyValue } from '../../utils/utils';
import {
  LOG_LEVEL,
  ENGINE_HEALTH_METHOD,
  ENGINE_HEALTH_PATH,
  STATES,
  AGENT_TYPES,
} from '../../utils/constants';
import {
  updateHeadlessConfig,
  getAgentConfigurationSuccess,
  getAgentConfigurationFail,
} from './actions';
import { getAgentAPI } from '../../apis/producers';
import { checkEngineHealthAPI } from '../../apis/dia';
import HTTPError from '../../utils/HTTPError';
import { sendToElectron } from '../../utils/utils';
import IpcEvents from '../../utils/Ipc-events';

const { Paragraph, Text } = Typography;

const FormDescription = styled(Paragraph)`
  padding: 5px 0;
  margin-bottom: 0 !important;
`;

const formItemStyle = { marginBottom: 0, paddingBottom: 0 };
const FormItemContainer = styled.div`
  margin-bottom: 5px;
`;

const DEFAULT_BUNDLED_CHROMIUM = 'default';

class HeadlessAgentForm extends React.Component {
  constructor() {
    super();

    // Set default state
    this.state = {
      userDataDirValidateStatus: undefined,
      userDataDirValidateHelp: '',
      selectedAgentHome: undefined,
      alertType: undefined,
      // validating: true,
      alertMessage: "This agent isn't fully configured",
    };

    this.saveConfiguration.bind(this);
    this.onValidateForm.bind(this);
    this.openDirectoryPicker.bind(this);

    // setTimeout handler
    this.validateFormHandler = undefined;
    this.saveConfigurationHanlder = undefined;
    this.saveUserDataDirHanlder = undefined;
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
      this.props.form.validateFields(['BITSKY_BASE_URL', 'GLOBAL_ID'], async (errs, values) => {
        if (!values.BITSKY_BASE_URL || !values.GLOBAL_ID) {
          state.alertType = 'warning';
          state.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.agent.unregisterAgentDescription" />
          );
        }

        // Set UI Side Validation first
        if (errs && errs.BITSKY_BASE_URL) {
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
          if ((!errs || !errs.BITSKY_BASE_URL) && values.BITSKY_BASE_URL) {
            this.setState({
              baseURLValidateStatus: 'validating',
            });
            // Do server side validation
            const baseURLValidateResult = await this.validateBaseURL(values.BITSKY_BASE_URL);
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

          if ((!errs || !errs.GLOBAL_ID) && values.BITSKY_BASE_URL && values.GLOBAL_ID) {
            this.setState({
              agentGlobalIdValidateStatus: 'validating',
            });
            const headless = this.props.headless || {};
            const headlessConfig = headless.data;
            // Do server side validation
            const agentValidateResult = await this.getAgentConfiguration(
              values.BITSKY_BASE_URL,
              values.GLOBAL_ID,
              headlessConfig.PRODUCER_SERIAL_ID,
            );
            state.agentGlobalIdValidateStatus = agentValidateResult.status || 'error';

            if (agentValidateResult.alertType) {
              state.alertType = agentValidateResult.alertType;
            }
            if (agentValidateResult.alertMessage) {
              state.alertMessage = agentValidateResult.alertMessage;
            }

            if (agentValidateResult.status === 'success') {
              // additional validate for successfully get agent configuration
              if (
                _.toUpper(_.get(agentValidateResult, 'data.type')) &&
                _.toUpper(_.get(agentValidateResult, 'data.type')) !==
                  _.toUpper(_.get(this.props, 'headless.data.TYPE'))
              ) {
                state.agentGlobalIdValidateStatus = 'error';
                state.alertType = 'error';
                state.alertMessage = (
                  <FormattedHTMLMessage
                    id="app.common.messages.agent.unmatchedAgentType"
                    values={{ agentType: 'Headless' }}
                  />
                );
              } else if (
                _.toUpper(_.get(agentValidateResult, 'data.system.state')) !== STATES.active
              ) {
                state.alertType = 'warning';
                state.alertMessage = (
                  <>
                    <FormattedHTMLMessage id="app.common.messages.agent.doesntActive" />
                    <Link to="/app/producers">
                      <Icon type="arrow-right" className="munew-alert-link-icon" />
                    </Link>
                  </>
                );
              } else if (agentValidateResult.status) {
                state.alertType = 'info';
                state.alertMessage = (
                  <>
                    <FormattedHTMLMessage id="app.common.messages.agent.active" />
                    <Link to="/app/producers">
                      <Icon type="arrow-right" className="munew-alert-link-icon" />
                    </Link>
                  </>
                );
              }
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
      const agentConfig = await getAgentAPI(
        baseURL,
        gid,
        serialId,
        AGENT_TYPES.headlessBrowser,
        true,
      );
      this.props.dispatch(getAgentConfigurationSuccess(agentConfig));
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
            <>
              <FormattedHTMLMessage id="app.common.messages.agent.notFindAgent" />
              <Link to="/app/producers">
                <Icon type="arrow-right" className="munew-alert-link-icon" />
              </Link>
            </>
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
        } else if (err.status >= 400 && err.code === '00144000004') {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage
              id="app.common.messages.agent.unmatchedAgentType"
              values={{ agentType: 'Headless' }}
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

      this.props.dispatch(getAgentConfigurationFail(err));
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
          <FormattedHTMLMessage id="app.common.messages.agent.unregisterAgentDescription" />
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
      const engineHealth = await checkEngineHealthAPI(ENGINE_HEALTH_METHOD, url, true);
      const result = {
        status: '',
        alertType: '',
        alertMessage: '',
      };
      if (engineHealth.status === 0) {
        result.status = 'error';
        result.alertType = 'error';
        result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.cannotConnect" />;
      } else if (!engineHealth.engine) {
        result.status = 'error';
        result.alertType = 'error';
        result.alertMessage = (
          <FormattedHTMLMessage id="app.common.messages.agent.notConnectToEngine" />
        );
      } else if (engineHealth.health) {
        result.status = 'success';
      } else if (engineHealth.status >= 500) {
        result.status = 'error';
        result.alertType = 'error';
        result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.internalError" />;
      } else if (engineHealth.status >= 400) {
        result.alertType = 'error';
        result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.inputError" />;
      } else {
        result.alertType = 'error';
        result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.internalError" />;
      }
      return result;
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

  async openDirectoryPicker() {
    try {
      const dir = await sendToElectron('common/openDirectoryPicker');
      this.setState({
        selectedAgentHome: dir.directory,
      });
      this.saveConfiguration();
    } catch (err) {
      // console.log(err);
    }
  }

  saveConfiguration() {
    clearTimeout(this.saveConfigurationHanlder);
    this.saveConfigurationHanlder = setTimeout(() => {
      try {
        const values = this.props.form.getFieldsValue();
        if (values.PUPPETEER_EXECUTABLE_PATH === DEFAULT_BUNDLED_CHROMIUM) {
          values.PUPPETEER_EXECUTABLE_PATH = '';
        }
        if (this.state.selectedAgentHome) {
          values.PRODUCER_HOME = this.state.selectedAgentHome;
        }
        this.updateConfiguration(values);
        this.onValidateForm();
      } catch (err) {
        // message.error(formatMessage(messages.saveFailed));
      }
    }, 2000);
  }

  updateConfiguration(v) {
    try {
      let values = v;
      if (!values) {
        values = this.props.form.getFieldsValue();
      }
      this.props.dispatch(updateHeadlessConfig(values));
    } catch (err) {
      message.error('ss');
    }
  }

  saveUserDataDir() {
    clearTimeout(this.saveUserDataDirHanlder);
    this.saveUserDataDirHanlder = setTimeout(async () => {
      try {
        const values = this.props.form.getFieldsValue();
        if (values.PUPPETEER_USER_DATA_DIR) {
          this.setState({
            userDataDirValidateStatus: 'validating',
          });
          const validateResult = await sendToElectron(IpcEvents.COMMON_IS_USER_DATA_DIRETORY, {
            directory: values.PUPPETEER_USER_DATA_DIR,
          });
          if (!validateResult.validPath) {
            this.setState({
              userDataDirValidateStatus: 'error',
              userDataDirValidateHelp: formatHTMLMessage({
                id: 'app.containers.HeadlessAgent.invalidDataDir',
              }),
            });
          } else if (!validateResult.userDataDir) {
            this.setState({
              userDataDirValidateStatus: 'warning',
              userDataDirValidateHelp: formatHTMLMessage({
                id: 'app.containers.HeadlessAgent.notAValidDataDir',
              }),
            });
            this.updateConfiguration();
          } else {
            this.setState({
              userDataDirValidateStatus: 'success',
              userDataDirValidateHelp: '',
            });
            this.updateConfiguration();
          }
        } else {
          // when `PUPPETEER_USER_DATA_DIR` is empty, then means remove it
          this.setState({
            userDataDirValidateStatus: '',
            userDataDirValidateHelp: '',
          });
          this.updateConfiguration();
        }
      } catch (err) {
        message.error('ss');
      }
    }, 2000);
  }

  render() {
    // let content = <HeadlessAgentSkeleton />;
    const { getFieldDecorator } = this.props.form;
    const {
      baseURLValidateStatus,
      agentGlobalIdValidateStatus,
      userDataDirValidateStatus,
      userDataDirValidateHelp,
      // validating,
      alertType,
      alertMessage,
      selectedAgentHome,
    } = this.state;
    const headless = this.props.headless || {};
    const headlessConfig = headless.data;
    const chromeInstallations = _.get(headless, 'options.chromeInstallations') || [];
    // const agentConfig = headless.agent;

    // when server is starting or stopping, don't allow to change before finish
    const disableEdit = headlessConfig.STARTING || headlessConfig.STOPPING;
    if (!headlessConfig.PUPPETEER_EXECUTABLE_PATH) {
      headlessConfig.PUPPETEER_EXECUTABLE_PATH = DEFAULT_BUNDLED_CHROMIUM;
    }

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

    let userDataDirProps = {};
    if (userDataDirValidateStatus) {
      userDataDirProps = {
        hasFeedback: true,
        validateStatus: userDataDirValidateStatus,
        help: userDataDirValidateHelp,
      };
    }

    // if (isFieldsTouched()) {
    //   console.log('isFieldsTouched: ', isFieldsTouched());
    // }

    return (
      <div>
        {alertType ? (
          <Alert type={alertType} message={alertMessage} style={{ marginBottom: '16px' }} />
        ) : (
          ''
        )}
        <Form className="agent-form" layout="vertical" style={{ paddingBottom: '35px' }}>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.common.messages.serialId' })}
              style={formItemStyle}
            >
              {getFieldDecorator('PRODUCER_SERIAL_ID', {
                initialValue: headlessConfig.PRODUCER_SERIAL_ID,
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
              {getFieldDecorator('BITSKY_BASE_URL', {
                initialValue: headlessConfig.BITSKY_BASE_URL || '',
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
                initialValue: headlessConfig.GLOBAL_ID || '',
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
                initialValue: headlessConfig.PORT || '',
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
              {getFieldDecorator('PRODUCER_HOME', {
                initialValue: headlessConfig.PRODUCER_HOME,
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
                  <Text code>{selectedAgentHome || headlessConfig.PRODUCER_HOME}</Text>
                  <Button
                    size="small"
                    onClick={e => this.openDirectoryPicker(e)}
                    // title={formatMessage({
                    //   id: 'munew.settings.selectFolderTooltip',
                    // })}
                  >
                    <Icon type="folder-open" />
                    {/* <FormattedMessage id="munew.settings.selectFolder" /> */}
                  </Button>
                </div>,
                {
                  /*
                <Input
                  disabled={disableEdit}
                  placeholder={formatMessage({
                    id: 'app.common.messages.agentHomeFolderExample',
                  })}
                  onChange={e => this.saveConfiguration(e)}
                />,
                */
                },
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
                  disabled={disableEdit}
                  checkedChildren={formatMessage({ id: 'app.common.messages.yes' })}
                  unCheckedChildren={formatMessage({
                    id: 'app.common.messages.no',
                  })}
                  onChange={e => this.saveConfiguration(e)}
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
                  disabled={disableEdit}
                  checkedChildren={formatMessage({
                    id: 'app.common.messages.yes',
                  })}
                  unCheckedChildren={formatMessage({
                    id: 'app.common.messages.no',
                  })}
                  onChange={e => this.saveConfiguration(e)}
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
                  // {
                  //   min: 1,
                  //   message: formatMessage({
                  //     id: 'app.containers.HeadlessAgent.customFunctionTimeoutInvalid',
                  //   }),
                  // },
                ],
              })(
                <InputNumber
                  disabled={disableEdit}
                  min={1}
                  max={30 * 60 * 1000}
                  placeholder={formatMessage({
                    id: 'app.containers.HeadlessAgent.customFunctionTimeoutExample',
                  })}
                  onChange={e => this.saveConfiguration(e)}
                />,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.containers.HeadlessAgent.customFunctionTimeoutDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.containers.HeadlessAgent.browserInstallations' })}
              style={formItemStyle}
            >
              {getFieldDecorator('PUPPETEER_EXECUTABLE_PATH', {
                initialValue: headlessConfig.PUPPETEER_EXECUTABLE_PATH,
              })(
                <Select
                  disabled={disableEdit}
                  placeholder={formatMessage({
                    id: 'app.containers.HeadlessAgent.bundledChromium',
                  })}
                  onChange={e => this.saveConfiguration(e)}
                >
                  <Select.Option value={DEFAULT_BUNDLED_CHROMIUM}>
                    <FormattedHTMLMessage id="app.containers.HeadlessAgent.bundledChromium" />
                  </Select.Option>
                  {chromeInstallations.map((installation, index) => (
                    <Select.Option
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${Date.now()}-${index}`}
                      value={installation}
                      title={installation}
                    >
                      {installation}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.containers.HeadlessAgent.browserInstallationsDescription" />
            </FormDescription>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.containers.HeadlessAgent.userDataDir' })}
              style={formItemStyle}
              {...userDataDirProps}
            >
              {getFieldDecorator('PUPPETEER_USER_DATA_DIR', {
                initialValue: headlessConfig.PUPPETEER_USER_DATA_DIR,
                rules: [],
              })(
                <Input
                  disabled={disableEdit}
                  placeholder={formatMessage({
                    id: 'app.containers.HeadlessAgent.userDataDirExample',
                  })}
                  onChange={e => this.saveUserDataDir(e)}
                />,
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.containers.HeadlessAgent.userDataDirDescription" />
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
