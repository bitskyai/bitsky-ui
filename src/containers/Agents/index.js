import './style.css';

// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Button, Col, Empty, Icon, Popconfirm, Row, Table, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedHTMLMessage, FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
/**
 *
 * Agents
 *
 */
import React, { useState } from 'react';
// import {
//   refreshAgentsSuccess,
//   refreshAgentsFail,
//   refreshAgents,
// } from './actions';

import PropTypes from 'prop-types';
// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectAgents from './selectors';
// import reducer from './reducer';
// import saga from './saga';
// import messages from '../../locales/en-US/containers/Agents';
// import commonMessages from '../../locales/en-US/globalMessages';
import TimeAgo from 'react-timeago';
// import { connect } from 'react-redux';
import { connect } from 'dva';
import dayjs from 'dayjs';
import styled from 'styled-components';
import RegisterAgentForm from './RegisterAgentForm';
import AgentsSkeleton from './AgentsSkeleton';
import { AGENT_STATE } from '../../utils/constants';
import {
  activateAgentAPI,
  deactivateAgentAPI,
  deleteAgentAPI,
  getAgentsAPI,
} from '../../apis/agents';

// import DiaPageHeader from '../../components/Common';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

const actionButtonStyle = {
  margin: '0 10px 0 0',
};

export class Agents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      selectedRowKeys: [],
      drawerVisiable: false,
      selectedAgent: undefined,
    };
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

  onPreventShowDrawer(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDeleteAAgent(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onDeleteAAgent: `, record);
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

  activateAgent(agent) {
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

  deactivateAgent(agent) {
    event.preventDefault();
    event.stopPropagation();
    deactivateAgentAPI(agent.globalId).then(
      () => {
        this.props.dispatch({
          type: 'agents/refreshAgents',
        });
        const msg = formatMessage({ id: 'app.containers.Agents.deactivateAgentSuccess' });
        message.success(msg);
      },
      err => {
        // message.error(err);
        console.error(err);
      },
    );
  }

  onClickCancel(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onClickCancel: `, record);
  }

  onClickDelete(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(record);
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

  componentDidMount() {
    this.initAgentsData();
  }

  render() {
    const { loadingData, drawerVisiable, selectedAgent, selectedRowKeys } = this.state;
    const agents = this.props.agentsData.data;
    const modified = this.props.agentsData.modifiedAt;
    let content = <AgentsSkeleton />;

    const columns = [
      {
        title: formatMessage({ id: 'app.containers.Agents.agentName' }),
        dataIndex: 'name',
      },
      {
        title: formatMessage({ id: 'app.containers.Agents.agentType' }),
        dataIndex: 'type',
      },
      {
        title: formatMessage({ id: 'app.common.messages.state' }),
        dataIndex: 'system.state',
      },
      {
        title: formatMessage({ id: 'app.common.messages.action' }),
        dataIndex: '',
        key: 'x',
        render: (text, record) => (
          <div
            onClick={e => {
              this.onPreventShowDrawer(e);
            }}
          >
            {(record => {
              if (record.system.state === AGENT_STATE.active) {
                return (
                  <Button
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
              if (record.system.state === AGENT_STATE.configured) {
                return (
                  <Button
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
            {/* {record.system.state === AGENT_STATE.active ? (
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
                this.onClickCancel(record, e);
              }}
              okText={formatMessage({ id: 'app.common.messages.yes' })}
              cancelText={formatMessage({ id: 'app.common.messages.no' })}
            >
              <Button
                size="small"
                style={actionButtonStyle}
                onClick={e => {
                  this.onClickDelete(record, e);
                }}
              >
                {formatMessage({ id: 'app.common.messages.delete' })}
              </Button>
            </Popconfirm>
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
                  rowSelection={{
                    selectedRowKeys,
                    type: 'radio',
                    onSelect: record => {
                      // console.log('rowSelection onSelect: ', record);
                      // setSelectedRowKeys([record._id]);
                      this.setState({
                        selectedRowKeys: [record._id],
                      });
                      this.onShowDrawer(record);
                    },
                  }}
                  dataSource={agents}
                  rowKey={record => record._id}
                  onRow={record => ({
                    onClick: () => {
                      // console.log('onRow->onClick: ', record);
                      // this.selectRow(record);
                      // setSelectedRowKeys([record._id]);
                      this.setState({
                        selectedRowKeys: [record._id],
                      });
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

// Agents.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   agents: makeSelectAgents(),
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

// export default compose(withConnect)(injectIntl(Agents));
