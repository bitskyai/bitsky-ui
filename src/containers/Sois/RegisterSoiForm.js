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
  Select,
  Typography,
  message,
} from 'antd';
const { Paragraph, Text } = Typography;
import messages from './messages';
import commonMessages from '../../locales/en-US/globalMessages';
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
          if(this.props.soi){
            values.globalId = this.props.soi.globalId;
            await updateSOI(values);
            this.props.dispatch(refreshSOIs());
          }else{
            await registerASOI(values);
            this.props.dispatch(refreshSOIs());
          }
          let msg = formatMessage(messages.registerSOISuccessful);
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
    // const { formatMessage } = this.props.intl;
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
            <FormattedHTMLMessage {...messages.registerSOIDescription} />
          </p>
          <Form layout="vertical" style={{ paddingBottom: '35px' }}>
            <Form.Item
              label={formatMessage(messages.soiName)}
              style={formItemStyle}
            >
              {getFieldDecorator('name', {
                initialValue: this.props.soi && this.props.soi.name,
                rules: [
                  {
                    required: true,
                    message: formatMessage(messages.soiNamePlaceholder),
                  },
                  {
                    min: 3,
                    max: 20,
                    message: formatMessage(messages.soiNameInvalid),
                  },
                ],
              })(
                <Input placeholder={formatMessage(messages.soiNameExample)} />,
              )}
              <FormDescription>
                <FormattedHTMLMessage {...messages.soiNameDescription} />
              </FormDescription>
            </Form.Item>
            {this.props.soi ? (
              <Form.Item
                label={formatMessage(messages.globalId)}
                style={formItemStyle}
              >
                {getFieldDecorator('globalId', {
                  rules: [
                  ],
                })(
                  <p>{this.props.soi.globalId}</p>,
                )}
                <FormDescription>
                  <FormattedHTMLMessage {...messages.globalIdDescription} />
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
              label={formatMessage(messages.baseURL)}
              style={formItemStyle}
            >
              {getFieldDecorator('baseURL', {
                initialValue: this.props.soi && this.props.soi.baseURL,
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
                <Input placeholder={formatMessage(messages.baseURLExample)} />,
              )}
              <FormDescription>
                <FormattedHTMLMessage {...messages.baseURLDescription} />
              </FormDescription>
            </Form.Item>
            <h3>
              <FormattedMessage {...messages.callbackSectionTitle} />
            </h3>
            <p>
              <FormattedHTMLMessage {...messages.callbackDescription} />
            </p>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={formatMessage(messages.httpMethod)}
                  style={formItemStyle}
                >
                  {getFieldDecorator('callback.method', {
                    initialValue: _.get(this, 'props.soi.callback.method', 'POST'),
                    rules: [
                      {
                        required: true,
                        message: formatMessage(messages.httpMethodPlaceHolder),
                      },
                    ],
                  })(
                    <Select
                      placeholder={formatMessage(
                        messages.httpMethodPlaceHolder,
                      )}
                    >
                      <Select.Option value="GET">GET</Select.Option>
                      <Select.Option value="POST">POST</Select.Option>
                      <Select.Option value="PUT">PUT</Select.Option>
                      <Select.Option value="DELETE">DELETE</Select.Option>
                    </Select>,
                  )}
                  <FormDescription>
                    <FormattedHTMLMessage {...messages.httpMethodDescription} />
                  </FormDescription>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label={formatMessage(messages.urlPath)}
                  style={formItemStyle}
                >
                  {getFieldDecorator('callback.path', {
                    initialValue: _.get(this, 'props.soi.callback.path', '/apis/intelligences'),
                    rules: [
                      {
                        required: true,
                        message: formatMessage(messages.urlPathPlaceHolder),
                      },
                    ],
                  })(
                    <Input
                      placeholder={formatMessage(messages.urlPathPlaceHolder)}
                    />,
                  )}
                  <FormDescription>
                    <FormattedHTMLMessage {...messages.urlPathDescription} />
                  </FormDescription>
                </Form.Item>
              </Col>
            </Row>
            <h3>
              <FormattedMessage {...messages.healthTitle} />
            </h3>
            <p>
              <FormattedHTMLMessage {...messages.healthDescription} />
            </p>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={formatMessage(messages.httpMethod)}
                  style={formItemStyle}
                >
                  {getFieldDecorator('health.method', {
                    initialValue: _.get(this, 'props.soi.health.method', 'GET'),
                    rules: [
                      {
                        required: true,
                        message: formatMessage(messages.httpMethodPlaceHolder),
                      },
                    ],
                  })(
                    <Select
                      placeholder={formatMessage(
                        messages.httpMethodPlaceHolder,
                      )}
                    >
                      <Select.Option value="GET">GET</Select.Option>
                      <Select.Option value="POST">POST</Select.Option>
                      <Select.Option value="PUT">PUT</Select.Option>
                      <Select.Option value="DELETE">DELETE</Select.Option>
                    </Select>,
                  )}
                  <FormDescription>
                    <FormattedHTMLMessage {...messages.httpMethodDescription} />
                  </FormDescription>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label={formatMessage(messages.urlPath)}
                  style={formItemStyle}
                >
                  {getFieldDecorator('health.path', {
                    initialValue: _.get(this, 'props.soi.health.path', '/health'),
                    rules: [
                      {
                        required: true,
                        message: formatMessage(messages.urlPathPlaceHolder),
                      },
                    ],
                  })(
                    <Input
                      placeholder={formatMessage(messages.urlPathPlaceHolder)}
                    />,
                  )}
                  <FormDescription>
                    <FormattedHTMLMessage {...messages.urlPathDescription} />
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
            <Button
              onClick={this.props.onCloseDrawer}
              style={{ marginRight: 8 }}
            >
              <FormattedMessage {...commonMessages.cancel} />
            </Button>
            <Button
              // disabled={!isFieldsTouched() || this.hasErrors(getFieldsError())}
              loading={this.state.sending}
              onClick={this.registerSOI}
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

RegisterSoiForm.propTypes = {
  visiable: PropTypes.bool,
  onCloseDrawer: PropTypes.func,
  soi: PropTypes.object,
};

// export default Form.create()(injectIntl(RegisterSoiForm));
export default Form.create()(RegisterSoiForm);
