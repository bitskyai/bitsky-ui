/**
 *
 * Sois
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
// import { connect } from 'react-redux';
import { connect } from 'dva';
import { formatMessage, FormattedMessage, FormattedHTMLMessage } from 'umi-plugin-react/locale';
import styled from 'styled-components';
// import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { Empty, Table, Button, Popconfirm, message, Row, Col, Icon } from 'antd';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectSois from './selectors';
// import reducer from './reducer';
// import saga from './saga';
// import messages fro../../locales/en-US/containers/Soisois';
// import commonMessages from '../../locales/en-US/globalMessages';
import RegisterSoiForm from './RegisterSoiForm';
import SOIsSkeleton from './SOIsSkeleton';
import { refreshSOIsSuccess, refreshSOIsFail, refreshSOIs } from './actions';
import { getSOIs, deleteASOIAPI, pingSOIAPI } from '../../apis/sois';
import './style.css';

// import DiaPageHeader from '../../components/Common';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

const actionButtonStyle = {
  margin: '0 10px 0 0',
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

  onPreventShowDrawer(event) {
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
        let msg = formatMessage({id:"app.containers.Sois.deleteSOISuccessful"});
        message.success(msg);
      },
      err => {
        message.error(err);
      },
    );
  }

  onPingSOI(record, event){
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onDeleteASOI: `, record);
    pingSOIAPI(record.globalId).then(
      () => {
        this.props.dispatch(refreshSOIs());
        let msg = formatMessage({id:"app.containers.Sois.pingSuccessful"});
        message.success(msg);
      },
      err => {
        message.error(err);
      },
    );
  }

  onClickCancel(record, event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(`onClickCancel: `, record);
  }

  onClickDelete(record, event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(record);
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

  componentDidMount(){
    this.initSoisData();
  }

  render() {
    let { loadingData, drawerVisiable, selectedSOI, selectedRowKeys } = this.state;
    let sois = this.props.soisData.data;
    let modified = this.props.soisData.modifiedAt;
    let content = <SOIsSkeleton />;

    const columns = [
      {
        title: formatMessage({id:"app.containers.Sois.soiName"}),
        dataIndex: 'name',
      },
      {
        title: formatMessage({id:"app.containers.Sois.baseURL"}),
        dataIndex: 'baseURL',
      },
      {
        title: formatMessage({id:"app.containers.Sois.status"}),
        dataIndex: 'system.state',
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record) => {
          return (
            <div
              onClick={e => {
                this.onPreventShowDrawer(e);
              }}
            >
              <Button
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
                title={formatMessage({id:"app.containers.Sois.deleteSOIDescription"})}
                onConfirm={e => {
                  this.onDeleteASOI(record, e);
                }}
                onCancel={e => {
                  this.onClickCancel(record, e);
                }}
                okText={formatMessage({id:'app.common.messages.yes'})}
                cancelText={formatMessage({id:'app.common.messages.no'})}
              >
                <Button
                  size="small"
                  style={actionButtonStyle}
                  onClick={e => {
                    this.onClickDelete(record, e);
                  }}
                >
                  {formatMessage({id:'app.common.messages.delete'})}
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];

    if (loadingData) {
      if (!sois || !sois.length) {
        content = (
          <EmptyContainer>
            <Empty
              description={
                <span>
                  {formatMessage({id:"app.containers.Sois.emptySOIs"})}
                </span>
              }
            >
              <Button
                type="primary"
                onClick={() => {
                  this.onRegisterSOI();
                }}
              >
                {formatMessage({id:"app.containers.Sois.registerNow"})}
              </Button>
            </Empty>
          </EmptyContainer>
        );
      } else {
        content = (
          <div className="sois-table-container">
            <div style={{ padding: '0 24px' }}>
              <div style={{ paddingBottom: '15px' }}>
                <Row>
                  <Col span={14}>
                    <Button
                      onClick={() => {
                        this.onRegisterSOI();
                      }}
                      type="primary"
                    >
                      {formatMessage({id:"app.containers.Sois.registerNow"})}
                    </Button>
                  </Col>
                  <Col span={10} style={{ textAlign: 'right' }}>
                    <Button
                      type="link"
                      onClick={() => this.initSoisData()}
                      // disabled={loadingIntelligencesData}
                    >
                      {dayjs(modified).format('YYYY/MM/DD HH:mm:ss')}
                      <Icon
                        type="sync"
                        style={{ verticalAlign: '0', marginLeft: '5px' }}
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
                      // setSelectedRowKeys([record._id]);
                      this.setState({
                        selectedRowKeys: [record._id],
                      });
                      this.onShowDrawer(record);
                    },
                  }}
                  dataSource={sois}
                  rowKey={record => record._id}
                  onRow={record => {
                    return {
                      onClick: () => {
                        // console.log('onRow->onClick: ', record);
                        // this.selectRow(record);
                        // setSelectedRowKeys([record._id]);
                        this.setState({
                          selectedRowKeys: [record._id],
                        });
                        this.onShowDrawer(record);
                      },
                    };
                  }}
                />
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        {/* <DiaPageHeader title={formatMessage(messages.header)} /> */}
        {content}
        <RegisterSoiForm
          visiable={drawerVisiable}
          onCloseDrawer={() => {
            this.onCloseDrawer();
          }}
          soi={selectedSOI}
          dispatch={this.props.dispatch}
        />
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
