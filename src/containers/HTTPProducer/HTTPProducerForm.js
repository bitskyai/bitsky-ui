// import { refreshProducers } from './actions';
import {
  Alert,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  // Switch,
  Typography,
  // message,
  Icon,
} from 'antd';
import { Link, connect, FormattedHTMLMessage, formatMessage } from 'umi';
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

// import { filterOutEmptyValue } from '../../utils/utils';
import {
  LOG_LEVEL,
  SUPPLIER_HEALTH_METHOD,
  SUPPLIER_HEALTH_PATH,
  STATES,
  PRODUCER_TYPES,
} from '../../utils/constants';
import {
  updateServiceConfig,
  getProducerConfigurationSuccess,
  getProducerConfigurationFail,
} from './actions';
import { getProducerAPI } from '../../apis/producers';
import { checkSupplierHealthAPI } from '../../apis/supplier';
import HTTPError from '../../utils/HTTPError';
import { sendToElectron } from '../../utils/utils';

const { Paragraph, Text } = Typography;

const FormDescription = styled(Paragraph)`
  padding: 5px 0;
  margin-bottom: 0 !important;
`;

const formItemStyle = { marginBottom: 0, paddingBottom: 0 };
const FormItemContainer = styled.div`
  margin-bottom: 5px;
`;

class HTTPProducerForm extends React.Component {
  constructor() {
    super();

    // Set default state
    this.state = {
      selectedProducerHome: undefined,
      alertType: undefined,
      // validating: true,
      alertMessage: "This producer isn't fully configured",
    };

    this.saveConfiguration.bind(this);
    this.onValidateForm.bind(this);
    this.openDirectoryPicker.bind(this);

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
      this.props.form.validateFields(['BITSKY_BASE_URL', 'GLOBAL_ID'], async (errs, values) => {
        if (!values.BITSKY_BASE_URL || !values.GLOBAL_ID) {
          state.alertType = 'warning';
          state.alertMessage = (
            <FormattedHTMLMessage id="app.common.messages.producer.unregisterProducerDescription" />
          );
        }

        // Set UI Side Validation first
        if (errs && errs.BITSKY_BASE_URL) {
          state.baseURLValidateStatus = 'error';
        } else {
          state.baseURLValidateStatus = '';
        }
        if (errs && errs.GLOBAL_ID) {
          state.producerGlobalIdValidateStatus = 'error';
        } else {
          state.producerGlobalIdValidateStatus = '';
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
              producerGlobalIdValidateStatus: 'validating',
            });
            const service = this.props.http || {};
            const serviceConfig = service.data;
            // Do server side validation
            const producerValidateResult = await this.getProducerConfiguration(
              values.BITSKY_BASE_URL,
              values.GLOBAL_ID,
              serviceConfig.PRODUCER_SERIAL_ID,
            );
            state.producerGlobalIdValidateStatus = producerValidateResult.status || 'error';

            if (producerValidateResult.alertType) {
              state.alertType = producerValidateResult.alertType;
            }
            if (producerValidateResult.alertMessage) {
              state.alertMessage = producerValidateResult.alertMessage;
            }
            if (producerValidateResult.status === 'success') {
              if (
                _.toUpper(_.get(producerValidateResult, 'data.type')) &&
                _.toUpper(_.get(producerValidateResult, 'data.type')) !==
                  _.toUpper(_.get(this.props, 'http.data.TYPE'))
              ) {
                state.producerGlobalIdValidateStatus = 'error';
                state.alertType = 'error';
                state.alertMessage = (
                  <FormattedHTMLMessage
                    id="app.common.messages.producer.unmatchedProducerType"
                    values={{ producerType: 'HTTP' }}
                  />
                );
              } else if (
                _.toUpper(_.get(producerValidateResult, 'data.system.state')) !== STATES.active
              ) {
                state.alertType = 'warning';
                state.alertMessage = (
                  <>
                    <FormattedHTMLMessage id="app.common.messages.producer.doesntActive" />
                    <Link to="/app/producers">
                      <Icon type="arrow-right" className="bitsky-alert-link-icon" />
                    </Link>
                  </>
                );
              } else {
                state.alertType = 'info';
                state.alertMessage = (
                  <>
                    <FormattedHTMLMessage id="app.common.messages.producer.active" />
                    <Link to="/app/producers">
                      <Icon type="arrow-right" className="bitsky-alert-link-icon" />
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
   * Get producer configuration from server side and update state based on response from server side
   * @param {string} baseURL - Base URL to BitSky. Like: http://localhost:3000
   * @param {string} gid - Producer Global ID. Like: db642a82-2178-43a2-b8b7-000e37f3766e
   * @param {string} securityKey - Security Key. Like: 59f43b55-46a3-4efc-a960-018bcca91f46
   *
   * @returns {ValidateResult} - Producer Configuration. Please take a look of Producer Schema for detail
   */
  // eslint-disable-next-line class-methods-use-this
  async getProducerConfiguration(baseURL, gid, serialId) {
    try {
      // If *globalId* exist, then get producer information from server side.
      const producerConfig = await getProducerAPI(
        baseURL,
        gid,
        serialId,
        PRODUCER_TYPES.http,
        true,
      );
      this.props.dispatch(getProducerConfigurationSuccess(producerConfig));
      return {
        status: 'success',
        data: producerConfig,
      };
    } catch (err) {
      const result = {
        status: 'error',
      };
      if (err instanceof HTTPError) {
        // if http status is 404, means this producer doesn't be registered
        if (err.status === 404) {
          result.alertType = 'error';
          result.alertMessage = (
            <>
              <FormattedHTMLMessage id="app.common.messages.producer.notFindProducer" />
              <Link to="/app/producers">
                <Icon type="arrow-right" className="bitsky-alert-link-icon" />
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
            <FormattedHTMLMessage id="app.common.messages.http.producerWasConnected" />
          );
        } else if (err.status >= 400 && err.code === '00144000002') {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage
              id="app.common.messages.http.missedsSerialId"
              values={{ serialIdHeader: 'x-bitsky' }}
            />
          );
        } else if (err.status >= 400 && err.code === '00144000004') {
          result.alertType = 'error';
          result.alertMessage = (
            <FormattedHTMLMessage
              id="app.common.messages.producer.unmatchedProducerType"
              values={{ producerType: 'HTTP' }}
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

      this.props.dispatch(getProducerConfigurationFail(err));
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
          <FormattedHTMLMessage id="app.common.messages.producer.unregisterProducerDescription" />
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
   * Validate whether can connect to BitSky server through passed baseUrl
   * @param {string} baseUrl - BitSky Base URL
   *
   * @returns {ValidateResult} - validate result
   */
  // eslint-disable-next-line class-methods-use-this
  async validateBaseURL(baseUrl) {
    try {
      const url = new URL(SUPPLIER_HEALTH_PATH, baseUrl).toString();
      const supplierHealth = await checkSupplierHealthAPI(SUPPLIER_HEALTH_METHOD, url, true);
      const result = {
        status: '',
        alertType: '',
        alertMessage: '',
      };
      if (supplierHealth.status === 0) {
        result.status = 'error';
        result.alertType = 'error';
        result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.cannotConnect" />;
      } else if (!supplierHealth.supplier) {
        result.status = 'error';
        result.alertType = 'error';
        result.alertMessage = (
          <FormattedHTMLMessage id="app.common.messages.producer.notConnectToSupplier" />
        );
      } else if (supplierHealth.health) {
        result.status = 'success';
      } else if (supplierHealth.status >= 500) {
        result.status = 'error';
        result.alertType = 'error';
        result.alertMessage = <FormattedHTMLMessage id="app.common.messages.http.internalError" />;
      } else if (supplierHealth.status >= 400) {
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
        // if http status is 404, means this producer doesn't be registered
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
        selectedProducerHome: dir.directory,
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
        if (this.state.selectedProducerHome) {
          values.PRODUCER_HOME = this.state.selectedProducerHome;
        }
        this.props.dispatch(updateServiceConfig(values));
        this.onValidateForm();
      } catch (err) {
        // message.error(formatMessage(messages.saveFailed));
      }
    }, 1000);
  }

  render() {
    // let content = <HTTPProducerSkeleton />;
    const { getFieldDecorator } = this.props.form;
    const {
      baseURLValidateStatus,
      producerGlobalIdValidateStatus,
      // validating,
      alertType,
      alertMessage,
      selectedProducerHome,
    } = this.state;
    const service = this.props.http || {};
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
    if (producerGlobalIdValidateStatus) {
      globalIdProps = {
        hasFeedback: true,
        validateStatus: producerGlobalIdValidateStatus,
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
        <Form className="producer-form" layout="vertical" style={{ paddingBottom: '35px' }}>
          <FormItemContainer>
            <Form.Item
              label={formatMessage({ id: 'app.common.messages.serialId' })}
              style={formItemStyle}
            >
              {getFieldDecorator('PRODUCER_SERIAL_ID', {
                initialValue: serviceConfig.PRODUCER_SERIAL_ID,
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
                initialValue: serviceConfig.BITSKY_BASE_URL || '',
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
                  disabled
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
              label={formatMessage({ id: 'app.common.messages.producerConfigurationglobalId' })}
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
              <FormattedHTMLMessage id="app.common.messages.producerConfigurationglobalIdDescription" />
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
              label={formatMessage({ id: 'app.common.messages.producerHomeFolder' })}
              style={formItemStyle}
              hasFeedback={false}
            >
              {getFieldDecorator('PRODUCER_HOME', {
                initialValue: serviceConfig.PRODUCER_HOME,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'app.common.messages.producerHomeFolderInvalid',
                    }),
                  },
                ],
              })(
                <div>
                  <Text code>{selectedProducerHome || serviceConfig.PRODUCER_HOME}</Text>
                  <Button
                    size="small"
                    onClick={e => this.openDirectoryPicker(e)}
                    // title={formatMessage({
                    //   id: 'bitsky.settings.selectFolderTooltip',
                    // })}
                  >
                    <Icon type="folder-open" />
                    {/* <FormattedMessage id="bitsky.settings.selectFolder" /> */}
                  </Button>
                </div>,
                {
                  /*
                <Input
                  disabled={disableEdit}
                  placeholder={formatMessage({
                    id: 'app.common.messages.producerHomeFolderExample',
                  })}
                  onChange={e => this.saveConfiguration(e)}
                />,
                */
                },
              )}
            </Form.Item>
            <FormDescription>
              <FormattedHTMLMessage id="app.common.messages.producerHomeFolderDescription" />
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

export default connect(({ http }) => ({
  http,
}))(Form.create()(HTTPProducerForm));
