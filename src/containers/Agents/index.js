/**
 *
 * Agents
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { connect } from 'dva';
import { formatMessage, FormattedMessage, FormattedHTMLMessage } from 'umi-plugin-react/locale';
import styled from 'styled-components';
// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Empty, Table, Button, Popconfirm, message, Card } from 'antd';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectAgents from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import messages from '../../locales/en-US/containers/Agents';
import commonMessages from '../../locales/en-US/globalMessages';
import RegisterAgentForm from './RegisterAgentForm';
import AgentsSkeleton from './AgentsSkeleton';
// import {
//   refreshAgentsSuccess,
//   refreshAgentsFail,
//   refreshAgents,
// } from './actions';
import {
  getAgentsAPI,
  deleteAgentAPI,
  activateAgentAPI,
  deactivateAgentAPI,
} from '../../apis/agents';
import { AGENT_STATE } from '../../utils/constants';
import './style.css';

// import DiaPageHeader from '../../components/Common';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

const actionButtonStyle = {
  margin: '0 10px 0 0',
};

export function Agents({ dispatch, agents }) {
  // useInjectReducer({ key: 'agents', reducer });
  // useInjectSaga({ key: 'agents', saga });
  // const { formatMessage } = intl;
  // loading data
  const [inited, setInited] = useState(false);
  // select row
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisiable, setDrawerVisiable] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(undefined);

  function onRegisterAgent() {
    setDrawerVisiable(true);
    setSelectedAgent(undefined);
  }

  function onShowDrawer(agent) {
    setDrawerVisiable(true);
    setSelectedAgent(agent);
  }

  function onCloseDrawer() {
    setDrawerVisiable(false);
    setSelectedAgent(undefined);
  }

  function onPreventShowDrawer(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onDeleteAAgent(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onDeleteAAgent: `, record);
    deleteAgentAPI(record.globalId).then(
      () => {
        dispatch({
          type: 'agents/refreshAgents',
        });
        let msg = formatMessage(messages.deleteAgentSuccessful);
        message.success(msg);
      },
      err => {
        message.error(err);
      },
    );
  }

  function activateAgent(agent) {
    event.preventDefault();
    event.stopPropagation();
    activateAgentAPI(agent.globalId).then(
      () => {
        dispatch({
          type: 'agents/refreshAgents',
        });
        let msg = formatMessage(messages.activateAgentSuccess);
        message.success(msg);
      },
      err => {
        message.error(err);
      },
    );
  }

  function deactivateAgent(agent) {
    event.preventDefault();
    event.stopPropagation();
    deactivateAgentAPI(agent.globalId).then(
      () => {
        dispatch({
          type: 'agents/refreshAgents',
        });
        let msg = formatMessage(messages.deactivateAgentSuccess);
        message.success(msg);
      },
      err => {
        message.error(err);
      },
    );
  }

  function onClickCancel(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onClickCancel: `, record);
  }

  function onClickDelete(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(record);
  }

  // if didn't inited before, then need to get data from server side
  if (!inited) {
    getAgentsAPI().then(
      agents => {
        setInited(true);
        // add key to agents
        // agents = agents.map((item, index) => {
        //   item.key = item._id || index;
        //   return item;
        // });
        // dispatch(refreshAgentsSuccess(agents));
        dispatch({
          type: 'agents/refreshAgentsSuccess',
          payload: agents
        });
      },
      err => {
        setInited(true);
        // dispatch(refreshAgentsFail(err));
        dispatch({
          type: 'agents/refreshAgentsFail',
          error: err
        });
      },
    );
  }
  let content = <AgentsSkeleton />;

  const columns = [
    {
      title: formatMessage(messages.agentName),
      dataIndex: 'name',
    },
    {
      title: formatMessage(messages.agentType),
      dataIndex: 'type',
    },
    {
      title: formatMessage(commonMessages.state),
      dataIndex: 'system.state',
    },
    {
      title: formatMessage(commonMessages.action),
      dataIndex: '',
      key: 'x',
      render: (text, record) => {
        return (
          <div
            onClick={e => {
              onPreventShowDrawer(e);
            }}
          >
            {record.system.state === AGENT_STATE.active ? (
              <Button
                size="small"
                style={actionButtonStyle}
                title={formatMessage(messages.deactivateDescription)}
                onClick={e => {
                  deactivateAgent(record, e);
                }}
              >
                <FormattedMessage {...commonMessages.deactivate} />
              </Button>
            ) : (
              <Button
                size="small"
                style={actionButtonStyle}
                title={formatMessage(messages.activateDescription)}
                onClick={e => {
                  activateAgent(record, e);
                }}
              >
                <FormattedMessage {...commonMessages.activate} />
              </Button>
            )}
            <Popconfirm
              style={{ maxWidth: '300px' }}
              title={formatMessage(messages.deleteAgentDescription)}
              onConfirm={e => {
                onDeleteAAgent(record, e);
              }}
              onCancel={e => {
                onClickCancel(record, e);
              }}
              okText={formatMessage(commonMessages.yes)}
              cancelText={formatMessage(commonMessages.no)}
            >
              <Button
                size="small"
                style={actionButtonStyle}
                onClick={e => {
                  onClickDelete(record, e);
                }}
              >
                <FormattedMessage {...commonMessages.delete} />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  if (inited) {
    if (!agents || !agents.length) {
      content = (
        <EmptyContainer>
          <Empty
            description={
              <span>
                <FormattedHTMLMessage {...messages.emptyAgents} />
              </span>
            }
          >
            <Button type="primary" onClick={onRegisterAgent}>
              <FormattedMessage {...messages.registerNow} />
            </Button>
          </Empty>
        </EmptyContainer>
      );
    } else {
      content = (
        <div>
          <div style={{ padding: '0 24px' }}>
            <div style={{ padding: '0 0 20px 0' }}>
              <Button onClick={onRegisterAgent} type="primary">
                <FormattedMessage {...messages.registerNow} />
              </Button>
            </div>
            <Table
              bordered
              pagination={false}
              rowClassName={record => {
                let selected = false;
                selectedRowKeys.forEach(item => {
                  if (item === record._id) {
                    selected = true;
                  }
                });
                if (selected) {
                  return 'selected-row';
                }
                return '';
              }}
              columns={columns}
              rowSelection={{
                selectedRowKeys,
                type: 'radio',
                onSelect: record => {
                  // console.log('rowSelection onSelect: ', record);
                  setSelectedRowKeys([record._id]);
                  onShowDrawer(record);
                },
              }}
              dataSource={agents}
              rowKey={record => record._id}
              onRow={record => {
                return {
                  onClick: () => {
                    // console.log('onRow->onClick: ', record);
                    // this.selectRow(record);
                    setSelectedRowKeys([record._id]);
                    onShowDrawer(record);
                  },
                };
              }}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <Card>
      {/* <DiaPageHeader title={formatMessage(messages.header)} /> */}
      {content}
      <RegisterAgentForm
        visiable={drawerVisiable}
        onCloseDrawer={onCloseDrawer}
        agent={selectedAgent}
        dispatch={dispatch}
      />
    </Card>
  );
}

export default connect(({agents}) => ({
  agents: agents.data
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
