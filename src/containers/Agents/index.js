import './style.css';
import * as _ from 'lodash';
import { Button, Col, Empty, Icon, Popconfirm, Row, Table, message, Tag } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedHTMLMessage, formatMessage } from 'umi-plugin-react/locale';
/**
 *
 * Agents
 *
 */
import React from 'react';
import TimeAgo from 'react-timeago';
// import { connect } from 'react-redux';
import { connect } from 'dva';
// import dayjs from 'dayjs';
import styled from 'styled-components';
import RegisterAgentForm from './RegisterAgentForm';
import AgentsSkeleton from './AgentsSkeleton';
import { STATES, AGENT_TYPES } from '../../utils/constants';
import StateTag from '../../utils/StateTag';
import {
  activateAgentAPI,
  deactivateAgentAPI,
  disconnectAgentAPI,
  deleteAgentAPI,
  getAgentsAPI,
} from '../../apis/agents';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

const actionButtonStyle = {
  margin: '0 0 0 0',
};

export class Agents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      drawerVisiable: false,
      selectedAgent: undefined,
    };
  }

  componentDidMount() {
    this.initAgentsData();
  }

  onRegisterAgent() {
    this.setState({
      drawerVisiable: true,
      selectedAgent: undefined,
    });
  }

  onShowDrawer(agent) {
    this.setState({
      drawerVisiable: true,
      selectedAgent: agent,
    });
  }

  onCloseDrawer() {
    this.setState({
      drawerVisiable: false,
      selectedAgent: undefined,
    });
  }

  static onPreventShowDrawer(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDeleteAAgent(record, event) {
    event.preventDefault();
    event.stopPropagation();
    deleteAgentAPI(record.globalId).then(
      () => {
        this.props.dispatch({
          type: 'agents/refreshAgents',
        });
        const msg = formatMessage({ id: 'app.containers.Agents.deleteAgentSuccessful' });
        message.success(msg);
      },
      err => {
        message.error(err);
      },
    );
  }

  static onClickCancel(record, event) {
    event.preventDefault();
    event.stopPropagation();
  }

  static onClickDelete(record, event) {
    event.preventDefault();
    event.stopPropagation();
  }

  activateAgent(agent, event) {
    event.preventDefault();
    event.stopPropagation();
    activateAgentAPI(agent.globalId).then(
      () => {
        this.props.dispatch({
          type: 'agents/refreshAgents',
        });
        const msg = formatMessage({ id: 'app.containers.Agents.activateAgentSuccess' });
        message.success(msg);
      },
      err => {
        // message.error(err);
        console.error(err);
      },
    );
  }

  deactivateAgent(agent, event) {
    event.preventDefault();
    event.stopPropagation();
    deactivateAgentAPI(agent.globalId).then(() => {
      this.props.dispatch({
        type: 'agents/refreshAgents',
      });
      const msg = formatMessage({ id: 'app.containers.Agents.deactivateAgentSuccess' });
      message.success(msg);
    });
  }

  disconnectAgent(agent, event) {
    event.preventDefault();
    event.stopPropagation();
    disconnectAgentAPI(agent.globalId).then(() => {
      this.props.dispatch({
        type: 'agents/refreshAgents',
      });
      const msg = formatMessage({ id: 'app.containers.Agents.disconnectAgentSuccess' });
      message.success(msg);
    });
  }

  initAgentsData() {
    this.setState({
      loadingData: true,
    });
    getAgentsAPI().then(
      agents => {
        this.setState({
          loadingData: false,
        });
        // add key to agents
        // agents = agents.map((item, index) => {
        //   item.key = item._id || index;
        //   return item;
        // });
        // dispatch(refreshAgentsSuccess(agents));
        this.props.dispatch({
          type: 'agents/refreshAgentsSuccess',
          payload: agents,
        });
      },
      err => {
        this.setState({
          loadingData: false,
        });
        // dispatch(refreshAgentsFail(err));
        this.props.dispatch({
          type: 'agents/refreshAgentsFail',
          error: err,
        });
      },
    );
  }

  render() {
    const { loadingData, drawerVisiable, selectedAgent } = this.state;
    const agents = this.props.agentsData.data;
    const modified = this.props.agentsData.modifiedAt;
    let content = <AgentsSkeleton />;

    const columns = [
      {
        title: formatMessage({ id: 'app.containers.Agents.agentName' }),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: formatMessage({ id: 'app.containers.Agents.agentType' }),
        dataIndex: 'type',
        key: 'type',
        render: type => {
          let text = '';
          if (type === AGENT_TYPES.browserExtension) {
            text = formatMessage({ id: 'app.common.messages.agentTypes.browser' });
          } else if (type === AGENT_TYPES.headlessBrowser) {
            text = formatMessage({ id: 'app.common.messages.agentTypes.headless' });
          } else if (type === AGENT_TYPES.service) {
            text = formatMessage({ id: 'app.common.messages.agentTypes.service' });
          }
          return <Tag color="purple">{text}</Tag>;
        },
      },
      {
        title: formatMessage({ id: 'app.common.messages.state' }),
        dataIndex: 'system.state',
        key: 'systemState',
        render: state => <StateTag state={state} />,
      },
      {
        title: formatMessage({ id: 'app.common.messages.connection' }),
        key: 'systemSerialId',
        render: (text, record) => {
          let state = '';
          const lastPing = _.get(record, 'system.lastPing') || 0; // ms
          const serialId = _.get(record, 'system.serialId');
          // const pollingInterval = _.get(record, 'pollingInterval') || 30; // second
          const pollingInterval = 30; // Currently headless and service's interval is hardcode 30s
          const lastPingToNow = Date.now() - lastPing;
          const intervalValues = lastPingToNow / (pollingInterval * 1000);
          if (!serialId) {
            // no serialId, then means not be connected
            state = STATES.noConnection;
          } else if (intervalValues <= 1.5) {
            state = STATES.connected;
          } else if (intervalValues <= 3 && intervalValues > 1.5) {
            state = STATES.connecting;
          } else {
            state = STATES.lostConnection;
          }
          return <StateTag state={state} />;
        },
      },
      {
        title: formatMessage({ id: 'app.common.messages.action' }),
        key: 'action',
        render: (text, record) => (
          <div
            onClick={e => {
              // this.onPreventShowDrawer(e);
              Agents.onPreventShowDrawer(e);
            }}
          >
            {(() => {
              if (record.system.state === STATES.active) {
                return (
                  <Button
                    type="link"
                    size="small"
                    style={actionButtonStyle}
                    title={formatMessage({ id: 'app.containers.Agents.deactivateDescription' })}
                    onClick={e => {
                      this.deactivateAgent(record, e);
                    }}
                  >
                    {formatMessage({ id: 'app.common.messages.deactivate' })}
                  </Button>
                );
              }
              if (record.system.state === STATES.configured) {
                return (
                  <Button
                    type="link"
                    size="small"
                    style={actionButtonStyle}
                    title={formatMessage({ id: 'app.containers.Agents.activateDescription' })}
                    onClick={e => {
                      this.activateAgent(record, e);
                    }}
                  >
                    {formatMessage({ id: 'app.common.messages.activate' })}
                  </Button>
                );
              }
              return '';
            })(record)}
            {/* {record.system.state === STATES.active ? (
              <Button
                size="small"
                style={actionButtonStyle}
                title={formatMessage({ id: 'app.containers.Agents.deactivateDescription' })}
                onClick={e => {
                  deactivateAgent(record, e);
                }}
              >
                {formatMessage({ id: 'app.common.messages.deactivate' })}
              </Button>
            ) : (
              <Button
                size="small"
                style={actionButtonStyle}
                title={formatMessage({ id: 'app.containers.Agents.activateDescription' })}
                onClick={e => {
                  activateAgent(record, e);
                }}
              >
                {formatMessage({ id: 'app.common.messages.activate' })}
              </Button>
            )} */}
            <Popconfirm
              style={{ maxWidth: '300px' }}
              title={formatMessage({ id: 'app.containers.Agents.deleteAgentDescription' })}
              onConfirm={e => {
                this.onDeleteAAgent(record, e);
              }}
              onCancel={e => {
                // this.onClickCancel(record, e);
                Agents.onClickCancel(record, e);
              }}
              okText={formatMessage({ id: 'app.common.messages.yes' })}
              cancelText={formatMessage({ id: 'app.common.messages.no' })}
            >
              <Button
                type="link"
                size="small"
                style={actionButtonStyle}
                onClick={e => {
                  // this.onClickDelete(record, e);
                  Agents.onClickDelete(record, e);
                }}
              >
                {formatMessage({ id: 'app.common.messages.delete' })}
              </Button>
            </Popconfirm>
            {_.get(record, 'system.serialId') ? (
              <Button
                type="link"
                size="small"
                style={actionButtonStyle}
                title={formatMessage({ id: 'app.containers.Agents.disconnectDescription' })}
                onClick={e => {
                  // this.onClickDelete(record, e);
                  this.disconnectAgent(record, e);
                }}
              >
                {formatMessage({ id: 'app.common.messages.disconnect' })}
              </Button>
            ) : (
              ''
            ) /**/}
          </div>
        ),
      },
    ];

    if (!loadingData) {
      if (!agents || !agents.length) {
        content = (
          <EmptyContainer>
            <Empty
              description={
                <span>
                  <FormattedHTMLMessage id="app.containers.Agents.emptyAgents"></FormattedHTMLMessage>
                </span>
              }
            >
              <Button
                type="primary"
                onClick={() => {
                  this.onRegisterAgent();
                }}
              >
                {formatMessage({ id: 'app.containers.Agents.registerNow' })}
              </Button>
            </Empty>
          </EmptyContainer>
        );
      } else {
        content = (
          <div className="intelligence-table-container">
            <div>
              <div style={{ paddingBottom: '15px' }}>
                <Row>
                  <Col span={14}>
                    <Button
                      onClick={() => {
                        this.onRegisterAgent();
                      }}
                      type="primary"
                    >
                      {formatMessage({ id: 'app.containers.Agents.registerNow' })}
                    </Button>
                  </Col>
                  <Col span={10} style={{ textAlign: 'right' }}>
                    <Button
                      type="link"
                      onClick={() => this.initAgentsData()}
                      // disabled={loadingIntelligencesData}
                    >
                      {/* {dayjs(modified).format('YYYY/MM/DD HH:mm:ss')} */}
                      <TimeAgo date={modified} />
                      <Icon
                        type="sync"
                        style={{ verticalAlign: 'middle', marginLeft: '5px' }}
                        // spin={loadingIntelligencesData}
                      />
                    </Button>
                  </Col>
                </Row>
              </div>
              <div style={{ backgroundColor: 'white' }}>
                <Table
                  className=""
                  bordered
                  pagination={false}
                  columns={columns}
                  // rowSelection={{
                  //   selectedRowKeys,
                  //   type: 'radio',
                  //   onSelect: record => {
                  //     // console.log('rowSelection onSelect: ', record);
                  //     // setSelectedRowKeys([record._id]);
                  //     this.setState({
                  //       selectedRowKeys: [record._id],
                  //     });
                  //     this.onShowDrawer(record);
                  //   },
                  // }}
                  dataSource={agents}
                  rowKey={record => record.globalId}
                  onRow={record => ({
                    onClick: () => {
                      // console.log('onRow->onClick: ', record);
                      // this.selectRow(record);
                      // setSelectedRowKeys([record._id]);
                      // this.setState({
                      //   selectedRowKeys: [record.globalId],
                      // });
                      this.onShowDrawer(record);
                    },
                  })}
                />
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div style={{ padding: '20px' }}>
        <PageHeaderWrapper>
          {content}
          <RegisterAgentForm
            visiable={drawerVisiable}
            onCloseDrawer={() => {
              this.onCloseDrawer();
            }}
            agent={selectedAgent}
            dispatch={this.props.dispatch}
          />
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({ agents }) => ({
  agentsData: agents,
}))(Agents);
