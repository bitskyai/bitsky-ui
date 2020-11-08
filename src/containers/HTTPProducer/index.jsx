/**
 *
 * HTTP Producer
 *
 */
import { Card, PageHeader, Button, Tag, Typography, Row, Col, Icon, Tooltip } from 'antd';
// import { InfoCircleOutlined } from '@ant-design/icons';
// import $ from 'jquery';
import React from 'react';
import * as _ from 'lodash';
import { connect, FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi';
// import styled from 'styled-components';
// import HTTPProducerSkeleton from './HTTPProducerSkeleton';
import {
  getServiceConfig,
  startService,
  startingHTTP,
  startServiceSuccess,
  startServiceFail,
  stopService,
  stoppingHTTP,
  stopServiceSuccess,
  stopServiceFail,
} from './actions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './style.less';
import HTTPProducerForm from './HTTPProducerForm';
import ProducerType from '../../utils/ProducerType';
import StateTag from '../../utils/StateTag';

const { Paragraph } = Typography;

export class HTTPProducer extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.startHTTPProducer.bind(this);
    this.stopHTTPProducer.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getServiceConfig());
    // listen event send back from electron
    window.addEventListener('startingHTTP', this.startingHTTPHandler.bind(this), true);
    window.addEventListener('startedHTTP', this.startedHTTPHandler.bind(this), true);
    window.addEventListener('stoppingHTTP', this.stoppingHTTPHandler.bind(this), true);
    window.addEventListener('stoppedHTTP', this.stoppedHTTPHandler.bind(this), true);
  }

  componentWillUnmount() {
    window.removeEventListener('startingHTTP', this.startingHTTPHandler.bind(this), true);
    window.removeEventListener('startedHTTP', this.startedHTTPHandler.bind(this), true);
    window.removeEventListener('stoppingHTTP', this.stoppingHTTPHandler.bind(this), true);
    window.removeEventListener('stoppedHTTP', this.stoppedHTTPHandler.bind(this), true);
  }

  startingHTTPHandler(event) {
    this.props.dispatch(startingHTTP(event.detail && event.detail.data));
  }

  startedHTTPHandler(event) {
    const payload = event.detail;
    if (payload) {
      if (payload.status) {
        this.props.dispatch(startServiceSuccess(payload.data));
      } else {
        this.props.dispatch(startServiceFail(payload.error));
      }
    }
  }

  stoppingHTTPHandler(event) {
    this.props.dispatch(stoppingHTTP(event.detail && event.detail.data));
  }

  stoppedHTTPHandler(event) {
    const payload = event.detail;
    if (payload) {
      if (payload.status) {
        this.props.dispatch(stopServiceSuccess(payload.data));
      } else {
        this.props.dispatch(stopServiceFail(payload.error));
      }
    }
  }

  startHTTPProducer() {
    this.props.dispatch(startService());
  }

  stopHTTPProducer() {
    this.props.dispatch(stopService());
  }

  render() {
    const serviceConfig = this.props.http.data;
    const producerConfig = this.props.http.producer;
    const IconLink = ({ href, src, text }) => (
      <a className="page-header-doc-link" href={href}>
        <img className="page-header-doc-link-icon" src={src} alt={text} />
        {text}
      </a>
    );

    const description = (
      <>
        <Paragraph>
          <FormattedHTMLMessage id="app.containers.HTTPProducer.description" />
        </Paragraph>
        <div>
          <IconLink
            href="https://docs.bitsky.ai/"
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            text={formatMessage({ id: 'app.common.messages.action.gettingStart' })}
          />
          <IconLink
            href="https://docs.bitsky.ai/user-guides/http-producer"
            src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
            text={formatMessage({ id: 'app.common.messages.action.more' })}
          />
        </div>
      </>
    );
    const Content = ({ children }) => (
      <Row>
        <div style={{ flex: 1 }}>{children}</div>
      </Row>
    );
    let tagColor = 'red';
    let tagText = formatMessage({ id: 'app.common.messages.status.stopped' });
    let operationBtn;
    let producerTypeTag = '';
    let stateTag = '';
    if (serviceConfig) {
      producerTypeTag = <ProducerType type={serviceConfig.TYPE} />;
      if (serviceConfig.STARTING) {
        tagColor = 'blue';
        tagText = formatMessage({ id: 'app.common.messages.status.starting' });
        operationBtn = (
          <Button key="processing" loading={serviceConfig.STARTING || serviceConfig.STOPPING}>
            {tagText}
          </Button>
        );
      } else if (serviceConfig.STOPPING) {
        tagColor = 'blue';
        tagText = formatMessage({ id: 'app.common.messages.status.stopping' });
        operationBtn = (
          <Button key="processing" loading={serviceConfig.STARTING || serviceConfig.STOPPING}>
            {tagText}
          </Button>
        );
      } else if (serviceConfig.RUNNING) {
        tagColor = 'green';
        tagText = formatMessage({ id: 'app.common.messages.status.running' });
        operationBtn = (
          <Tooltip
            title={
              <FormattedHTMLMessage id="app.common.messages.action.stopHint"></FormattedHTMLMessage>
            }
          >
            <Button
              key="stop"
              style={{ color: '#f50', border: '1px solid #f50' }}
              onClick={() => {
                this.stopHTTPProducer();
              }}
            >
              <Icon type="pause-circle" />
              <FormattedMessage id="app.common.messages.action.stop" />
            </Button>
          </Tooltip>
        );
      } else {
        tagColor = 'red';
        tagText = formatMessage({ id: 'app.common.messages.status.stopped' });
        operationBtn = (
          <Tooltip
            title={
              <FormattedHTMLMessage id="app.common.messages.action.startHint"></FormattedHTMLMessage>
            }
          >
            <Button
              key="start"
              style={{ color: '#1890ff', border: '1px solid #1890ff' }}
              onClick={() => {
                this.startHTTPProducer();
              }}
            >
              <Icon type="caret-right" />
              <FormattedMessage id="app.common.messages.action.start" />
            </Button>
          </Tooltip>
        );
      }
    }
    if (_.get(producerConfig, 'system.state')) {
      stateTag = <StateTag state={_.get(producerConfig, 'system.state')} />;
    }
    const httpProducerURL = `http://localhost:${serviceConfig.PORT}`;
    return (
      <div>
        <>
          <div className="bitsky-page-header-ghost-wrapper">
            <PageHeader
              title={formatMessage({ id: 'menu.defaultHTTP' })}
              subTitle={formatMessage({ id: 'app.containers.HTTPProducer.subTitle' })}
              className="site-page-header"
              tags={
                <>
                  {producerTypeTag}
                  <Tag color={tagColor}>{tagText}</Tag>
                  {stateTag}
                </>
              }
              extra={[
                operationBtn,
                <Tooltip
                  title={
                    <FormattedHTMLMessage id="app.common.messages.action.viewHint"></FormattedHTMLMessage>
                  }
                >
                  <Button key="view" type="primary" disabled={!serviceConfig.RUNNING}>
                    <a href={httpProducerURL}>
                      <Icon type="eye" />
                      <FormattedMessage id="app.common.messages.action.view" />
                    </a>
                  </Button>
                </Tooltip>,
              ]}
            >
              <Content>{description}</Content>
            </PageHeader>
          </div>
          <div className="bitsky-producer-config-card">
            <Card hoverable>
              <Row>
                <Col xs={0} sm={0} md={0} lg={1} xl={2}></Col>
                <Col xs={24} sm={24} md={24} lg={22} xl={20}>
                  <HTTPProducerForm />
                </Col>
                <Col xs={0} sm={0} md={0} lg={1} xl={2}></Col>
              </Row>
            </Card>
          </div>
        </>
      </div>
    );
  }
}

export default connect(({ http }) => ({ http }))(HTTPProducer);
