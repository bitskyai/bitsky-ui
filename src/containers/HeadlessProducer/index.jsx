/**
 *
 * Headless Producer
 *
 */
import { Card, PageHeader, Button, Tag, Typography, Row, Col, Icon } from 'antd';
import { FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import * as _ from 'lodash';
import { connect } from 'dva';
// import styled from 'styled-components';
// import HeadlessProducerSkeleton from './HeadlessProducerSkeleton';
import {
  getHeadlessConfig,
  startHeadless,
  startingHeadless,
  startHeadlessSuccess,
  startHeadlessFail,
  stopHeadless,
  stoppingHeadless,
  stopHeadlessSuccess,
  stopHeadlessFail,
} from './actions';
import HeadlessProducerForm from './HeadlessProducerForm';
import ProducerType from '../../utils/ProducerType';
import StateTag from '../../utils/StateTag';
import './style.less';

const { Paragraph } = Typography;

export class HeadlessProducer extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.startHeadlessProducer.bind(this);
    this.stopHeadlessProducer.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getHeadlessConfig());
    // listen event send back from electron
    window.addEventListener('startingHeadless', this.startingHeadlessHandler.bind(this), true);
    window.addEventListener('startedHeadless', this.startedHeadlessHandler.bind(this), true);
    window.addEventListener('stoppingHeadless', this.stoppingHeadlessHandler.bind(this), true);
    window.addEventListener('stoppedHeadless', this.stoppedHeadlessHandler.bind(this), true);
  }

  componentWillUnmount() {
    window.removeEventListener('startingHeadless', this.startingHeadlessHandler.bind(this), true);
    window.removeEventListener('startedHeadless', this.startedHeadlessHandler.bind(this), true);
    window.removeEventListener('stoppingHeadless', this.stoppingHeadlessHandler.bind(this), true);
    window.removeEventListener('stoppedHeadless', this.stoppedHeadlessHandler.bind(this), true);
  }

  startingHeadlessHandler(event) {
    this.props.dispatch(startingHeadless(event.detail && event.detail.data));
  }

  startedHeadlessHandler(event) {
    const payload = event.detail;
    if (payload) {
      if (payload.status) {
        this.props.dispatch(startHeadlessSuccess(payload.data));
      } else {
        this.props.dispatch(startHeadlessFail(payload.error));
      }
    }
  }

  stoppingHeadlessHandler(event) {
    this.props.dispatch(stoppingHeadless(event.detail && event.detail.data));
  }

  stoppedHeadlessHandler(event) {
    const payload = event.detail;
    if (payload) {
      if (payload.status) {
        this.props.dispatch(stopHeadlessSuccess(payload.data));
      } else {
        this.props.dispatch(stopHeadlessFail(payload.error));
      }
    }
  }

  startHeadlessProducer() {
    this.props.dispatch(startHeadless());
  }

  stopHeadlessProducer() {
    this.props.dispatch(stopHeadless());
  }

  render() {
    const headlessConfig = this.props.headless.data;
    const producerConfig = this.props.headless.producer;
    const IconLink = ({ href, src, text }) => (
      <a className="page-header-doc-link" href={href}>
        <img className="page-header-doc-link-icon" src={src} alt={text} />
        {text}
      </a>
    );

    const description = (
      <>
        <Paragraph>
          <FormattedHTMLMessage id="app.containers.HeadlessProducer.description" />
        </Paragraph>
        <div>
          <IconLink
            href="https://docs.bitsky.ai/"
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            text={formatMessage({ id: 'app.common.messages.action.gettingStart' })}
          />
          <IconLink
            href="https://docs.bitsky.ai/user-guides/headless-producer"
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
    if (headlessConfig) {
      producerTypeTag = <ProducerType type={headlessConfig.TYPE} />;
      if (headlessConfig.STARTING) {
        tagColor = 'blue';
        tagText = formatMessage({ id: 'app.common.messages.status.starting' });
        operationBtn = (
          <Button key="processing" loading={headlessConfig.STARTING || headlessConfig.STOPPING}>
            {tagText}
          </Button>
        );
      } else if (headlessConfig.STOPPING) {
        tagColor = 'blue';
        tagText = formatMessage({ id: 'app.common.messages.status.stopping' });
        operationBtn = (
          <Button key="processing" loading={headlessConfig.STARTING || headlessConfig.STOPPING}>
            {tagText}
          </Button>
        );
      } else if (headlessConfig.RUNNING) {
        tagColor = 'green';
        tagText = formatMessage({ id: 'app.common.messages.status.running' });
        operationBtn = (
          <Button
            key="stop"
            style={{ color: '#f50', border: '1px solid #f50' }}
            onClick={() => {
              this.stopHeadlessProducer();
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
              this.startHeadlessProducer();
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
    const headlessProducerURL = `http://localhost:${headlessConfig.PORT}`;
    return (
      <div>
        <>
          <div className="munew-page-header-ghost-wrapper">
            <PageHeader
              title={formatMessage({ id: 'menu.defaultHeadless' })}
              subTitle={formatMessage({ id: 'app.containers.HeadlessProducer.subTitle' })}
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
                <Button key="view" type="primary" disabled={!headlessConfig.RUNNING}>
                  <a href={headlessProducerURL}>
                    <Icon type="eye" />
                    <FormattedMessage id="app.common.messages.action.view" />
                  </a>
                </Button>,
              ]}
            >
              <Content>{description}</Content>
            </PageHeader>
          </div>
          <div className="munew-producer-config-card">
            <Card hoverable>
              <Row>
                <Col xs={0} sm={0} md={0} lg={1} xl={2}></Col>
                <Col xs={24} sm={24} md={24} lg={22} xl={20}>
                  <HeadlessProducerForm />
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

export default connect(({ headless }) => ({ headless }))(HeadlessProducer);
