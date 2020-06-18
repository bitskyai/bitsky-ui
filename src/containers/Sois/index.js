import './style.css';
import { Button, Col, Empty, Icon, Popconfirm, Row, Table, message } from 'antd';
import { FormattedHTMLMessage, formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
/**
 *
 * Sois
 *
 */
import React from 'react';
import TimeAgo from 'react-timeago';
// import { connect } from 'react-redux';
import { connect } from 'dva';
// import dayjs from 'dayjs';
import styled from 'styled-components';
import SOIsSkeleton from './SOIsSkeleton';
import RegisterSoiForm from './RegisterSoiForm';
import { refreshSOIs, refreshSOIsFail, refreshSOIsSuccess } from './actions';
import { deleteASOIAPI, getSOIs, pingSOIAPI } from '../../apis/sois';
import { STATES } from '../../utils/constants';
import StateTag from '../../utils/StateTag';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

const actionButtonStyle = {
  margin: '0 0 0 0',
};

export class SoisNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      selectedRowKeys: [],
      drawerVisiable: false,
      selectedSOI: undefined,
    };
  }

  componentDidMount() {
    this.initSoisData();
  }

  onRegisterSOI() {
    this.setState({
      drawerVisiable: true,
      selectedSOI: undefined,
    });
  }

  onShowDrawer(soi) {
    this.setState({
      drawerVisiable: true,
      selectedSOI: soi,
    });
  }

  onCloseDrawer() {
    this.setState({
      drawerVisiable: false,
      selectedSOI: undefined,
    });
  }

  static onPreventShowDrawer(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDeleteASOI(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onDeleteASOI: `, record);
    deleteASOIAPI(record.globalId).then(
      () => {
        this.props.dispatch(refreshSOIs());
        const msg = formatMessage({ id: 'app.containers.Sois.deleteSOISuccessful' });
        message.success(msg);
      },
      err => {
        message.error(err);
      },
    );
  }

  onPingSOI(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onDeleteASOI: `, record);
    pingSOIAPI(record.globalId).then(
      result => {
        if (result && result.state === STATES.active) {
          message.success(formatMessage({ id: 'app.containers.Sois.pingSuccessful' }));
        } else {
          message.error(formatMessage({ id: 'app.containers.Sois.pingFail' }));
        }
        this.props.dispatch(refreshSOIs());
      },
      () => {
        message.error(formatMessage({ id: 'app.containers.Sois.pingFail' }));
        this.props.dispatch(refreshSOIs());
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

  initSoisData() {
    this.setState({
      loadingData: true,
    });
    getSOIs().then(
      sois => {
        this.setState({
          loadingData: true,
        });
        // add key to sois
        // sois = sois.map((item, index) => {
        //   item.key = item._id || index;
        //   return item;
        // });
        this.props.dispatch(refreshSOIsSuccess(sois));
      },
      err => {
        this.setState({
          loadingData: true,
        });
        this.props.dispatch(refreshSOIsFail(err));
      },
    );
  }

  render() {
    const { loadingData, drawerVisiable, selectedSOI, selectedRowKeys } = this.state;
    const sois = this.props.soisData.data;
    const modified = this.props.soisData.modifiedAt;
    let content = <SOIsSkeleton />;

    const columns = [
      {
        title: formatMessage({ id: 'app.containers.Sois.soiName' }),
        dataIndex: 'name',
      },
      {
        title: formatMessage({ id: 'app.containers.Sois.baseURL' }),
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
              SoisNew.onPreventShowDrawer(e);
            }}
          >
            <Button
              type="link"
              size="small"
              style={actionButtonStyle}
              title={formatMessage({ id: 'app.containers.Sois.pingDescription' })}
              onClick={e => {
                this.onPingSOI(record, e);
              }}
            >
              {formatMessage({ id: 'app.containers.Sois.ping' })}
            </Button>
            <Popconfirm
              style={{ maxWidth: '300px' }}
              title={formatMessage({ id: 'app.containers.Sois.deleteSOIDescription' })}
              onConfirm={e => {
                this.onDeleteASOI(record, e);
              }}
              onCancel={e => {
                SoisNew.onClickCancel(record, e);
              }}
              okText={formatMessage({ id: 'app.common.messages.yes' })}
              cancelText={formatMessage({ id: 'app.common.messages.no' })}
            >
              <Button
                type="link"
                size="small"
                style={actionButtonStyle}
                onClick={e => {
                  SoisNew.onClickDelete(record, e);
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
      if (!sois || !sois.length) {
        content = (
          <EmptyContainer>
            <Empty
              description={
                <span>
                  <FormattedHTMLMessage id="app.containers.Sois.emptySOIs" />
                </span>
              }
            >
              <Button
                type="primary"
                onClick={() => {
                  this.onRegisterSOI();
                }}
              >
                {formatMessage({ id: 'app.containers.Sois.registerNow' })}
              </Button>
            </Empty>
          </EmptyContainer>
        );
      } else {
        content = (
          <div className="sois-table-container">
            <div>
              <div style={{ paddingBottom: '15px' }}>
                <Row>
                  <Col span={14}>
                    <Button
                      onClick={() => {
                        this.onRegisterSOI();
                      }}
                      type="primary"
                    >
                      {formatMessage({ id: 'app.containers.Sois.registerNow' })}
                    </Button>
                  </Col>
                  <Col span={10} style={{ textAlign: 'right' }}>
                    <Button
                      type="link"
                      onClick={() => this.initSoisData()}
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
                  dataSource={sois}
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
          <RegisterSoiForm
            visiable={drawerVisiable}
            onCloseDrawer={() => {
              this.onCloseDrawer();
            }}
            soi={selectedSOI}
            dispatch={this.props.dispatch}
          />
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({ sois }) => ({
  soisData: sois,
}))(SoisNew);

// Sois.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   sois: makeSelectSois(),
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

// export default compose(withConnect)(injectIntl(Sois));
