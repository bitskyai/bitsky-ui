/**
 *
 * Tasks
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
  Tooltip,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import $ from 'jquery';
import MediaQuery from 'react-responsive';
import React from 'react';
import TimeAgo from 'react-timeago';
import _ from 'lodash';
import { connect, FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi';
import dayjs from 'dayjs';
import styled from 'styled-components';
import TasksSkeleton from './TasksSkeleton';
import { refreshTasksFail, refreshTasksSuccess, resetTasks } from './actions';
import {
  deleteTasksOrHistoryForManagementAPI,
  getTasksOrHistoryForManagementAPI,
  pauseTasksForManagementAPI,
  resumeTasksForManagementAPI,
} from '../../apis/tasksOrHistory';
import StateTag from '../../utils/StateTag';
import { STATES } from '../../utils/constants';

import TaskDetail from './TaskDetail';

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

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    // useInjectReducer({ key: 'tasks', reducer });
    // useInjectSaga({ key: 'tasks', saga });
    this.props.dispatch(resetTasks());
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      loadingMore: false,
      loadingTasksData: true,
      contentHeight: window.innerHeight,
      drawerVisiable: false,
      selectedTask: undefined,
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

  componentDidMount() {
    this.initTasksData();
  }

  componentDidUpdate() {
    $('.task-table-container .ant-table-body').unbind('scroll');
    $('.task-table-container .ant-table-body').bind('scroll', () => {
      const scrollTop = $('.task-table-container .ant-table-body').scrollTop();
      const offsetHeight = $('.task-table-container .ant-table-body').outerHeight();
      const { scrollHeight } = document.querySelector('.task-table-container .ant-table-body');

      // console.log("scrollHeight: ", scrollHeight);
      // console.log("scrollTop: ", scrollTop);
      // console.log("offsetHeight: ", offsetHeight);
      // console.log("lastScrollHeight: ", this.lastScrollHeight);
      // console.log('offset: ', (scrollHeight - scrollTop - offsetHeight));

      if (scrollHeight - scrollTop - offsetHeight < 200 && this.props.tasks.nextCursor) {
        if (!this.state.loadingMore) {
          this.lastScrollHeight = scrollHeight;
          this.loadMoreTasks();
        }
      }
    });
  }

  componentWillUnmount() {
    $(window).unbind('resize');
  }

  onShowDrawer(producer) {
    this.setState({
      drawerVisiable: true,
      selectedTask: producer,
    });
  }

  onCloseDrawer() {
    this.setState({
      drawerVisiable: false,
      selectedTask: undefined,
    });
  }

  static onPreventShowDrawer(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  async onPauseAll() {
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
          pausing: true,
          deleting: false,
          resuming: false,
        },
      });
      await pauseTasksForManagementAPI(this.filterConditions.url, ids, this.filterConditions.state);
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
        },
      });
      this.initTasksData();
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
          deleting: false,
          resuming: true,
        },
      });
      await resumeTasksForManagementAPI(
        this.filterConditions.url,
        ids,
        this.filterConditions.state,
      );
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
        },
      });
      this.initTasksData();
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
      await deleteTasksOrHistoryForManagementAPI(
        this.filterConditions.url,
        ids,
        this.filterConditions.state,
      );
      message.success(
        formatMessage({
          id: 'app.containers.Tasks.deleteAllSuccessful',
        }),
      );
      this.setState({
        operationBtns: {
          pausing: false,
          deleting: false,
          resuming: false,
        },
      });
      this.initTasksData();
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

  search = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
    });
    this.props.dispatch(resetTasks());
    this.loadMoreTasks(null);
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
      <div style={{ padding: 8 }} className="tasks-checkboxgroup">
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

  loadMoreTasks(nextCursor) {
    this.setState({
      loadingMore: true,
    });
    if (nextCursor === undefined) {
      nextCursor = this.props.tasks.nextCursor;
    }
    getTasksOrHistoryForManagementAPI(
      nextCursor,
      this.filterConditions.url,
      this.filterConditions.state,
    ).then(
      tasks => {
        this.props.dispatch(refreshTasksSuccess(tasks));
        this.setState({
          loadingMore: false,
        });
      },
      err => {
        this.props.dispatch(refreshTasksFail(err));
        this.setState({
          loadingMore: false,
        });
      },
    );
  }

  initTasksData() {
    this.props.dispatch(resetTasks());
    this.setState({
      loadingTasksData: true,
      selectedRowKeys: [],
      selectedRows: [],
    });
    // init tasks
    getTasksOrHistoryForManagementAPI(
      undefined,
      this.filterConditions.url,
      this.filterConditions.state,
    ).then(
      tasks => {
        this.setState({ loadingTasksData: false });
        this.props.dispatch(refreshTasksSuccess(tasks));
      },
      err => {
        this.setState({ loadingTasksData: false });
        this.props.dispatch(refreshTasksFail(err));
      },
    );
  }

  render() {
    // const { formatMessage } = this.props.intl;
    const {
      loadingTasksData,
      contentHeight,
      loadingMore,
      drawerVisiable,
      selectedTask,
    } = this.state;
    const { tasks } = this.props;
    let content = <TasksSkeleton />;

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
        title: formatMessage({ id: 'app.common.messages.retailerState' }),
        dataIndex: 'retailer.state',
        // width: '15%',
        render: s => {
          let state = s;
          if (state === STATES.failed) {
            state = STATES.lostConnection;
          } else if (state === STATES.active) {
            state = STATES.connected;
          }
          return <StateTag state={state} />;
        },
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

    if (!loadingTasksData) {
      // if currently in search mode, then show table
      if ((!tasks.data || !tasks.data.length) && !_.keys(this.filterConditions).length) {
        content = (
          <EmptyContainer>
            <Empty
              description={
                <span>
                  <FormattedHTMLMessage id="app.containers.Tasks.emptyTasks" />
                </span>
              }
            >
              {/* <Button type="primary" onClick={()=>{this.onRegisterTask()}}>
              <FormattedMessage {...messages.registerNow} />
            </Button> */}
            </Empty>
          </EmptyContainer>
        );
      } else {
        let total = (tasks && tasks.total) || 0;
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
        if (!total || loadingTasksData) {
          operationBtnDisabled = true;
        }

        const menu = (
          <Menu>
            <Menu.Item>
              <Tooltip
                title={
                  <FormattedHTMLMessage
                    id="app.containers.Tasks.pauseAllHint"
                    values={{ taskNumber: total }}
                  ></FormattedHTMLMessage>
                }
              >
                <Button
                  type="link"
                  onClick={() => {
                    this.onPauseAll();
                  }}
                  disabled={operationBtnDisabled}
                  loading={this.state.operationBtns.pausing}
                >
                  <FormattedMessage
                    id="app.containers.Tasks.pauseAll"
                    values={{ taskNumber: total }}
                  />
                </Button>
              </Tooltip>
            </Menu.Item>
            <Menu.Item>
              <Tooltip
                title={
                  <FormattedHTMLMessage
                    id="app.containers.Tasks.resumeAllHint"
                    values={{ taskNumber: total }}
                  ></FormattedHTMLMessage>
                }
              >
                <Button
                  type="link"
                  onClick={() => {
                    this.onResumeAll();
                  }}
                  disabled={operationBtnDisabled}
                  loading={this.state.operationBtns.resuming}
                >
                  <FormattedMessage
                    id="app.containers.Tasks.resumeAll"
                    values={{ taskNumber: total }}
                  />
                </Button>
              </Tooltip>
            </Menu.Item>
            <Menu.Item>
              <Tooltip
                title={
                  <FormattedHTMLMessage
                    id="app.containers.Tasks.deleteAllHint"
                    values={{ taskNumber: total }}
                  ></FormattedHTMLMessage>
                }
              >
                <Button
                  type="link"
                  onClick={() => {
                    this.onDeleteAll();
                  }}
                  disabled={operationBtnDisabled}
                  loading={this.state.operationBtns.deleting}
                >
                  <FormattedMessage
                    id="app.containers.Tasks.deleteAll"
                    values={{ taskNumber: total }}
                  />
                </Button>
              </Tooltip>
            </Menu.Item>
          </Menu>
        );

        const rightContent = (
          <div style={{ display: 'inline-block' }}>
            <div style={{ display: 'inline-block' }}>
              <span>
                <FormattedMessage
                  id="app.containers.Tasks.showTasks"
                  values={{
                    tasksNumber: _.get(tasks, 'data.length'),
                    tasksTotal: tasks.total,
                  }}
                />
              </span>
            </div>
            <Button type="link" onClick={() => this.initTasksData()} disabled={loadingTasksData}>
              {/* {dayjs(tasks.modified).format('YYYY/MM/DD HH:mm:ss')} */}
              <TimeAgo date={tasks.modified} />
              <Icon
                type="sync"
                style={{ verticalAlign: 'middle', marginLeft: '5px' }}
                spin={loadingTasksData}
              />
            </Button>
          </div>
        );

        content = (
          // <div ref={(ref) => this.scrollParentRef = ref}>
          <div className="task-table-container">
            <div>
              <div style={{ paddingBottom: '15px' }}>
                <Row>
                  <MediaQuery minWidth={1024}>
                    <Col span={14}>
                      <Tooltip
                        title={
                          <FormattedHTMLMessage
                            id="app.containers.Tasks.pauseAllHint"
                            values={{ taskNumber: total }}
                          ></FormattedHTMLMessage>
                        }
                      >
                        <Button
                          onClick={() => {
                            this.onPauseAll();
                          }}
                          disabled={operationBtnDisabled}
                          loading={this.state.operationBtns.pausing}
                        >
                          <FormattedMessage
                            id="app.containers.Tasks.pauseAll"
                            values={{ taskNumber: total }}
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        title={
                          <FormattedHTMLMessage
                            id="app.containers.Tasks.resumeAllHint"
                            values={{ taskNumber: total }}
                          ></FormattedHTMLMessage>
                        }
                      >
                        <Button
                          onClick={() => {
                            this.onResumeAll();
                          }}
                          style={{ marginLeft: '10px' }}
                          disabled={operationBtnDisabled}
                          loading={this.state.operationBtns.resuming}
                        >
                          <FormattedMessage
                            id="app.containers.Tasks.resumeAll"
                            values={{ taskNumber: total }}
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        title={
                          <FormattedHTMLMessage
                            id="app.containers.Tasks.deleteAllHint"
                            values={{ taskNumber: total }}
                          ></FormattedHTMLMessage>
                        }
                      >
                        <Button
                          onClick={() => {
                            this.onDeleteAll();
                          }}
                          style={{ marginLeft: '10px' }}
                          disabled={operationBtnDisabled}
                          loading={this.state.operationBtns.deleting}
                        >
                          <FormattedMessage
                            id="app.containers.Tasks.deleteAll"
                            values={{ taskNumber: total }}
                          />
                        </Button>
                      </Tooltip>
                    </Col>
                    <Col span={10} style={{ textAlign: 'right' }}>
                      {rightContent}
                    </Col>
                  </MediaQuery>
                  <MediaQuery maxWidth={1024}>
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
                dataSource={tasks.data}
                rowKey={record => record.globalId}
                scroll={{ y: contentHeight - 310 }}
                onRow={record => ({
                  onClick: () => {
                    // console.log('onRow->onClick: ', record);
                    this.onShowDrawer(record);
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
        <PageHeaderWrapper>
          {content}
          <TaskDetail
            visiable={drawerVisiable}
            onCloseDrawer={() => {
              this.onCloseDrawer();
            }}
            task={selectedTask}
          />
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({ tasks }) => ({
  tasks,
}))(Tasks);
