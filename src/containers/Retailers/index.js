import { Button, Col, Empty, Icon, Popconfirm, Row, Table, message, Tooltip } from 'antd';
import { FormattedHTMLMessage, formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
/**
 *
 * Retailers
 *
 */
import React from 'react';
import TimeAgo from 'react-timeago';
// import { connect } from 'react-redux';
import { connect } from 'dva';
// import dayjs from 'dayjs';
import styled from 'styled-components';
import RetailersSkeleton from './RetailersSkeleton';
import RegisterRetailerForm from './RegisterRetailerForm';
import { refreshRetailers, refreshRetailersFail, refreshRetailersSuccess } from './actions';
import { deleteARetailerAPI, getRetailers, pingRetailerAPI } from '../../apis/retailers';
import { STATES } from '../../utils/constants';
import StateTag from '../../utils/StateTag';

import './style.css';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

const actionButtonStyle = {
  margin: '0 0 0 0',
};

export class RetailersNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      selectedRowKeys: [],
      drawerVisiable: false,
      selectedRetailer: undefined,
    };
  }

  componentDidMount() {
    this.initRetailersData();
  }

  onRegisterRetailer() {
    this.setState({
      drawerVisiable: true,
      selectedRetailer: undefined,
    });
  }

  onShowDrawer(retailer) {
    this.setState({
      drawerVisiable: true,
      selectedRetailer: retailer,
    });
  }

  onCloseDrawer() {
    this.setState({
      drawerVisiable: false,
      selectedRetailer: undefined,
    });
  }

  static onPreventShowDrawer(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDeleteARetailer(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onDeleteARetailer: `, record);
    deleteARetailerAPI(record.globalId).then(
      () => {
        this.props.dispatch(refreshRetailers());
        const msg = formatMessage({ id: 'app.containers.Retailers.deleteRetailerSuccessful' });
        message.success(msg);
      },
      err => {
        message.error(err);
      },
    );
  }

  onPingRetailer(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onDeleteARetailer: `, record);
    pingRetailerAPI(record.globalId).then(
      result => {
        if (result && result.state === STATES.active) {
          message.success(
            <span
              dangerouslySetInnerHTML={{
                __html: formatMessage({ id: 'app.containers.Retailers.pingSuccessful' }),
              }}
            ></span>,
          );
        } else {
          message.error(
            <span
              dangerouslySetInnerHTML={{
                __html: formatMessage({ id: 'app.containers.Retailers.pingFail' }),
              }}
            ></span>,
          );
        }
        this.props.dispatch(refreshRetailers());
      },
      () => {
        message.error(formatMessage({ id: 'app.containers.Retailers.pingFail' }));
        this.props.dispatch(refreshRetailers());
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

  initRetailersData() {
    this.setState({
      loadingData: true,
    });
    getRetailers().then(
      retailers => {
        this.setState({
          loadingData: true,
        });
        // add key to retailers
        // retailers = retailers.map((item, index) => {
        //   item.key = item._id || index;
        //   return item;
        // });
        this.props.dispatch(refreshRetailersSuccess(retailers));
      },
      err => {
        this.setState({
          loadingData: true,
        });
        this.props.dispatch(refreshRetailersFail(err));
      },
    );
  }

  render() {
    const { loadingData, drawerVisiable, selectedRetailer, selectedRowKeys } = this.state;
    const retailers = this.props.retailersData.data;
    const modified = this.props.retailersData.modifiedAt;
    let content = <RetailersSkeleton />;

    const columns = [
      {
        title: formatMessage({ id: 'app.containers.Retailers.retailerName' }),
        dataIndex: 'name',
      },
      {
        title: formatMessage({ id: 'app.containers.Retailers.baseURL' }),
        dataIndex: 'baseURL',
      },
      {
        title: formatMessage({ id: 'app.common.messages.connection' }),
        dataIndex: 'system.state',
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
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record) => (
          <div
            onClick={e => {
              RetailersNew.onPreventShowDrawer(e);
            }}
          >
            <Tooltip title={formatMessage({ id: 'app.containers.Retailers.pingDescription' })}>
              <Button
                type="link"
                size="small"
                style={actionButtonStyle}
                title={formatMessage({ id: 'app.containers.Retailers.pingDescription' })}
                onClick={e => {
                  this.onPingRetailer(record, e);
                }}
              >
                {formatMessage({ id: 'app.containers.Retailers.ping' })}
              </Button>
            </Tooltip>
            <Popconfirm
              style={{ maxWidth: '300px' }}
              title={formatMessage({ id: 'app.containers.Retailers.deleteRetailerDescription' })}
              onConfirm={e => {
                this.onDeleteARetailer(record, e);
              }}
              onCancel={e => {
                RetailersNew.onClickCancel(record, e);
              }}
              okText={formatMessage({ id: 'app.common.messages.yes' })}
              cancelText={formatMessage({ id: 'app.common.messages.no' })}
            >
              <Button
                type="link"
                size="small"
                style={actionButtonStyle}
                onClick={e => {
                  RetailersNew.onClickDelete(record, e);
                }}
              >
                {formatMessage({ id: 'app.common.messages.delete' })}
              </Button>
            </Popconfirm>
          </div>
        ),
      },
    ];

    if (loadingData) {
      if (!retailers || !retailers.length) {
        content = (
          <EmptyContainer>
            <Empty
              description={
                <span>
                  <FormattedHTMLMessage id="app.containers.Retailers.emptyRetailers" />
                </span>
              }
            >
              <Tooltip title={formatMessage({ id: 'app.containers.Retailers.drawerTitle' })}>
                <Button
                  type="primary"
                  onClick={() => {
                    this.onRegisterRetailer();
                  }}
                >
                  {formatMessage({ id: 'app.common.messages.create' })}
                </Button>
              </Tooltip>
            </Empty>
          </EmptyContainer>
        );
      } else {
        content = (
          <div className="retailers-table-container">
            <div>
              <div style={{ paddingBottom: '15px' }}>
                <Row>
                  <Col span={14}>
                    <Tooltip title={formatMessage({ id: 'app.containers.Retailers.drawerTitle' })}>
                      <Button
                        onClick={() => {
                          this.onRegisterRetailer();
                        }}
                        type="primary"
                      >
                        {formatMessage({ id: 'app.common.messages.create' })}
                      </Button>
                    </Tooltip>
                  </Col>
                  <Col span={10} style={{ textAlign: 'right' }}>
                    <Button
                      type="link"
                      onClick={() => this.initRetailersData()}
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
                  bordered
                  pagination={false}
                  rowClassName={record => {
                    let selected = false;
                    selectedRowKeys.forEach(item => {
                      if (item === record.globalId) {
                        selected = true;
                      }
                    });
                    if (selected) {
                      return 'selected-row';
                    }
                    return '';
                  }}
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
                  dataSource={retailers}
                  rowKey={record => record.globalId}
                  onRow={record => ({
                    onClick: () => {
                      // console.log('onRow->onClick: ', record);
                      // this.selectRow(record);
                      // setSelectedRowKeys([record._id]);
                      this.setState({
                        selectedRowKeys: [record.globalId],
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
          <RegisterRetailerForm
            visiable={drawerVisiable}
            onCloseDrawer={() => {
              this.onCloseDrawer();
            }}
            retailer={selectedRetailer}
            dispatch={this.props.dispatch}
          />
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({ retailers }) => ({
  retailersData: retailers,
}))(RetailersNew);

// Retailers.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   retailers: makeSelectRetailers(),
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

// export default compose(withConnect)(injectIntl(Retailers));
