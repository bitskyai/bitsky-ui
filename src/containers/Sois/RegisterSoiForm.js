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
import { Drawer, Form, Button, Col, Row, Input, Select, Typography, message } from 'antd';
const { Paragraph, Text } = Typography;
// import messages from '../../locales/en-US/containers/Sois';
// import commonMessages from '../../locales/en-US/globalMessages';
import { registerASOI, updateSOI } from '../../apis/sois';
import { refreshSOIs } from './actions';

const FormDescription = styled(Paragraph)`
  padding: 5px 0;
  margin-bottom: 0 !important;
`;

const formItemStyle = { marginBottom: 0 };

class RegisterSoiForm extends React.Component {
  state = { sending: false };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  registerSOI = e => {
    e.preventDefault();
    // const { formatMessage } = this.props.intl;
    this.setState({ sending: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log(values);
        try {
          if (this.props.soi) {
            values.globalId = this.props.soi.globalId;
            await updateSOI(values);
            this.props.dispatch(refreshSOIs());
          } else {
            await registerASOI(values);
            this.props.dispatch(refreshSOIs());
          }
          let msg = formatMessage({ id: 'app.containers.Sois.registerSOISuccessful' });
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
    const { getFieldDecorator, getFieldsError, isFieldsTouched } = this.props.form;
    // const { formatMessage } = this.props.intl;
    return (
      <div>
        <Drawer
          destroyOnClose={true}
          title={formatMessage({ id: 'app.containers.Sois.drawerTitle' })}
          width={720}
          onClose={this.props.onCloseDrawer}
          visible={this.props.visiable}
        >
          <p>{formatMessage({ id: 'app.containers.Sois.registerSOIDescription' })}</p>
          <Form layout="vertical" style={{ paddingBottom: '35px' }}>
            <Form.Item
              label={formatMessage({ id: 'app.containers.Sois.soiName' })}
              style={formItemStyle}
            >
              {getFieldDecorator('name', {
                initialValue: this.props.soi && this.props.soi.name,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.containers.Sois.soiNamePlaceholder' }),
                  },
                  {
                    min: 3,
                    max: 20,
                    message: formatMessage({ id: 'app.containers.Sois.soiNameInvalid' }),
                  },
                ],
              })(
                <Input placeholder={formatMessage({ id: 'app.containers.Sois.soiNameExample' })} />,
              )}
              <FormDescription>
                {formatMessage({ id: 'app.containers.Sois.soiNameDescription' })}
              </FormDescription>
            </Form.Item>
            {this.props.soi ? (
              <Form.Item
                label={formatMessage({ id: 'app.containers.Sois.globalId' })}
                style={formItemStyle}
              >
                {getFieldDecorator('globalId', {
                  rules: [],
                })(<p>{this.props.soi.globalId}</p>)}
                <FormDescription>
                  <FormattedHTMLMessage id="app.containers.Sois.globalIdDescription" />
                </FormDescription>
              </Form.Item>
            ) : (
              ''
              // <Form.Item
              //   label={formatMessage(messages.globalId)}
              //   style={formItemStyle}
              // >
              //   {getFieldDecorator('globalId', {
              //     rules: [
              //       {
              //         required: true,
              //         message: formatMessage(messages.globalIdPlaceholder),
              //       },
              //     ],
              //   })(
              //     <Input
              //       placeholder={formatMessage(messages.globalIdExample)}
              //     />,
              //   )}
              //   <FormDescription>
              //     <FormattedHTMLMessage {...messages.globalIdDescription} />
              //   </FormDescription>
              // </Form.Item>
            )}
            <Form.Item
              label={formatMessage({ id: 'app.containers.Sois.baseURL' })}
              style={formItemStyle}
            >
              {getFieldDecorator('baseURL', {
                initialValue: this.props.soi && this.props.soi.baseURL,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.containers.Sois.baseURLEmptyError' }),
                  },
                  {
                    pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)([a-z0-9\.])*(:[0-9]{1,5})?(\/.*)?$/i,
                    message: formatMessage({ id: 'app.containers.Sois.baseURLEmptyError' }),
                  },
                ],
              })(
                <Input placeholder={formatMessage({ id: 'app.containers.Sois.baseURLExample' })} />,
              )}
              <FormDescription>
                <FormattedHTMLMessage id="app.containers.Sois.baseURLDescription" />
              </FormDescription>
            </Form.Item>
            <h3>
              <FormattedMessage id="app.containers.Sois.callbackSectionTitle" />
            </h3>
            <p>
              <FormattedHTMLMessage id="app.containers.Sois.callbackDescription" />
            </p>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={formatMessage({ id: 'app.containers.Sois.httpMethod' })}
                  style={formItemStyle}
                >
                  {getFieldDecorator('callback.method', {
                    initialValue: _.get(this, 'props.soi.callback.method', 'POST'),
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.containers.Sois.httpMethodPlaceHolder' }),
                      },
                    ],
                  })(
                    <Select
                      placeholder={formatMessage({
                        id: 'app.containers.Sois.httpMethodPlaceHolder',
                      })}
                    >
                      <Select.Option value="GET">GET</Select.Option>
                      <Select.Option value="POST">POST</Select.Option>
                      <Select.Option value="PUT">PUT</Select.Option>
                      <Select.Option value="DELETE">DELETE</Select.Option>
                    </Select>,
                  )}
                  <FormDescription>
                    <FormattedHTMLMessage id="app.containers.Sois.httpMethodDescription" />
                  </FormDescription>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label={formatMessage({ id: 'app.common.messages.urlPath' })}
                  style={formItemStyle}
                >
                  {getFieldDecorator('callback.path', {
                    initialValue: _.get(this, 'props.soi.callback.path', '/apis/intelligences'),
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.common.messages.urlPathPlaceHolder' }),
                      },
                    ],
                  })(
                    <Input
                      placeholder={formatMessage({ id: 'app.common.messages.urlPathPlaceHolder' })}
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
              <FormattedHTMLMessage id="app.containers.Sois.healthDescription" />
            </p>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={formatMessage({ id: 'app.containers.Sois.httpMethod' })}
                  style={formItemStyle}
                >
                  {getFieldDecorator('health.method', {
                    initialValue: _.get(this, 'props.soi.health.method', 'GET'),
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.containers.Sois.httpMethodPlaceHolder' }),
                      },
                    ],
                  })(
                    <Select
                      placeholder={formatMessage({
                        id: 'app.containers.Sois.httpMethodPlaceHolder',
                      })}
                    >
                      <Select.Option value="GET">GET</Select.Option>
                      <Select.Option value="POST">POST</Select.Option>
                      <Select.Option value="PUT">PUT</Select.Option>
                      <Select.Option value="DELETE">DELETE</Select.Option>
                    </Select>,
                  )}
                  <FormDescription>
                    <FormattedHTMLMessage id="app.containers.Sois.httpMethodDescription" />
                  </FormDescription>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label={formatMessage({ id: 'app.common.messages.urlPath' })}
                  style={formItemStyle}
                >
                  {getFieldDecorator('health.path', {
                    initialValue: _.get(this, 'props.soi.health.path', '/health'),
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.common.messages.urlPathPlaceHolder' }),
                      },
                    ],
                  })(
                    <Input
                      placeholder={formatMessage({ id: 'app.common.messages.urlPathPlaceHolder' })}
                    />,
                  )}
                  <FormDescription>
                    <FormattedHTMLMessage id="app.common.messages.urlPathDescription" />
                  </FormDescription>
                </Form.Item>
              </Col>
            </Row>
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
              // disabled={!isFieldsTouched() || this.hasErrors(getFieldsError())}
              loading={this.state.sending}
              onClick={this.registerSOI}
              type="primary"
            >
              <FormattedMessage id="app.containers.Sois.registerNow" />
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

RegisterSoiForm.propTypes = {
  visiable: PropTypes.bool,
  onCloseDrawer: PropTypes.func,
  soi: PropTypes.object,
};

// export default Form.create()(injectIntl(RegisterSoiForm));
export default Form.create()(RegisterSoiForm);
