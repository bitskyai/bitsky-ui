/**
 *
 * Intelligences
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import $ from 'jquery';
import _ from 'lodash';

// import { connect } from 'react-redux';
import { connect } from 'dva';
import { formatMessage, FormattedMessage, FormattedHTMLMessage } from 'umi-plugin-react/locale';
import styled from 'styled-components';
// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Empty, Button, Table, Spin, Input, Row, Col, Icon, Checkbox } from 'antd';

// import injectSaga from 'utils/injectSaga';
// import injectReducer from 'utils/injectReducer';
// import makeSelectIntelligences from './selectors';
// import reducer from './reducer';
// import saga from './saga';
// import messages from '../../locales/en-US/containers/intelligences';
// import commonMessages from '../../locales/en-US/globalMessages';
import IntelligencesSkeleton from './IntelligencesSkeleton';
import {
  resetIntelligences,
  refreshIntelligences,
  refreshIntelligencesFail,
  refreshIntelligencesSuccess,
} from './actions';

import {
  getIntelligencesForManagementAPI,
  pauseIntelligencesForManagementAPI,
  resumeIntelligencesForManagementAPI,
  deleteIntelligencesForManagementAPI,
} from '../../apis/intelligences';
import styles from './style.less';

// import DiaPageHeader from '../../components/Common';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

const actionButtonStyle = {
  margin: '0 10px 0 0',
};

const LoadMoreContent = (
  <div
    style={{
      textAlign: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      // border: '1px solid #e8e8e8',
    }}
  >
    <Spin />
  </div>
);

export class Intelligences extends React.Component {
  constructor(props) {
    super(props);
    // useInjectReducer({ key: 'intelligences', reducer });
    // useInjectSaga({ key: 'intelligences', saga });
    this.props.dispatch(resetIntelligences());
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      loadingMore: false,
      loadingIntelligencesData: true,
      contentHeight: window.innerHeight,
      operationBtns: {
        pausing: false,
        resuming: false,
        deleting: false,
      },
    };

    this.filterConditions = {};
    this.lastScrollHeight = 0;
    this.resizeTimeoutHandler = undefined;

    // Listen resize event
    $(window).unbind('resize');
    $(window).bind('resize', () => {
      clearTimeout(this.resizeTimeoutHandler);
      this.resizeTimeoutHandler = setTimeout(() => {
        console.log('intelligence resize');
        this.setState({ contentHeight: window.innerHeight });
      }, 500);
    });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 250, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys&&selectedKeys[0], confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          <FormattedMessage id="app.common.messages.search" />
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters, dataIndex)}
          size="small"
          style={{ width: 90 }}
        >
          <FormattedMessage id="app.common.messages.reset" />
        </Button>
      </div>
    ),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  getColumnCheckboxProps = (dataIndex, options) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return (
        <div style={{ padding: 8 }} className='intelligences-checkboxgroup'>
          <Checkbox.Group
            options={options}
            defaultValue={selectedKeys}
            onChange={checkedValues => {
              this.filterConditions[dataIndex] = checkedValues;
              setSelectedKeys(checkedValues);
            }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              <FormattedMessage id="app.common.messages.search" />
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters, dataIndex)}
              size="small"
              style={{ width: 90 }}
            >
              <FormattedMessage id="app.common.messages.reset" />
            </Button>
          </div>
        </div>
      );
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({ searchText: selectedKeys });
    this.filterConditions[dataIndex] = selectedKeys;
    this.search();
  };

  handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState({ searchText: '' });
    delete this.filterConditions[dataIndex];
    this.search();
  };

  initIntelligencesData() {
    this.props.dispatch(resetIntelligences());
    this.setState({
      loadingIntelligencesData: true,
      selectedRowKeys: [],
      selectedRows: [],
    });
    // init intelligences
    getIntelligencesForManagementAPI().then(
      intelligences => {
        this.setState({ loadingIntelligencesData: false });
        this.props.dispatch(refreshIntelligencesSuccess(intelligences));
      },
      err => {
        this.setState({ loadingIntelligencesData: false });
        this.props.dispatch(refreshIntelligencesFail(err));
      },
    );
  }

  componentDidMount() {
    this.initIntelligencesData();
  }

  search = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
    });
    this.props.dispatch(resetIntelligences());
    this.loadMoreIntelligences(null);
  };

  componentDidUpdate() {
    $('.intelligence-table-container .ant-table-body').unbind('scroll');
    $('.intelligence-table-container .ant-table-body').bind('scroll', () => {
      let scrollTop = $('.intelligence-table-container .ant-table-body').scrollTop();
      let offsetHeight = $('.intelligence-table-container .ant-table-body').outerHeight();
      let scrollHeight = document.querySelector('.intelligence-table-container .ant-table-body')
        .scrollHeight;

      // console.log("scrollHeight: ", scrollHeight);
      // console.log("scrollTop: ", scrollTop);
      // console.log("offsetHeight: ", offsetHeight);
      // console.log("lastScrollHeight: ", this.lastScrollHeight);
      // console.log('offset: ', (scrollHeight - scrollTop - offsetHeight));

      if (scrollHeight - scrollTop - offsetHeight < 200 && this.props.intelligences.nextCursor) {
        if (!this.state.loadingMore) {
          this.lastScrollHeight = scrollHeight;
          this.loadMoreIntelligences();
        }
      }
    });
  }

  componentWillUnmount() {
    $(window).unbind('resize');
  }

  loadMoreIntelligences(nextCursor) {
    this.setState({
      loadingMore: true,
    });
    if (nextCursor === undefined) {
      nextCursor = this.props.intelligences.nextCursor;
    }
    getIntelligencesForManagementAPI(nextCursor, this.filterConditions.url, this.filterConditions.state).then(
      intelligences => {
        this.props.dispatch(refreshIntelligencesSuccess(intelligences));
        this.setState({
          loadingMore: false,
        });
      },
      err => {
        this.props.dispatch(refreshIntelligencesFail(err));
        this.setState({
          loadingMore: false,
        });
      },
    );
  }

  async onPauseAll() {
    try {
      let ids, url;
      if (this.state.selectedRows && this.state.selectedRows.length) {
        ids = this.state.selectedRows.map(item => item.globalId);
      }
      if (!ids || !ids.length) {
        url = this.filterConditions.url;
      }
      this.setState({
        operationBtns: {
          pausing: true,
          deleting: false,
          resuming: false,
        },
      });
      await pauseIntelligencesForManagementAPI(url, ids);
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
        },
      });
      this.initIntelligencesData();
    } catch (err) {
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
        },
      });
    }
  }

  async onResumeAll() {
    try {
      let ids, url;
      if (this.state.selectedRows && this.state.selectedRows.length) {
        ids = this.state.selectedRows.map(item => item.globalId);
      }
      if (!ids || !ids.length) {
        url = this.filterConditions.url;
      }
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: true,
        },
      });
      await resumeIntelligencesForManagementAPI(url, ids);
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
        },
      });
      this.initIntelligencesData();
    } catch (err) {
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
        },
      });
    }
  }

  async onDeleteAll() {
    try {
      let ids, url;
      if (this.state.selectedRows && this.state.selectedRows.length) {
        ids = this.state.selectedRows.map(item => item.globalId);
      }
      if (!ids || !ids.length) {
        url = this.filterConditions.url;
      }
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: true,
          resuming: false,
        },
      });
      await deleteIntelligencesForManagementAPI(url, ids);
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
        },
      });
      this.initIntelligencesData();
    } catch (err) {
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
        },
      });
    }
  }

  render() {
    // const { formatMessage } = this.props.intl;
    let { loadingIntelligencesData, contentHeight, loadingMore } = this.state;
    let { intelligences } = this.props;
    let content = <IntelligencesSkeleton />;

    const columns = [
      {
        title: 'Target URL',
        dataIndex: 'url',
        width: '40%',
        ...this.getColumnSearchProps('url'),
      },
      {
        title: formatMessage({ id: 'app.common.messages.state' }),
        dataIndex: 'system.state',
        width: '15%',
        ...this.getColumnCheckboxProps('state', [
          {
            label: formatMessage({ id: 'app.common.messages.stateDraft' }),
            value: 'DRAFT',
          },
          {
            label: formatMessage({ id: 'app.common.messages.stateConfigured' }),
            value: 'CONFIGURED',
          },
          {
            label: formatMessage({ id: 'app.common.messages.stateFinished' }),
            value: 'FINISHED',
          },
          {
            label: formatMessage({ id: 'app.common.messages.stateRunning' }),
            value: 'RUNNING',
          },
          {
            label: formatMessage({ id: 'app.common.messages.stateFailed' }),
            value: 'FAILED',
          },
          {
            label: formatMessage({ id: 'app.common.messages.statePaused' }),
            value: 'PAUSED',
          },
          {
            label: formatMessage({ id: 'app.common.messages.stateTimeout' }),
            value: 'TIMEOUT',
          },
        ]),
      },
      {
        title: 'SOI State',
        dataIndex: 'soi.state',
        width: '15%',
      },
      {
        title: 'Last Modified At',
        dataIndex: 'system.modified',
        render: text => {
          return dayjs(text).format('YYYY/MM/DD HH:mm:ss');
        },
      },
    ];

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows,
        });
        // console.log(
        //   `selectedRowKeys: ${selectedRowKeys}`,
        //   `selectedRows: ${selectedRows}`,
        // );
      },
    };

    if (!loadingIntelligencesData) {
      // if currently in search mode, then show table
      if (
        (!intelligences.data || !intelligences.data.length) &&
        !_.keys(this.filterConditions).length
      ) {
        content = (
          <EmptyContainer>
            <Empty
              description={
                <span>
                  <FormattedHTMLMessage id="app.containers.Intelligences.emptyIntelligences" />
                </span>
              }
            >
              {/* <Button type="primary" onClick={()=>{this.onRegisterIntelligence()}}>
              <FormattedMessage {...messages.registerNow} />
            </Button> */}
            </Empty>
          </EmptyContainer>
        );
      } else {
        let total = (intelligences && intelligences.total) || 0;
        if (this.state.selectedRows && this.state.selectedRows.length) {
          total = this.state.selectedRows.length;
        }
        let operationBtnDisabled = false;
        if (
          this.state.operationBtns.pausing ||
          this.state.operationBtns.resuming ||
          this.state.operationBtns.deleting
        ) {
          operationBtnDisabled = true;
        }
        if (!total || loadingIntelligencesData) {
          operationBtnDisabled = true;
        }

        content = (
          // <div ref={(ref) => this.scrollParentRef = ref}>
          <div className="intelligence-table-container">
            <div style={{ padding: '0 24px' }}>
              <div style={{ paddingBottom: '15px' }}>
                <Row>
                  <Col span={14}>
                    <Button
                      onClick={() => {
                        this.onPauseAll();
                      }}
                      disabled={operationBtnDisabled}
                      loading={this.state.operationBtns.pausing}
                    >
                      <FormattedMessage
                        id="app.containers.Intelligences.pauseAll"
                        values={{ intelligenceNumber: total }}
                      />
                    </Button>
                    <Button
                      onClick={() => {
                        this.onResumeAll();
                      }}
                      style={{ marginLeft: '10px' }}
                      disabled={operationBtnDisabled}
                      loading={this.state.operationBtns.resuming}
                    >
                      <FormattedMessage
                        id="app.containers.Intelligences.resumeAll"
                        values={{ intelligenceNumber: total }}
                      />
                    </Button>
                    <Button
                      onClick={() => {
                        this.onDeleteAll();
                      }}
                      style={{ marginLeft: '10px' }}
                      disabled={operationBtnDisabled}
                      loading={this.state.operationBtns.deleting}
                    >
                      <FormattedMessage
                        id="app.containers.Intelligences.deleteAll"
                        values={{ intelligenceNumber: total }}
                      />
                    </Button>
                  </Col>
                  <Col span={10} style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-block' }}>
                      <span>{`Show ${_.get(intelligences, 'data.length')} of ${
                        intelligences.total
                      } intelligences`}</span>
                    </div>
                    <Button
                      type="link"
                      onClick={() => this.initIntelligencesData()}
                      disabled={loadingIntelligencesData}
                    >
                      {dayjs(intelligences.modified).format('YYYY/MM/DD HH:mm:ss')}
                      <Icon
                        type="sync"
                        style={{ verticalAlign: '0', marginLeft: '5px' }}
                        spin={loadingIntelligencesData}
                      />
                    </Button>
                  </Col>
                </Row>
              </div>

              <Table
                className=""
                pagination={false}
                bordered
                columns={columns}
                rowSelection={rowSelection}
                dataSource={intelligences.data}
                rowKey={record => record._id}
                scroll={{ y: contentHeight - 310 }}
                onRow={record => {
                  return {
                    onClick: () => {
                      // console.log('onRow->onClick: ', record);
                    },
                  };
                }}
              />
              {loadingMore ? LoadMoreContent : ''}
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        {/* <DiaPageHeader title={formatMessage(messages.header)} /> */}
        {content}
      </div>
    );
  }
}

export default connect(({ intelligences }) => ({
  intelligences,
}))(Intelligences);

// Intelligences.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   intelligences: makeSelectIntelligences(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );
// const withReducer = injectReducer({ key: 'intelligences', reducer });
// const withSaga = injectSaga({ key: 'intelligences', saga });

// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
// )(injectIntl(Intelligences));
