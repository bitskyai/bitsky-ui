import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import {
  formatMessage,
  FormattedMessage,
  FormattedHTMLMessage,
  formatHTMLMessage,
} from 'umi-plugin-react/locale';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  InputNumber,
  Select,
  Switch,
  Typography,
  message,
} from 'antd';
const { Paragraph, Text } = Typography;
// import messages from '../../locales/en-US/containers/Agents';
// import commonMessages from '../../locales/en-US/globalMessages';
import { registerAgentAPI, updateAgentAPI } from '../../apis/agents';
// import { refreshAgents } from './actions';
import { AGENT_STATE, AGENT_TYPES, DEFAULT_AGENT_CONFIGURATION } from '../../utils/constants';
import { filterOutEmptyValue } from '../../utils/utils';
import { exportDefaultSpecifier } from '@babel/types';

const FormDescription = styled(Paragraph)`
  padding: 5px 0;
  margin-bottom: 0 !important;
`;

const formItemStyle = { marginBottom: 0, paddingBottom: 0 };
const FormItemContainer = styled.div`
  margin-bottom: 5px;
`;
const SecondUnitContainer = styled.span`
  padding-left: 5px;
`;

class RegisterAgentForm extends React.Component {
  state = { sending: false, agentType: AGENT_TYPES.browserExtension };

  onAgentTypeChange(value) {
    // console.log('onAgentTypeChange: ', value);
    this.setState({
      agentType: value,
    });
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  registerAgent = e => {
    e.preventDefault();
    // const { formatMessage } = this.props.intl;
    this.setState({ sending: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log(values);
        try {
          if (this.props.agent) {
            values.globalId = this.props.agent.globalId;
            await updateAgentAPI(values);
            this.props.dispatch(refreshAgents());
          } else {
            await registerAgentAPI(values);
            this.props.dispatch(refreshAgents());
          }
          let msg = formatMessage({ id: 'app.containers.Agents.registerAgentSuccessful' });
          message.success(msg);
          this.setState({
            sending: false,
          });
          this.props.onCloseDrawer();
        } catch (err) {
          this.setState({
            sending: false,
          });
        }
      } else {
        this.setState({ sending: false });
      }
    });
  };

  render() {
    const { getFieldsValue, getFieldDecorator, getFieldsError, isFieldsTouched } = this.props.form;
    // const { formatMessage, formatHTMLMessage } = this.props.intl;
    let agent = this.props.agent || DEFAULT_AGENT_CONFIGURATION;
    let readOnly = false;
    if (_.get(agent, 'system.state') === AGENT_STATE.active) {
      readOnly = true;
    }
    let disableSaveBtn = true;
    let drawerTitle = formatMessage({ id: 'app.containers.Agents.drawerTitleCreate' });
    let primaryButtonTitle = formatMessage({ id: 'app.containers.Agents.registerNow' });
    if (agent.globalId) {
      // if *globalId* exist, then drawer title is
      drawerTitle = formatMessage({ id: 'app.containers.Agents.drawerTitleUpdate' });
      primaryButtonTitle = formatMessage({ id: 'app.common.messages.save' });
    }

    if (isFieldsTouched()) {
      // console.log('isFieldsTouched: ', isFieldsTouched());
      let currentFormValue = getFieldsValue();
      currentFormValue.globalId = agent.globalId;
      currentFormValue = { ...agent, ...currentFormValue };
      currentFormValue = filterOutEmptyValue(currentFormValue);
      agent = filterOutEmptyValue(agent);

      if (_.isEqual(currentFormValue, agent)) {
        disableSaveBtn = true;
      } else {
        disableSaveBtn = false;
      }
    }

    return (
      <div>
        <Drawer
          destroyOnClose={true}
          title={drawerTitle}
          width={720}
          onClose={this.props.onCloseDrawer}
          visible={this.props.visiable}
        >
          <p>
            <FormattedHTMLMessage id="app.containers.Agents.registerAgentDescription" />
          </p>
          <Form className="agent-form" layout="vertical" style={{ paddingBottom: '35px' }}>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.agentName' })}
                style={formItemStyle}
              >
                {getFieldDecorator('name', {
                  initialValue: agent.name,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.containers.Agents.agentNamePlaceholder' }),
                    },
                    {
                      min: 1,
                      max: 100,
                      message: formatMessage({ id: 'app.containers.Agents.agentNameInvalid' }),
                    },
                  ],
                })(
                  <Input
                    placeholder={formatMessage({ id: 'app.containers.Agents.agentNameExample' })}
                  />,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.agentNameDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.agentDescription' })}
                style={formItemStyle}
              >
                {getFieldDecorator('description', {
                  initialValue: agent.description,
                  rules: [
                    // {
                    //   required: true,
                    //   message: formatMessage(
                    //     messages.agentDescriptionPlaceholder,
                    //   ),
                    // },
                    {
                      min: 1,
                      max: 200,
                      message: formatMessage({
                        id: 'app.containers.Agents.agentDescriptionInvalid',
                      }),
                    },
                  ],
                })(
                  <Input
                    placeholder={formatMessage({
                      id: 'app.containers.Agents.agentDescriptionExample',
                    })}
                  />,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.agentDescriptionDescription" />
              </FormDescription>
            </FormItemContainer>
            {agent.globalId ? (
              <FormItemContainer>
                <Form.Item
                  label={formatMessage({ id: 'app.common.messages.globalId' })}
                  style={formItemStyle}
                >
                  {getFieldDecorator('globalId', {
                    rules: [],
                  })(<p>{agent.globalId}</p>)}
                </Form.Item>
                <FormDescription>
                  <FormattedHTMLMessage id="app.common.messages.globalIdDescription" />
                </FormDescription>
              </FormItemContainer>
            ) : (
              ''
              // global id should be automatically generate
              // <FormItemContainer>
              //   <Form.Item
              //     label={formatMessage(commonMessages.globalId)}
              //     style={formItemStyle}
              //   >
              //     {getFieldDecorator('globalId', {
              //       rules: [
              //         {
              //           required: true,
              //           message: formatMessage(
              //             commonMessages.globalIdPlaceholder,
              //           ),
              //         },
              //       ],
              //     })(
              //       <Input
              //         placeholder={formatMessage(
              //           commonMessages.globalIdExample,
              //         )}
              //       />,
              //     )}
              //   </Form.Item>
              //   <FormDescription>
              //     <FormattedHTMLMessage
              //       {...commonMessages.globalIdDescription}
              //     />
              //   </FormDescription>
              // </FormItemContainer>
            )}
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.agentType' })}
                style={formItemStyle}
              >
                {getFieldDecorator('type', {
                  initialValue: _.get(this, 'props.agent.type', AGENT_TYPES.browserExtension),
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.containers.Agents.agentTypePlaceHolder' }),
                    },
                  ],
                })(
                  <Select
                    placeholder={formatMessage({
                      id: 'app.containers.Agents.agentTypePlaceHolder',
                    })}
                    onChange={value => {
                      this.onAgentTypeChange(value);
                    }}
                  >
                    <Select.Option value={AGENT_TYPES.browserExtension}>
                      <FormattedHTMLMessage id="app.containers.Agents.browserExtensionAgent" />
                    </Select.Option>
                    <Select.Option value={AGENT_TYPES.service}>
                      <FormattedHTMLMessage id="app.containers.Agents.serviceAgent" />
                    </Select.Option>
                  </Select>,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.agentTypeDescription" />
              </FormDescription>
            </FormItemContainer>
            <h3>
              <FormattedHTMLMessage id="app.containers.Agents.agentConfiguration" />
            </h3>
            <p>
              <FormattedHTMLMessage id="app.containers.Agents.agentConfigurationDescription" />
            </p>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.privateMode' })}
                style={formItemStyle}
              >
                {getFieldDecorator('private', {
                  initialValue: agent.private,
                  valuePropName: 'checked',
                })(
                  <Switch
                    checkedChildren={formatMessage({ id: 'app.containers.Agents.switchOn' })}
                    unCheckedChildren={formatMessage({ id: 'app.containers.Agents.switchOff' })}
                  />,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.privateModeDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({
                  id: 'app.containers.Agents.concurrentCollectIntelligences',
                })}
                style={formItemStyle}
              >
                {getFieldDecorator('concurrent', {
                  initialValue: agent.concurrent,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Agents.concurrentCollectIntelligencesPlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Agents.invalidInteger' }),
                    },
                  ],
                })(<InputNumber min={1} max={10} />)}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.concurrentCollectIntelligencesDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.pollingInterval' })}
                style={formItemStyle}
              >
                {getFieldDecorator('pollingInterval', {
                  initialValue: agent.pollingInterval,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Agents.pollingIntervalPlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Agents.invalidInteger' }),
                    },
                  ],
                })(<InputNumber min={1} max={200} />)}
                <SecondUnitContainer>
                  {formatMessage({ id: 'app.containers.Agents.second' })}
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.pollingIntervalDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.maxWaitingTime' })}
                style={formItemStyle}
              >
                {getFieldDecorator('maxWaitingTime', {
                  initialValue: agent.maxWaitingTime,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Agents.maxWaitingTimePlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Agents.invalidInteger' }),
                    },
                  ],
                })(<InputNumber min={1} max={10} />)}
                <SecondUnitContainer>
                  {formatMessage({ id: 'app.containers.Agents.second' })}
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.maxWaitingTimeDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.maxCollectTime' })}
                style={formItemStyle}
              >
                {getFieldDecorator('maxCollect', {
                  initialValue: agent.maxCollect,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Agents.maxCollectTimePlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Agents.invalidInteger' }),
                    },
                  ],
                })(<InputNumber min={10} max={100} />)}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.maxCollectTimeDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.agentIdleTime' })}
                style={formItemStyle}
              >
                {getFieldDecorator('idelTime', {
                  initialValue: agent.idelTime,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Agents.agentIdleTimePlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Agents.invalidInteger' }),
                    },
                  ],
                })(<InputNumber min={0} max={100} />)}
                <SecondUnitContainer>
                  {formatMessage({ id: 'app.containers.Agents.second' })}
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.agentIdleTimeDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.requestTimeout' })}
                style={formItemStyle}
              >
                {getFieldDecorator('timeout', {
                  initialValue: agent.timeout,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Agents.requestTimeoutPlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Agents.invalidInteger' }),
                    },
                  ],
                })(<InputNumber min={1} max={1000} />)}
                <SecondUnitContainer>
                  {formatMessage({ id: 'app.containers.Agents.second' })}
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.requestTimeoutDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Agents.maxRetryTime' })}
                style={formItemStyle}
              >
                {getFieldDecorator('maxRetry', {
                  initialValue: agent.maxRetry,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Agents.maxRetryTimePlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Agents.invalidInteger' }),
                    },
                  ],
                })(<InputNumber min={1} max={5} />)}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Agents.maxRetryTimeDescription" />
              </FormDescription>
            </FormItemContainer>
            {this.state.agentType === AGENT_TYPES.service ? (
              <div>
                <FormItemContainer>
                  <Form.Item
                    label={formatMessage({ id: 'app.containers.Agents.baseURL' })}
                    style={formItemStyle}
                  >
                    {getFieldDecorator('baseURL', {
                      initialValue: agent.baseURL,
                      rules: [
                        {
                          required: true,
                          message: formatMessage({ id: 'app.containers.Agents.baseURLEmptyError' }),
                        },
                        {
                          pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)([a-z0-9\.])*(:[0-9]{1,5})?(\/.*)?$/i,
                          message: formatMessage({ id: 'app.containers.Agents.baseURLEmptyError' }),
                        },
                      ],
                    })(
                      <Input
                        placeholder={formatMessage({ id: 'app.containers.Agents.baseURLExample' })}
                      />,
                    )}
                  </Form.Item>
                  <FormDescription>
                    <FormattedHTMLMessage id="app.containers.Agents.baseURLDescription" />
                  </FormDescription>
                </FormItemContainer>
                <h3>{formatMessage({ id: 'app.common.messages.healthTitle' })}</h3>
                <p>{formatHTMLMessage({ id: 'app.containers.Agents.healthDescription' })}</p>
                <Row gutter={16}>
                  <Col span={8}>
                    <FormItemContainer>
                      <Form.Item
                        label={formatMessage({ id: 'app.common.messages.httpMethod' })}
                        style={formItemStyle}
                      >
                        {getFieldDecorator('health.method', {
                          initialValue: _.get(this, 'props.agent.health.method', 'GET'),
                          rules: [
                            {
                              required: true,
                              message: formatMessage({
                                id: 'app.common.messages.httpMethodPlaceHolder',
                              }),
                            },
                          ],
                        })(
                          <Select
                            placeholder={formatMessage({
                              id: 'app.common.messages.httpMethodPlaceHolder',
                            })}
                          >
                            <Select.Option value="GET">GET</Select.Option>
                            <Select.Option value="POST">POST</Select.Option>
                            <Select.Option value="PUT">PUT</Select.Option>
                            <Select.Option value="DELETE">DELETE</Select.Option>
                          </Select>,
                        )}
                      </Form.Item>
                      <FormDescription>
                        <FormattedHTMLMessage id="app.common.messages.httpMethodDescription" />
                      </FormDescription>
                    </FormItemContainer>
                  </Col>
                  <Col span={16}>
                    <FormItemContainer>
                      <Form.Item
                        label={formatMessage({ id: 'app.common.messages.urlPath' })}
                        style={formItemStyle}
                      >
                        {getFieldDecorator('health.path', {
                          initialValue: _.get(this, 'props.agent.health.path', '/health'),
                          rules: [
                            {
                              required: true,
                              message: formatMessage({
                                id: 'app.common.messages.urlPathPlaceHolder',
                              }),
                            },
                          ],
                        })(
                          <Input
                            placeholder={formatMessage({
                              id: 'app.common.messages.urlPathPlaceHolder',
                            })}
                          />,
                        )}
                      </Form.Item>
                      <FormDescription>
                        <FormattedHTMLMessage id="app.common.messages.urlPathDescription" />
                      </FormDescription>
                    </FormItemContainer>
                  </Col>
                </Row>
              </div>
            ) : (
              ''
            )}
          </Form>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.props.onCloseDrawer} style={{ marginRight: 8 }}>
              {formatMessage({ id: 'app.common.messages.cancel' })}
            </Button>
            <Button
              disabled={disableSaveBtn}
              loading={this.state.sending}
              onClick={this.registerAgent}
              type="primary"
            >
              {primaryButtonTitle}
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

RegisterAgentForm.propTypes = {
  visiable: PropTypes.bool,
  onCloseDrawer: PropTypes.func,
  agent: PropTypes.object,
};

// export default Form.create()(injectIntl(RegisterAgentForm));
export default Form.create()(RegisterAgentForm);
