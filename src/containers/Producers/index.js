import './style.css';
import * as _ from 'lodash';
import { Button, Col, Empty, Icon, Popconfirm, Row, Table, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedHTMLMessage, formatMessage } from 'umi-plugin-react/locale';
/**
 *
 * Producers
 *
 */
import React from 'react';
import TimeAgo from 'react-timeago';
// import { connect } from 'react-redux';
import { connect } from 'dva';
// import dayjs from 'dayjs';
import styled from 'styled-components';
import RegisterProducerForm from './RegisterProducerForm';
import ProducersSkeleton from './ProducersSkeleton';
import { STATES } from '../../utils/constants';
import StateTag from '../../utils/StateTag';
import ProducerType from '../../utils/ProducerType';
import {
  activateProducerAPI,
  deactivateProducerAPI,
  disconnectProducerAPI,
  deleteProducerAPI,
  getProducersAPI,
} from '../../apis/producers';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

const actionButtonStyle = {
  margin: '0 0 0 0',
};

export class Producers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      drawerVisiable: false,
      selectedProducer: undefined,
    };
  }

  componentDidMount() {
    this.initProducersData();
  }

  onRegisterProducer() {
    this.setState({
      drawerVisiable: true,
      selectedProducer: undefined,
    });
  }

  onShowDrawer(producer) {
    this.setState({
      drawerVisiable: true,
      selectedProducer: producer,
    });
  }

  onCloseDrawer() {
    this.setState({
      drawerVisiable: false,
      selectedProducer: undefined,
    });
  }

  static onPreventShowDrawer(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDeleteAProducer(record, event) {
    event.preventDefault();
    event.stopPropagation();
    deleteProducerAPI(record.globalId).then(
      () => {
        this.props.dispatch({
          type: 'producers/refreshProducers',
        });
        const msg = formatMessage({ id: 'app.containers.Producers.deleteProducerSuccessful' });
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

  activateProducer(producer, event) {
    event.preventDefault();
    event.stopPropagation();
    activateProducerAPI(producer.globalId).then(() => {
      this.props.dispatch({
        type: 'producers/refreshProducers',
      });
      const msg = formatMessage({ id: 'app.containers.Producers.activateProducerSuccess' });
      message.success(msg);
    });
  }

  deactivateProducer(producer, event) {
    event.preventDefault();
    event.stopPropagation();
    deactivateProducerAPI(producer.globalId).then(() => {
      this.props.dispatch({
        type: 'producers/refreshProducers',
      });
      const msg = formatMessage({ id: 'app.containers.Producers.deactivateProducerSuccess' });
      message.success(msg);
    });
  }

  disconnectProducer(producer, event) {
    event.preventDefault();
    event.stopPropagation();
    disconnectProducerAPI(producer.globalId).then(() => {
      this.props.dispatch({
        type: 'producers/refreshProducers',
      });
      const msg = formatMessage({ id: 'app.containers.Producers.disconnectProducerSuccess' });
      message.success(msg);
    });
  }

  initProducersData() {
    this.setState({
      loadingData: true,
    });
    getProducersAPI().then(
      producers => {
        this.setState({
          loadingData: false,
        });
        // add key to producers
        // producers = producers.map((item, index) => {
        //   item.key = item._id || index;
        //   return item;
        // });
        // dispatch(refreshProducersSuccess(producers));
        this.props.dispatch({
          type: 'producers/refreshProducersSuccess',
          payload: producers,
        });
      },
      err => {
        this.setState({
          loadingData: false,
        });
        // dispatch(refreshProducersFail(err));
        this.props.dispatch({
          type: 'producers/refreshProducersFail',
          error: err,
        });
      },
    );
  }

  render() {
    const { loadingData, drawerVisiable, selectedProducer } = this.state;
    const producers = this.props.producersData.data;
    const modified = this.props.producersData.modifiedAt;
    let content = <ProducersSkeleton />;

    const columns = [
      {
        title: formatMessage({ id: 'app.containers.Producers.producerName' }),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: formatMessage({ id: 'app.containers.Producers.producerType' }),
        dataIndex: 'type',
        key: 'type',
        render: type => <ProducerType type={type} />,
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
              Producers.onPreventShowDrawer(e);
            }}
          >
            {(() => {
              if (record.system.state === STATES.active) {
                return (
                  <Button
                    type="link"
                    size="small"
                    style={actionButtonStyle}
                    title={formatMessage({ id: 'app.containers.Producers.deactivateDescription' })}
                    onClick={e => {
                      this.deactivateProducer(record, e);
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
                    title={formatMessage({ id: 'app.containers.Producers.activateDescription' })}
                    onClick={e => {
                      this.activateProducer(record, e);
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
                title={formatMessage({ id: 'app.containers.Producers.deactivateDescription' })}
                onClick={e => {
                  deactivateProducer(record, e);
                }}
              >
                {formatMessage({ id: 'app.common.messages.deactivate' })}
              </Button>
            ) : (
              <Button
                size="small"
                style={actionButtonStyle}
                title={formatMessage({ id: 'app.containers.Producers.activateDescription' })}
                onClick={e => {
                  activateProducer(record, e);
                }}
              >
                {formatMessage({ id: 'app.common.messages.activate' })}
              </Button>
            )} */}
            <Popconfirm
              style={{ maxWidth: '300px' }}
              title={formatMessage({ id: 'app.containers.Producers.deleteProducerDescription' })}
              onConfirm={e => {
                this.onDeleteAProducer(record, e);
              }}
              onCancel={e => {
                // this.onClickCancel(record, e);
                Producers.onClickCancel(record, e);
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
                  Producers.onClickDelete(record, e);
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
                title={formatMessage({ id: 'app.containers.Producers.disconnectDescription' })}
                onClick={e => {
                  // this.onClickDelete(record, e);
                  this.disconnectProducer(record, e);
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
      if (!producers || !producers.length) {
        content = (
          <EmptyContainer>
            <Empty
              description={
                <span>
                  <FormattedHTMLMessage id="app.containers.Producers.emptyProducers"></FormattedHTMLMessage>
                </span>
              }
            >
              <Button
                type="primary"
                onClick={() => {
                  this.onRegisterProducer();
                }}
              >
                {formatMessage({ id: 'app.containers.Producers.registerNow' })}
              </Button>
            </Empty>
          </EmptyContainer>
        );
      } else {
        content = (
          <div className="task-table-container">
            <div>
              <div style={{ paddingBottom: '15px' }}>
                <Row>
                  <Col span={14}>
                    <Button
                      onClick={() => {
                        this.onRegisterProducer();
                      }}
                      type="primary"
                    >
                      {formatMessage({ id: 'app.containers.Producers.registerNow' })}
                    </Button>
                  </Col>
                  <Col span={10} style={{ textAlign: 'right' }}>
                    <Button
                      type="link"
                      onClick={() => this.initProducersData()}
                      // disabled={loadingTasksData}
                    >
                      {/* {dayjs(modified).format('YYYY/MM/DD HH:mm:ss')} */}
                      <TimeAgo date={modified} />
                      <Icon
                        type="sync"
                        style={{ verticalAlign: 'middle', marginLeft: '5px' }}
                        // spin={loadingTasksData}
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
                  dataSource={producers}
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
          <RegisterProducerForm
            visiable={drawerVisiable}
            onCloseDrawer={() => {
              this.onCloseDrawer();
            }}
            producer={selectedProducer}
            dispatch={this.props.dispatch}
          />
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({ producers }) => ({
  producersData: producers,
}))(Producers);
