import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { formatMessage, FormattedMessage, FormattedHTMLMessage, formatHTMLMessage } from 'umi-plugin-react/locale';
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
import messages from '../../locales/en-US/containers/Agents';
import commonMessages from '../../locales/en-US/globalMessages';
import { registerAgentAPI, updateAgentAPI } from '../../apis/agents';
// import { refreshAgents } from './actions';
import {
  AGENT_TYPES,
  DEFAULT_AGENT_CONFIGURATION,
} from '../../utils/constants';

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
          let msg = formatMessage(messages.registerAgentSuccessful);
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
    const {
      getFieldDecorator,
      getFieldsError,
      isFieldsTouched,
    } = this.props.form;
    // const { formatMessage, formatHTMLMessage } = this.props.intl;
    let agent = this.props.agent || DEFAULT_AGENT_CONFIGURATION;
    return (
      <div>
        <Drawer
          destroyOnClose={true}
          title={formatMessage(messages.drawerTitle)}
          width={720}
          onClose={this.props.onCloseDrawer}
          visible={this.props.visiable}
        >
          <p>
            <FormattedHTMLMessage {...messages.registerAgentDescription} />
          </p>
          <Form
            className="agent-form"
            layout="vertical"
            style={{ paddingBottom: '35px' }}
          >
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.agentName)}
                style={formItemStyle}
              >
                {getFieldDecorator('name', {
                  initialValue: agent.name,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.agentNamePlaceholder),
                    },
                    {
                      min: 1,
                      max: 100,
                      message: formatMessage(messages.agentNameInvalid),
                    },
                  ],
                })(
                  <Input
                    placeholder={formatMessage(messages.agentNameExample)}
                  />,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage {...messages.agentNameDescription} />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.agentDescription)}
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
                      message: formatMessage(messages.agentDescriptionInvalid),
                    },
                  ],
                })(
                  <Input
                    placeholder={formatMessage(
                      messages.agentDescriptionExample,
                    )}
                  />,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage
                  {...messages.agentDescriptionDescription}
                />
              </FormDescription>
            </FormItemContainer>
            {agent.globalId ? (
              <FormItemContainer>
                <Form.Item
                  label={formatMessage(commonMessages.globalId)}
                  style={formItemStyle}
                >
                  {getFieldDecorator('globalId', {
                    rules: [],
                  })(<p>{agent.globalId}</p>)}
                </Form.Item>
                <FormDescription>
                  <FormattedHTMLMessage
                    {...commonMessages.globalIdDescription}
                  />
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
                label={formatMessage(messages.agentType)}
                style={formItemStyle}
              >
                {getFieldDecorator('type', {
                  initialValue: _.get(
                    this,
                    'props.agent.type',
                    AGENT_TYPES.browserExtension,
                  ),
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.agentTypePlaceHolder),
                    },
                  ],
                })(
                  <Select
                    placeholder={formatMessage(messages.agentTypePlaceHolder)}
                    onChange={value => {
                      this.onAgentTypeChange(value);
                    }}
                  >
                    <Select.Option value={AGENT_TYPES.browserExtension}>
                      <FormattedHTMLMessage
                        {...messages.browserExtensionAgent}
                      />
                    </Select.Option>
                    <Select.Option value={AGENT_TYPES.service}>
                      <FormattedHTMLMessage {...messages.serviceAgent} />
                    </Select.Option>
                  </Select>,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage {...messages.agentTypeDescription} />
              </FormDescription>
            </FormItemContainer>
            <h3>
              <FormattedMessage {...messages.agentConfiguration} />
            </h3>
            <p>
              <FormattedHTMLMessage
                {...messages.agentConfigurationDescription}
              />
            </p>
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.privateMode)}
                style={formItemStyle}
              >
                {getFieldDecorator('private', {
                  initialValue: agent.private,
                  valuePropName: 'checked'
                })(
                  <Switch
                    checkedChildren={formatMessage(messages.switchOn)}
                    unCheckedChildren={formatMessage(messages.switchOff)}
                  />,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage {...messages.privateModeDescription} />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.concurrentCollectIntelligences)}
                style={formItemStyle}
              >
                {getFieldDecorator('concurrent', {
                  initialValue: agent.concurrent,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        messages.concurrentCollectIntelligencesPlaceholder,
                      ),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage(messages.invalidInteger),
                    },
                  ],
                })(<InputNumber min={1} max={10} />)}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage
                  {...messages.concurrentCollectIntelligencesDescription}
                />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.pollingInterval)}
                style={formItemStyle}
              >
                {getFieldDecorator('pollingInterval', {
                  initialValue: agent.pollingInterval,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        messages.pollingIntervalPlaceholder,
                      ),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage(messages.invalidInteger),
                    },
                  ],
                })(<InputNumber min={1} max={200} />)}
                <SecondUnitContainer>
                  <FormattedMessage {...messages.second} />
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage
                  {...messages.pollingIntervalDescription}
                />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.maxWaitingTime)}
                style={formItemStyle}
              >
                {getFieldDecorator('maxWaitingTime', {
                  initialValue: agent.maxWaitingTime,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        messages.maxWaitingTimePlaceholder,
                      ),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage(messages.invalidInteger),
                    },
                  ],
                })(<InputNumber min={1} max={10} />)}
                <SecondUnitContainer>
                  <FormattedMessage {...messages.second} />
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage {...messages.maxWaitingTimeDescription} />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.maxCollectTime)}
                style={formItemStyle}
              >
                {getFieldDecorator('maxCollect', {
                  initialValue: agent.maxCollect,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        messages.maxCollectTimePlaceholder,
                      ),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage(messages.invalidInteger),
                    },
                  ],
                })(<InputNumber min={10} max={100} />)}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage {...messages.maxCollectTimeDescription} />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.agentIdleTime)}
                style={formItemStyle}
              >
                {getFieldDecorator('idelTime', {
                  initialValue: agent.idelTime,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.agentIdleTimePlaceholder),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage(messages.invalidInteger),
                    },
                  ],
                })(<InputNumber min={0} max={100} />)}
                <SecondUnitContainer>
                  <FormattedMessage {...messages.second} />
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage {...messages.agentIdleTimeDescription} />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.requestTimeout)}
                style={formItemStyle}
              >
                {getFieldDecorator('timeout', {
                  initialValue: agent.timeout,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        messages.requestTimeoutPlaceholder,
                      ),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage(messages.invalidInteger),
                    },
                  ],
                })(<InputNumber min={1} max={1000} />)}
                <SecondUnitContainer>
                  <FormattedMessage {...messages.second} />
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage {...messages.requestTimeoutDescription} />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage(messages.maxRetryTime)}
                style={formItemStyle}
              >
                {getFieldDecorator('maxRetry', {
                  initialValue: agent.maxRetry,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.maxRetryTimePlaceholder),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage(messages.invalidInteger),
                    },
                  ],
                })(<InputNumber min={1} max={5} />)}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage {...messages.maxRetryTimeDescription} />
              </FormDescription>
            </FormItemContainer>
            {this.state.agentType === AGENT_TYPES.service ? (
              <div>
                <FormItemContainer>
                  <Form.Item
                    label={formatMessage(messages.baseURL)}
                    style={formItemStyle}
                  >
                    {getFieldDecorator('baseURL', {
                      initialValue: agent.baseURL,
                      rules: [
                        {
                          required: true,
                          message: formatMessage(messages.baseURLEmptyError),
                        },
                        {
                          pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)([a-z0-9\.])*(:[0-9]{1,5})?(\/.*)?$/i,
                          message: formatMessage(messages.baseURLEmptyError),
                        },
                      ],
                    })(
                      <Input
                        placeholder={formatMessage(messages.baseURLExample)}
                      />,
                    )}
                  </Form.Item>
                  <FormDescription>
                    <FormattedHTMLMessage {...messages.baseURLDescription} />
                  </FormDescription>
                </FormItemContainer>
                <h3>
                  <FormattedMessage {...commonMessages.healthTitle} />
                </h3>
                <p>
                  <FormattedHTMLMessage {...messages.healthDescription} />
                </p>
                <Row gutter={16}>
                  <Col span={8}>
                    <FormItemContainer>
                      <Form.Item
                        label={formatMessage(commonMessages.httpMethod)}
                        style={formItemStyle}
                      >
                        {getFieldDecorator('health.method', {
                          initialValue: _.get(
                            this,
                            'props.agent.health.method',
                            'GET',
                          ),
                          rules: [
                            {
                              required: true,
                              message: formatMessage(
                                commonMessages.httpMethodPlaceHolder,
                              ),
                            },
                          ],
                        })(
                          <Select
                            placeholder={formatMessage(
                              commonMessages.httpMethodPlaceHolder,
                            )}
                          >
                            <Select.Option value="GET">GET</Select.Option>
                            <Select.Option value="POST">POST</Select.Option>
                            <Select.Option value="PUT">PUT</Select.Option>
                            <Select.Option value="DELETE">DELETE</Select.Option>
                          </Select>,
                        )}
                      </Form.Item>
                      <FormDescription>
                        <FormattedHTMLMessage
                          {...commonMessages.httpMethodDescription}
                        />
                      </FormDescription>
                    </FormItemContainer>
                  </Col>
                  <Col span={16}>
                    <FormItemContainer>
                      <Form.Item
                        label={formatMessage(commonMessages.urlPath)}
                        style={formItemStyle}
                      >
                        {getFieldDecorator('health.path', {
                          initialValue: _.get(
                            this,
                            'props.agent.health.path',
                            '/health',
                          ),
                          rules: [
                            {
                              required: true,
                              message: formatMessage(
                                commonMessages.urlPathPlaceHolder,
                              ),
                            },
                          ],
                        })(
                          <Input
                            placeholder={formatMessage(
                              commonMessages.urlPathPlaceHolder,
                            )}
                          />,
                        )}
                      </Form.Item>
                      <FormDescription>
                        <FormattedHTMLMessage
                          {...commonMessages.urlPathDescription}
                        />
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
            <Button
              onClick={this.props.onCloseDrawer}
              style={{ marginRight: 8 }}
            >
              <FormattedMessage {...commonMessages.cancel} />
            </Button>
            <Button
              // disabled={!isFieldsTouched() || this.hasErrors(getFieldsError())}
              loading={this.state.sending}
              onClick={this.registerAgent}
              type="primary"
            >
              <FormattedMessage {...messages.registerNow} />
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
