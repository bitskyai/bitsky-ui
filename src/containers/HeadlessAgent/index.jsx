/**
 *
 * Headless Agent
 *
 */
import { Card, PageHeader, Button, Tag, Typography, Row, Col, Icon } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import $ from 'jquery';
import React from 'react';
import * as _ from 'lodash';
import { connect } from 'dva';
import styled from 'styled-components';
import HeadlessAgentSkeleton from './HeadlessAgentSkeleton';
import { getHeadlessConfig } from './actions';
import styles from './style.less';
import HeadlessAgentForm from './HeadlessAgentForm';

const { Paragraph } = Typography;

export class HeadlessAgent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getHeadlessConfig());
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const IconLink = ({ href, src, text }) => (
      <a className="page-header-doc-link" href={href}>
        <img className="page-header-doc-link-icon" src={src} alt={text} />
        {text}
      </a>
    );

    const description = (
      <>
        <Paragraph>
          <FormattedHTMLMessage id="app.containers.HeadlessAgent.description" />
        </Paragraph>
        <div>
          <IconLink
            href="https://docs.munew.io/"
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            text={formatMessage({ id: 'app.common.messages.action.gettingStart' })}
          />
          <IconLink
            href="https://docs.munew.io/user-guides/headless-agent"
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

    return (
      <div>
        {/* <DiaPageHeader title={formatMessage(messages.header)} /> */}
        <>
          <div className="munew-page-header-ghost-wrapper">
            <PageHeader
              title={formatMessage({ id: 'menu.defaultHeadless' })}
              subTitle={formatMessage({ id: 'app.containers.HeadlessAgent.subTitle' })}
              className="site-page-header"
              tags={<Tag color="blue">Running</Tag>}
              extra={[
                <Button key="start">
                  <Icon type="caret-right" />
                  <FormattedMessage id="app.common.messages.action.start" />
                </Button>,
                <Button key="stop">
                  <Icon type="pause-circle" />
                  <FormattedMessage id="app.common.messages.action.stop" />
                </Button>,
                <Button key="view" type="primary">
                  <Icon type="eye" />
                  <FormattedMessage id="app.common.messages.action.view" />
                </Button>,
              ]}
            >
              <Content>{description}</Content>
            </PageHeader>
          </div>
          <div className="munew-agent-config-card">
            <Card>
              <Row>
                <Col xs={0} sm={0} md={3} lg={4} xl={5}></Col>
                <Col xs={24} sm={24} md={18} lg={16} xl={14}>
                  <HeadlessAgentForm />
                </Col>
                <Col xs={0} sm={0} md={3} lg={4} xl={5}></Col>
              </Row>
            </Card>
          </div>
        </>
      </div>
    );
  }
}

export default connect(({ headless }) => ({ headless }))(HeadlessAgent);
