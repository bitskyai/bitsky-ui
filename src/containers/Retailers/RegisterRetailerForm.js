/* eslint-disable react/no-danger */
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Typography,
  message,
  Divider,
  Collapse,
  Alert,
} from 'antd';
// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
// import messages from '../../locales/en-US/containers/Retailers';
// import commonMessages from '../../locales/en-US/globalMessages';

// import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
// import { exportDefaultSpecifier } from '@babel/types';
import styled from 'styled-components';
import { filterOutEmptyValue } from '../../utils/utils';
import { refreshRetailers } from './actions';
import { registerARetailer, updateRetailer } from '../../apis/retailers';

const { Paragraph } = Typography;
const { Panel } = Collapse;

const FormDescription = styled(Paragraph)`
  padding: 5px 0;
  margin-bottom: 0 !important;
`;

const formItemStyle = { marginBottom: 0 };

class RegisterRetailerForm extends React.Component {
  state = { sending: false };

  // hasErrors(fieldsError) {
  //   return Object.keys(fieldsError).some(field => fieldsError[field]);
  // }

  registerRetailer = e => {
    e.preventDefault();
    // const { formatMessage } = this.props.intl;
    this.setState({ sending: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          if (this.props.retailer) {
            values.globalId = this.props.retailer.globalId;
            await updateRetailer(values);
            this.props.dispatch(refreshRetailers());
          } else {
            await registerARetailer(values);
            this.props.dispatch(refreshRetailers());
          }
          const msg = formatMessage({ id: 'app.containers.Retailers.registerRetailerSuccessful' });
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
    // const { formatMessage } = this.props.intl;
    let { retailer } = this.props;
    let disableSaveBtn = true;

    let drawerTitle = formatMessage({ id: 'app.containers.Retailers.drawerTitle' });
    let primaryButtonTitle = formatMessage({ id: 'app.common.messages.create' });
    if (this.props.retailer && this.props.retailer.globalId) {
      // if *globalId* exist, then drawer title is
      drawerTitle = formatMessage({ id: 'app.containers.Retailers.drawerTitleUpdate' });
      primaryButtonTitle = formatMessage({ id: 'app.common.messages.save' });
    }

    if (isFieldsTouched()) {
      // console.log('isFieldsTouched: ', isFieldsTouched());
      let currentFormValue = getFieldsValue();
      currentFormValue.globalId = retailer && retailer.globalId;
      currentFormValue = { ...retailer, ...currentFormValue };
      currentFormValue = filterOutEmptyValue(currentFormValue);
      retailer = filterOutEmptyValue(retailer);

      if (_.isEqual(currentFormValue, retailer)) {
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
          <p>
            <FormattedHTMLMessage id="app.containers.Retailers.registerRetailerDescription" />
          </p>
          <Divider />
          <Form layout="vertical" style={{ paddingBottom: '35px' }}>
            <Form.Item
              label={formatMessage({ id: 'app.containers.Retailers.retailerName' })}
              style={formItemStyle}
            >
              {getFieldDecorator('name', {
                initialValue: this.props.retailer && this.props.retailer.name,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'app.containers.Retailers.retailerNamePlaceholder',
                    }),
                  },
                  {
                    min: 1,
                    max: 100,
                    message: formatMessage({ id: 'app.containers.Retailers.retailerNameInvalid' }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'app.containers.Retailers.retailerNameExample',
                  })}
                />,
              )}
              <FormDescription>
                {formatMessage({ id: 'app.containers.Retailers.retailerNameDescription' })}
              </FormDescription>
            </Form.Item>
            <Form.Item
              label={formatMessage({ id: 'app.common.messages.globalId' })}
              style={formItemStyle}
            >
              {this.props.retailer
                ? getFieldDecorator('globalId', {
                    rules: [],
                  })(<Paragraph copyable>{this.props.retailer.globalId}</Paragraph>)
                : <Paragraph><code>{formatMessage({ id: 'app.common.messages.globalIdEmpty' })}</code></Paragraph>}
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Retailers.globalIdDescription" />
              </FormDescription>
            </Form.Item>
            <Form.Item
              label={formatMessage({ id: 'app.containers.Retailers.baseURL' })}
              style={formItemStyle}
            >
              {getFieldDecorator('baseURL', {
                initialValue: this.props.retailer && this.props.retailer.baseURL,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.containers.Retailers.baseURLEmptyError' }),
                  },
                  {
                    pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)([a-z0-9\.])*(:[0-9]{1,5})?(\/.*)?$/i,
                    message: formatMessage({ id: 'app.containers.Retailers.baseURLEmptyError' }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({ id: 'app.containers.Retailers.baseURLExample' })}
                />,
              )}
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Retailers.baseURLDescription" />
              </FormDescription>
            </Form.Item>
            <Collapse>
              <Panel header={formatMessage({ id: 'app.common.messages.advanced' })}>
                <Alert
                  message={formatMessage({ id: 'app.common.messages.advancedDescription' })}
                  type="warning"
                  style={{ marginBottom: '16px' }}
                />
                <h3>
                  <FormattedMessage id="app.containers.Retailers.callbackSectionTitle" />
                </h3>
                <p>
                  <FormattedHTMLMessage id="app.containers.Retailers.callbackDescription" />
                </p>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label={formatMessage({ id: 'app.containers.Retailers.httpMethod' })}
                      style={formItemStyle}
                    >
                      {getFieldDecorator('callback.method', {
                        initialValue: _.get(this, 'props.retailer.callback.method', 'POST'),
                        rules: [
                          {
                            required: true,
                            message: formatMessage({
                              id: 'app.containers.Retailers.httpMethodPlaceHolder',
                            }),
                          },
                        ],
                      })(
                        <Select
                          placeholder={formatMessage({
                            id: 'app.containers.Retailers.httpMethodPlaceHolder',
                          })}
                        >
                          <Select.Option value="GET">GET</Select.Option>
                          <Select.Option value="POST">POST</Select.Option>
                          <Select.Option value="PUT">PUT</Select.Option>
                          <Select.Option value="DELETE">DELETE</Select.Option>
                        </Select>,
                      )}
                      <FormDescription>
                        <FormattedHTMLMessage id="app.containers.Retailers.httpMethodDescription" />
                      </FormDescription>
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      label={formatMessage({ id: 'app.common.messages.urlPath' })}
                      style={formItemStyle}
                    >
                      {getFieldDecorator('callback.path', {
                        initialValue: _.get(this, 'props.retailer.callback.path', '/apis/tasks'),
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
                      <FormDescription>
                        <FormattedHTMLMessage id="app.common.messages.urlPathDescription" />
                      </FormDescription>
                    </Form.Item>
                  </Col>
                </Row>
                <h3>
                  <FormattedMessage id="app.common.messages.healthTitle" />
                </h3>
                <p>
                  <FormattedHTMLMessage id="app.containers.Retailers.healthDescription" />
                </p>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label={formatMessage({ id: 'app.containers.Retailers.httpMethod' })}
                      style={formItemStyle}
                    >
                      {getFieldDecorator('health.method', {
                        initialValue: _.get(this, 'props.retailer.health.method', 'GET'),
                        rules: [
                          {
                            required: true,
                            message: formatMessage({
                              id: 'app.containers.Retailers.httpMethodPlaceHolder',
                            }),
                          },
                        ],
                      })(
                        <Select
                          placeholder={formatMessage({
                            id: 'app.containers.Retailers.httpMethodPlaceHolder',
                          })}
                        >
                          <Select.Option value="GET">GET</Select.Option>
                          <Select.Option value="POST">POST</Select.Option>
                          <Select.Option value="PUT">PUT</Select.Option>
                          <Select.Option value="DELETE">DELETE</Select.Option>
                        </Select>,
                      )}
                      <FormDescription>
                        <FormattedHTMLMessage id="app.containers.Retailers.httpMethodDescription" />
                      </FormDescription>
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      label={formatMessage({ id: 'app.common.messages.urlPath' })}
                      style={formItemStyle}
                    >
                      {getFieldDecorator('health.path', {
                        initialValue: _.get(this, 'props.retailer.health.path', '/health'),
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
                      <FormDescription>
                        <FormattedHTMLMessage id="app.common.messages.urlPathDescription" />
                      </FormDescription>
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
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
              <FormattedMessage id="app.common.messages.cancel" />
            </Button>
            <Button
              disabled={disableSaveBtn}
              loading={this.state.sending}
              onClick={this.registerRetailer}
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

// RegisterRetailerForm.propTypes = {
//   visiable: PropTypes.bool,
//   onCloseDrawer: PropTypes.func,
//   retailer: PropTypes.object,
// };

// export default Form.create()(injectIntl(RegisterRetailerForm));
export default Form.create()(RegisterRetailerForm);
