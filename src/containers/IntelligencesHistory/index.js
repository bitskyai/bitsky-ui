/**
 *
 * Intelligences History
 *
 */
import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Empty,
  Icon,
  Input,
  Menu,
  Row,
  Spin,
  Table,
  message,
} from 'antd';
import { FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import $ from 'jquery';
import MediaQuery from 'react-responsive';
import React from 'react';
import TimeAgo from 'react-timeago';
import _ from 'lodash';
import { connect } from 'dva';
import dayjs from 'dayjs';
import styled from 'styled-components';
import IntelligencesSkeleton from './IntelligencesSkeleton';
import {
  refreshIntelligencesFail,
  refreshIntelligencesSuccess,
  resetIntelligences,
} from './actions';
import {
  deleteIntelligencesOrHistoryForManagementAPI,
  getIntelligencesOrHistoryForManagementAPI,
  rerunIntelligencesForManagementAPI,
} from '../../apis/intelligencesOrHistory';
import StateTag from '../../utils/StateTag';
// import { STATES } from '../../utils/constants';

// import DiaPageHeader from '../../components/Common';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

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

export class IntelligencesHistory extends React.Component {
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
        this.setState({ contentHeight: window.innerHeight });
      }, 500);
    });
  }

  componentDidUpdate() {
    $('.intelligence-table-container .ant-table-body').unbind('scroll');
    $('.intelligence-table-container .ant-table-body').bind('scroll', () => {
      const scrollTop = $('.intelligence-table-container .ant-table-body').scrollTop();
      const offsetHeight = $('.intelligence-table-container .ant-table-body').outerHeight();
      const { scrollHeight } = document.querySelector(
        '.intelligence-table-container .ant-table-body',
      );

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

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.initIntelligencesData();
  }

  async onDeleteAll() {
    try {
      let ids;
      // let url;
      if (this.state.selectedRows && this.state.selectedRows.length) {
        ids = this.state.selectedRows.map(item => item.globalId);
      }
      // if (!ids || !ids.length) {
      //   url = this.filterConditions.url;
      // }
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: true,
          resuming: false,
        },
      });
      await deleteIntelligencesOrHistoryForManagementAPI(
        this.filterConditions.url,
        ids,
        this.filterConditions.state,
        true,
      );
      message.success(
        formatMessage({
          id: 'app.containers.Intelligences.deleteAllSuccessful',
        }),
      );
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

  async onRerunAll() {
    try {
      let ids;
      if (this.state.selectedRows && this.state.selectedRows.length) {
        ids = this.state.selectedRows.map(item => item.globalId);
      }
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
          reruning: true,
        },
      });
      await rerunIntelligencesForManagementAPI(
        this.filterConditions.url,
        ids,
        this.filterConditions.state,
      );
      const successStr = formatMessage({
        id: 'app.containers.IntelligencesHistory.rerunAllSuccess',
      });
      message.success(successStr);
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
          reruning: false,
        },
      });
      // this.initIntelligencesData();
    } catch (err) {
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
          reruning: false,
        },
      });
    }
  }

  search = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
    });
    this.props.dispatch(resetIntelligences());
    this.loadMoreIntelligences(null);
  };

  handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState({ searchText: '' });
    delete this.filterConditions[dataIndex];
    this.search();
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({ searchText: selectedKeys });
    this.filterConditions[dataIndex] = selectedKeys;
    this.search();
  };

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
          onClick={() => this.handleSearch(selectedKeys && selectedKeys[0], confirm, dataIndex)}
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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} className="intelligences-checkboxgroup">
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
    ),
  });

  initIntelligencesData() {
    this.props.dispatch(resetIntelligences());
    this.setState({
      loadingIntelligencesData: true,
      selectedRowKeys: [],
      selectedRows: [],
    });
    // init intelligences
    getIntelligencesOrHistoryForManagementAPI(
      undefined,
      this.filterConditions.url,
      this.filterConditions.state,
      50,
      true,
    ).then(
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

  loadMoreIntelligences(nextCursor) {
    this.setState({
      loadingMore: true,
    });
    if (nextCursor === undefined) {
      nextCursor = this.props.intelligences.nextCursor;
    }
    getIntelligencesOrHistoryForManagementAPI(
      nextCursor,
      this.filterConditions.url,
      this.filterConditions.state,
      50,
      true,
    ).then(
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

  render() {
    // const { formatMessage } = this.props.intl;
    const { loadingIntelligencesData, contentHeight, loadingMore } = this.state;
    const { intelligences } = this.props;
    let content = <IntelligencesSkeleton />;

    const columns = [
      {
        title: 'Target URL',
        dataIndex: 'url',
        // width: '40%',
        filteredValue: this.filterConditions.url,
        ...this.getColumnSearchProps('url'),
      },
      {
        title: formatMessage({ id: 'app.common.messages.state' }),
        dataIndex: 'system.state',
        // width: '15%',
        render: state => <StateTag state={state} />,
        filteredValue: this.filterConditions.state,
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
        title: 'Last Modified At',
        dataIndex: 'system.modified',
        render: text => dayjs(text).format('YYYY/MM/DD HH:mm:ss'),
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
                  <FormattedHTMLMessage id="app.containers.IntelligencesHistory.empty" />
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

        const menu = (
          <Menu>
            <Menu.Item>
              <Button
                type="link"
                onClick={() => {
                  this.onRerunAll();
                }}
                disabled={operationBtnDisabled}
                loading={this.state.operationBtns.reruning}
              >
                <FormattedMessage
                  id="app.containers.IntelligencesHistory.rerunAll"
                  values={{ intelligenceNumber: total }}
                />
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                type="link"
                onClick={() => {
                  this.onDeleteAll();
                }}
                disabled={operationBtnDisabled}
                loading={this.state.operationBtns.deleting}
              >
                <FormattedMessage
                  id="app.containers.Intelligences.deleteAll"
                  values={{ intelligenceNumber: total }}
                />
              </Button>
            </Menu.Item>
          </Menu>
        );

        const rightContent = (
          <div style={{ display: 'inline-block' }}>
            <div style={{ display: 'inline-block' }}>
              <span>
                <FormattedMessage
                  id="app.containers.Intelligences.showIntelligences"
                  values={{
                    intelligencesNumber: _.get(intelligences, 'data.length'),
                    intelligencesTotal: intelligences.total,
                  }}
                />
              </span>
            </div>
            <Button
              type="link"
              onClick={() => this.initIntelligencesData()}
              disabled={loadingIntelligencesData}
            >
              {/* {dayjs(intelligences.modified).format('YYYY/MM/DD HH:mm:ss')} */}
              <TimeAgo date={intelligences.modified} />
              <Icon
                type="sync"
                style={{ verticalAlign: 'middle', marginLeft: '5px' }}
                spin={loadingIntelligencesData}
              />
            </Button>
          </div>
        );

        content = (
          // <div ref={(ref) => this.scrollParentRef = ref}>
          <div className="intelligence-table-container">
            <div>
              <div style={{ paddingBottom: '15px' }}>
                <Row>
                  <MediaQuery minWidth={1028}>
                    <Col span={16}>
                      <Button
                        onClick={() => {
                          this.onRerunAll();
                        }}
                        style={{ marginLeft: '10px' }}
                        disabled={operationBtnDisabled}
                        loading={this.state.operationBtns.reruning}
                      >
                        <FormattedMessage
                          id="app.containers.IntelligencesHistory.rerunAll"
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
                    <Col span={8} style={{ textAlign: 'right' }}>
                      {rightContent}
                    </Col>
                  </MediaQuery>
                  <MediaQuery maxWidth={1028}>
                    <Col span={3}>
                      <Dropdown overlay={menu}>
                        <Button>
                          <Icon type="menu" />
                        </Button>
                      </Dropdown>
                    </Col>
                    <Col span={21} style={{ textAlign: 'right' }}>
                      {rightContent}
                    </Col>
                  </MediaQuery>
                </Row>
              </div>

              <Table
                className=""
                pagination={false}
                bordered
                columns={columns}
                rowSelection={rowSelection}
                dataSource={intelligences.data}
                rowKey={record => record.globalId}
                scroll={{ y: contentHeight - 310 }}
                onRow={record => ({
                  onClick: () => {
                    // console.log('onRow->onClick: ', record);
                  },
                })}
              />
              {loadingMore ? LoadMoreContent : ''}
            </div>
          </div>
        );
      }
    }

    return (
      <div style={{ padding: '20px' }}>
        <PageHeaderWrapper>{content}</PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({ intelligences }) => ({
  intelligences,
}))(IntelligencesHistory);
