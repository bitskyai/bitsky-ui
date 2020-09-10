// import { refreshProducers } from './actions';
import {
  Alert,
  Button,
  // Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  // Row,
  Select,
  Switch,
  Typography,
  message,
} from 'antd';
// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { FormattedHTMLMessage, formatHTMLMessage, formatMessage } from 'umi-plugin-react/locale';
// import commonMessages from '../../locales/en-US/globalMessages';

// import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
// import { exportDefaultSpecifier } from '@babel/types';
import styled from 'styled-components';
import { filterOutEmptyValue } from '../../utils/utils';
import { registerProducerAPI, updateProducerAPI } from '../../apis/producers';
import { STATES, PRODUCER_TYPES, DEFAULT_PRODUCER_CONFIGURATION } from '../../utils/constants';

const { Paragraph } = Typography;

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

class RegisterProducerForm extends React.Component {
  // state = { sending: false, producerType: PRODUCER_TYPES.browserExtension };
  state = { sending: false };

  // onProducerTypeChange(value) {
  //   // console.log('onProducerTypeChange: ', value);
  //   this.setState({
  //     producerType: value,
  //   });
  // }

  // hasErrors(fieldsError) {
  //   return Object.keys(fieldsError).some(field => fieldsError[field]);
  // }

  registerProducer = e => {
    e.preventDefault();
    // const { formatMessage } = this.props.intl;
    this.setState({ sending: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          if (this.props.producer) {
            values.globalId = this.props.producer.globalId;
            await updateProducerAPI(values);
            this.props.dispatch({
              type: 'producers/refreshProducers',
            });
          } else {
            await registerProducerAPI(values);
            this.props.dispatch({
              type: 'producers/refreshProducers',
            });
          }
          const msg = formatMessage({ id: 'app.containers.Producers.registerProducerSuccessful' });
          message.success(msg);
          this.setState({
            sending: false,
          });
          this.props.onCloseDrawer();
        } catch (errObj) {
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
    const { getFieldsValue, getFieldDecorator, isFieldsTouched } = this.props.form;
    // const { formatMessage, formatHTMLMessage } = this.props.intl;
    let producer = this.props.producer || DEFAULT_PRODUCER_CONFIGURATION;
    let readOnly = false;
    // whether show active producer tip to user, to let user know,
    // need to deactive it before user can modify
    let activeProducerTip = false;
    if (_.get(producer, 'system.state') === STATES.active) {
      readOnly = true;
      activeProducerTip = true;
    }
    let disableSaveBtn = true;
    let drawerTitle = formatMessage({ id: 'app.containers.Producers.drawerTitleCreate' });
    let primaryButtonTitle = formatMessage({ id: 'app.containers.Producers.registerNow' });
    if (producer.globalId) {
      // if *globalId* exist, then drawer title is
      drawerTitle = formatMessage({ id: 'app.containers.Producers.drawerTitleUpdate' });
      primaryButtonTitle = formatMessage({ id: 'app.common.messages.save' });
    }

    if (isFieldsTouched()) {
      // console.log('isFieldsTouched: ', isFieldsTouched());
      let currentFormValue = getFieldsValue();
      currentFormValue.globalId = producer.globalId;
      currentFormValue = { ...producer, ...currentFormValue };
      currentFormValue = filterOutEmptyValue(currentFormValue);
      producer = filterOutEmptyValue(producer);

      if (_.isEqual(currentFormValue, producer)) {
        disableSaveBtn = true;
      } else {
        disableSaveBtn = false;
      }
    }

    return (
      <div>
        <Drawer
          destroyOnClose
          title={drawerTitle}
          width={720}
          onClose={this.props.onCloseDrawer}
          visible={this.props.visiable}
        >
          {activeProducerTip ? (
            <div style={{ margin: '0 0 15px 0' }}>
              <Alert
                type="warning"
                showIcon
                message={formatHTMLMessage({ id: 'app.containers.Producers.activeProducerTip' })}
              />
            </div>
          ) : (
            ''
          )}
          <p>
            <FormattedHTMLMessage id="app.containers.Producers.registerProducerDescription" />
          </p>
          <Form className="producer-form" layout="vertical" style={{ paddingBottom: '35px' }}>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Producers.producerName' })}
                style={formItemStyle}
              >
                {getFieldDecorator('name', {
                  initialValue: producer.name,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.containers.Producers.producerNamePlaceholder' }),
                    },
                    {
                      min: 1,
                      max: 100,
                      message: formatMessage({ id: 'app.containers.Producers.producerNameInvalid' }),
                    },
                  ],
                })(
                  <Input
                    disabled={readOnly}
                    placeholder={formatMessage({ id: 'app.containers.Producers.producerNameExample' })}
                  />,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.producerNameDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Producers.producerDescription' })}
                style={formItemStyle}
              >
                {getFieldDecorator('description', {
                  initialValue: producer.description,
                  rules: [
                    // {
                    //   required: true,
                    //   message: formatMessage(
                    //     messages.producerDescriptionPlaceholder,
                    //   ),
                    // },
                    {
                      min: 1,
                      max: 200,
                      message: formatMessage({
                        id: 'app.containers.Producers.producerDescriptionInvalid',
                      }),
                    },
                  ],
                })(
                  <Input
                    disabled={readOnly}
                    placeholder={formatMessage({
                      id: 'app.containers.Producers.producerDescriptionExample',
                    })}
                  />,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.producerDescriptionDescription" />
              </FormDescription>
            </FormItemContainer>
            {producer.globalId ? (
              <FormItemContainer>
                <Form.Item
                  label={formatMessage({ id: 'app.common.messages.globalId' })}
                  style={formItemStyle}
                >
                  {getFieldDecorator('globalId', {
                    rules: [],
                  })(<Paragraph copyable>{producer.globalId}</Paragraph>)}
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
                label={formatMessage({ id: 'app.containers.Producers.producerType' })}
                style={formItemStyle}
              >
                {getFieldDecorator('type', {
                  initialValue: _.toUpper(
                    _.get(this, 'props.producer.type', PRODUCER_TYPES.headlessBrowser),
                  ),
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.containers.Producers.producerTypePlaceHolder' }),
                    },
                  ],
                })(
                  <Select
                    disabled={readOnly}
                    placeholder={formatMessage({
                      id: 'app.containers.Producers.producerTypePlaceHolder',
                    })}
                    // onChange={value => {
                    //   this.onProducerTypeChange(value);
                    // }}
                  >
                    {/*
                    <Select.Option value={PRODUCER_TYPES.browserExtension}>
                      <FormattedHTMLMessage id="app.containers.Producers.browserExtensionProducer" />
                    </Select.Option>
                    */}
                    <Select.Option value={PRODUCER_TYPES.headlessBrowser}>
                      <FormattedHTMLMessage id="app.containers.Producers.headlessProducer" />
                    </Select.Option>
                    <Select.Option value={PRODUCER_TYPES.service}>
                      <FormattedHTMLMessage id="app.containers.Producers.serviceProducer" />
                    </Select.Option>
                  </Select>,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.producerTypeDescription" />
              </FormDescription>
            </FormItemContainer>
            <h3>
              <FormattedHTMLMessage id="app.containers.Producers.producerConfiguration" />
            </h3>
            <p>
              <FormattedHTMLMessage id="app.containers.Producers.producerConfigurationDescription" />
            </p>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Producers.privateMode' })}
                style={formItemStyle}
              >
                {getFieldDecorator('private', {
                  initialValue: producer.private,
                  valuePropName: 'checked',
                })(
                  <Switch
                    disabled={readOnly}
                    checkedChildren={formatMessage({ id: 'app.containers.Producers.switchOn' })}
                    unCheckedChildren={formatMessage({ id: 'app.containers.Producers.switchOff' })}
                  />,
                )}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.privateModeDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({
                  id: 'app.containers.Producers.concurrentCollectTasks',
                })}
                style={formItemStyle}
              >
                {getFieldDecorator('concurrent', {
                  initialValue: producer.concurrent,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Producers.concurrentCollectTasksPlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Producers.invalidInteger' }),
                    },
                  ],
                })(<InputNumber disabled={readOnly} min={1} />)}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.concurrentCollectTasksDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Producers.pollingInterval' })}
                style={formItemStyle}
              >
                {getFieldDecorator('pollingInterval', {
                  initialValue: producer.pollingInterval,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Producers.pollingIntervalPlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Producers.invalidInteger' }),
                    },
                  ],
                })(<InputNumber disabled={readOnly} min={1} max={200} />)}
                <SecondUnitContainer>
                  {formatMessage({ id: 'app.containers.Producers.second' })}
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.pollingIntervalDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Producers.maxWaitingTime' })}
                style={formItemStyle}
              >
                {getFieldDecorator('maxWaitingTime', {
                  initialValue: producer.maxWaitingTime,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Producers.maxWaitingTimePlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Producers.invalidInteger' }),
                    },
                  ],
                })(<InputNumber disabled={readOnly} min={1} max={10} />)}
                <SecondUnitContainer>
                  {formatMessage({ id: 'app.containers.Producers.second' })}
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.maxWaitingTimeDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Producers.maxCollectTime' })}
                style={formItemStyle}
              >
                {getFieldDecorator('maxCollect', {
                  initialValue: producer.maxCollect,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Producers.maxCollectTimePlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Producers.invalidInteger' }),
                    },
                  ],
                })(<InputNumber disabled={readOnly} />)}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.maxCollectTimeDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Producers.producerIdleTime' })}
                style={formItemStyle}
              >
                {getFieldDecorator('idelTime', {
                  initialValue: producer.idelTime,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Producers.producerIdleTimePlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Producers.invalidInteger' }),
                    },
                  ],
                })(<InputNumber disabled={readOnly} min={0} max={100} />)}
                <SecondUnitContainer>
                  {formatMessage({ id: 'app.containers.Producers.second' })}
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.producerIdleTimeDescription" />
              </FormDescription>
            </FormItemContainer>
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Producers.requestTimeout' })}
                style={formItemStyle}
              >
                {getFieldDecorator('timeout', {
                  initialValue: producer.timeout,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Producers.requestTimeoutPlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Producers.invalidInteger' }),
                    },
                  ],
                })(<InputNumber disabled={readOnly} min={1} max={1000} />)}
                <SecondUnitContainer>
                  {formatMessage({ id: 'app.containers.Producers.second' })}
                </SecondUnitContainer>
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.requestTimeoutDescription" />
              </FormDescription>
            </FormItemContainer>
            {/*
            <FormItemContainer>
              <Form.Item
                label={formatMessage({ id: 'app.containers.Producers.maxRetryTime' })}
                style={formItemStyle}
              >
                {getFieldDecorator('maxRetry', {
                  initialValue: producer.maxRetry,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'app.containers.Producers.maxRetryTimePlaceholder',
                      }),
                    },
                    {
                      type: 'integer',
                      message: formatHTMLMessage({ id: 'app.containers.Producers.invalidInteger' }),
                    },
                  ],
                })(<InputNumber disabled={readOnly} min={1} max={5} />)}
              </Form.Item>
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Producers.maxRetryTimeDescription" />
              </FormDescription>
            </FormItemContainer>
            */}
            {/*
            {this.state.producerType === PRODUCER_TYPES.service
              <div>
                <FormItemContainer>
                  <Form.Item
                    label={formatMessage({ id: 'app.containers.Producers.baseURL' })}
                    style={formItemStyle}
                  >
                    {getFieldDecorator('baseURL', {
                      initialValue: producer.baseURL,
                      rules: [
                        {
                          required: true,
                          message: formatMessage({ id: 'app.containers.Producers.baseURLEmptyError' }),
                        },
                        {
        pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)([a-z0-9\.])*(:[0-9]{1,5})?(\/.*)?$/i,
                          message: formatMessage({ id: 'app.containers.Producers.baseURLEmptyError' }),
                        },
                      ],
                    })(
                      <Input
                        disabled={readOnly}
                        placeholder={formatMessage({ id: 'app.containers.Producers.baseURLExample' })}
                      />,
                    )}
                  </Form.Item>
                  <FormDescription>
                    <FormattedHTMLMessage id="app.containers.Producers.baseURLDescription" />
                  </FormDescription>
                </FormItemContainer>
                <h3>{formatMessage({ id: 'app.common.messages.healthTitle' })}</h3>
                <p>
                  <FormattedHTMLMessage id="app.containers.Producers.healthDescription" />
                </p>
                <Row gutter={16}>
                  <Col span={8}>
                    <FormItemContainer>
                      <Form.Item
                        label={formatMessage({ id: 'app.common.messages.httpMethod' })}
                        style={formItemStyle}
                      >
                        {getFieldDecorator('health.method', {
                          initialValue: _.get(this, 'props.producer.health.method', 'GET'),
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
                            disabled={readOnly}
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
                          initialValue: _.get(this, 'props.producer.health.path', '/health'),
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
                            disabled={readOnly}
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
              : ''}
              */}
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
              onClick={this.registerProducer}
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

// RegisterProducerForm.propTypes = {
//   visiable: PropTypes.bool,
//   onCloseDrawer: PropTypes.func,
//   producer: PropTypes.object,
// };

// export default Form.create()(injectIntl(RegisterProducerForm));
export default Form.create()(RegisterProducerForm);
