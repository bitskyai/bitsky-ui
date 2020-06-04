/**
 *
 * Intelligences
 *
 */

// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Button, Checkbox, Col, Dropdown, Empty, Icon, Input, Menu, Row, Spin, Table } from 'antd';
import { FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import $ from 'jquery';
import React from 'react';
// import TimeAgo from 'react-timeago';
import _ from 'lodash';
// import { connect } from 'react-redux';
import { connect } from 'dva';
import styled from 'styled-components';
import ServiceAgentSkeleton from './AgentSkeleton';
import { sendToElectron } from '../../utils/utils';

// const EmptyContainer = styled.div`
//   padding: 100px 0;
// `;

export class ServiceAgent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let result = await sendToElectron('getServiceConfig');
    console.log('componentDidMount->result: ', result);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    $(window).unbind('resize');
  }

  render() {
    let content = <ServiceAgentSkeleton />;

    // if (!loadingIntelligencesData) {
    // }

    return (
      <div>
        {/* <DiaPageHeader title={formatMessage(messages.header)} /> */}
        {content}
      </div>
    );
  }
}

export default connect(({}) => ({}))(ServiceAgent);
