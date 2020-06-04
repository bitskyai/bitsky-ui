/**
 *
 * Headless Agent
 *
 */

// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Button, Checkbox, Col, Dropdown, Empty, Icon, Input, Menu, Row, Spin, Table } from 'antd';
import { FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import $ from 'jquery';
import React from 'react';
import * as _ from 'lodash';
import { connect } from 'umi';
import styled from 'styled-components';
import HeadlessAgentSkeleton from './HeadlessAgentSkeleton';
import { sendToElectron } from '../../utils/utils';

// const EmptyContainer = styled.div`
//   padding: 100px 0;
// `;

export class HeadlessAgent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      operationBtns: {
        starting: false,
        stoping: false,
      },
    };
  }

  async componentDidMount() {
    let result = await sendToElectron('getHeadlessConfig');
    console.log('componentDidMount->result: ', result);
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  async getHeadlessConfig() {
    try {
      let result = await sendToElectron('getHeadlessConfig');
    } catch (err) {}
  }

  render() {
    const { loadingData } = this.state;
    let content = <HeadlessAgentSkeleton />;

    if (!loadingData) {
    }

    return (
      <div>
        {/* <DiaPageHeader title={formatMessage(messages.header)} /> */}
        {content}
      </div>
    );
  }
}

export default connect(({}) => ({}))(HeadlessAgent);