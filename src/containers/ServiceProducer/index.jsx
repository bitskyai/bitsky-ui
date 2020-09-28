/**
 *
 * HTTP Producer
 *
 */
import { Card, PageHeader, Button, Tag, Typography, Row, Col, Icon } from 'antd';
// import { InfoCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
// import $ from 'jquery';
import React from 'react';
import * as _ from 'lodash';
import { connect } from 'dva';
// import styled from 'styled-components';
// import ServiceProducerSkeleton from './ServiceProducerSkeleton';
import {
  getServiceConfig,
  startService,
  startingService,
  startServiceSuccess,
  startServiceFail,
  stopService,
  stoppingService,
  stopServiceSuccess,
  stopServiceFail,
} from './actions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './style.less';
import ServiceProducerForm from './ServiceProducerForm';
import ProducerType from '../../utils/ProducerType';
import StateTag from '../../utils/StateTag';

const { Paragraph } = Typography;

export class ServiceProducer extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.startServiceProducer.bind(this);
    this.stopServiceProducer.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getServiceConfig());
    // listen event send back from electron
    window.addEventListener('startingService', this.startingServiceHandler.bind(this), true);
    window.addEventListener('startedService', this.startedServiceHandler.bind(this), true);
    window.addEventListener('stoppingService', this.stoppingServiceHandler.bind(this), true);
    window.addEventListener('stoppedService', this.stoppedServiceHandler.bind(this), true);
  }

  componentWillUnmount() {
    window.removeEventListener('startingService', this.startingServiceHandler.bind(this), true);
    window.removeEventListener('startedService', this.startedServiceHandler.bind(this), true);
    window.removeEventListener('stoppingService', this.stoppingServiceHandler.bind(this), true);
    window.removeEventListener('stoppedService', this.stoppedServiceHandler.bind(this), true);
  }

  startingServiceHandler(event) {
    this.props.dispatch(startingService(event.detail && event.detail.data));
  }

  startedServiceHandler(event) {
    const payload = event.detail;
    if (payload) {
      if (payload.status) {
        this.props.dispatch(startServiceSuccess(payload.data));
      } else {
        this.props.dispatch(startServiceFail(payload.error));
      }
    }
  }

  stoppingServiceHandler(event) {
    this.props.dispatch(stoppingService(event.detail && event.detail.data));
  }

  stoppedServiceHandler(event) {
    const payload = event.detail;
    if (payload) {
      if (payload.status) {
        this.props.dispatch(stopServiceSuccess(payload.data));
      } else {
        this.props.dispatch(stopServiceFail(payload.error));
      }
    }
  }

  startServiceProducer() {
    this.props.dispatch(startService());
  }

  stopServiceProducer() {
    this.props.dispatch(stopService());
  }

  render() {
    const serviceConfig = this.props.service.data;
    const producerConfig = this.props.service.producer;
    const IconLink = ({ href, src, text }) => (
      <a className="page-header-doc-link" href={href}>
        <img className="page-header-doc-link-icon" src={src} alt={text} />
        {text}
      </a>
    );

    const description = (
      <>
        <Paragraph>
          <FormattedHTMLMessage id="app.containers.ServiceProducer.description" />
        </Paragraph>
        <div>
          <IconLink
            href="https://docs.bitsky.ai/"
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            text={formatMessage({ id: 'app.common.messages.action.gettingStart' })}
          />
          <IconLink
            href="https://docs.bitsky.ai/user-guides/service-producer"
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
          <Button
            key="stop"
            style={{ color: '#f50', border: '1px solid #f50' }}
            onClick={() => {
              this.stopServiceProducer();
            }}
          >
            <Icon type="pause-circle" />
            <FormattedMessage id="app.common.messages.action.stop" />
          </Button>
        );
      } else {
        tagColor = 'red';
        tagText = formatMessage({ id: 'app.common.messages.status.stopped' });
        operationBtn = (
          <Button
            key="start"
            style={{ color: '#1890ff', border: '1px solid #1890ff' }}
            onClick={() => {
              this.startServiceProducer();
            }}
          >
            <Icon type="caret-right" />
            <FormattedMessage id="app.common.messages.action.start" />
          </Button>
        );
      }
    }
    if (_.get(producerConfig, 'system.state')) {
      stateTag = <StateTag state={_.get(producerConfig, 'system.state')} />;
    }
    const serviceProducerURL = `http://localhost:${serviceConfig.PORT}`;
    return (
      <div>
        <>
          <div className="bitsky-page-header-ghost-wrapper">
            <PageHeader
              title={formatMessage({ id: 'menu.defaultService' })}
              subTitle={formatMessage({ id: 'app.containers.ServiceProducer.subTitle' })}
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
                <Button key="view" type="primary" disabled={!serviceConfig.RUNNING}>
                  <a href={serviceProducerURL}>
                    <Icon type="eye" />
                    <FormattedMessage id="app.common.messages.action.view" />
                  </a>
                </Button>,
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
                  <ServiceProducerForm />
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

export default connect(({ service }) => ({ service }))(ServiceProducer);
