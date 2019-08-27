/**
 *
 * Sois
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
// import makeSelectSois from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import messages from './messages';
import commonMessages from '../../locales/en-US/globalMessages';
import RegisterSoiForm from './RegisterSoiForm';
import SOIsSkeleton from './SOIsSkeleton';
import { refreshSOIsSuccess, refreshSOIsFail, refreshSOIs } from './actions';
import { getSOIs, deleteASOIAPI } from '../../apis/sois';
import './style.css';

// import DiaPageHeader from '../../components/Common';

const EmptyContainer = styled.div`
  padding: 100px 0;
`;

export function Sois({ dispatch, sois }) {
  // useInjectReducer({ key: 'sois', reducer });
  // useInjectSaga({ key: 'sois', saga });
  // const { formatMessage } = intl;
  // loading data
  const [inited, setInited] = useState(false);
  // select row
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisiable, setDrawerVisiable] = useState(false);
  const [selectedSOI, setSelectedSOI] = useState(undefined);

  function onRegisterSOI() {
    setDrawerVisiable(true);
    setSelectedSOI(undefined);
  }

  function onShowDrawer(soi) {
    setDrawerVisiable(true);
    setSelectedSOI(soi);
  }

  function onCloseDrawer() {
    setDrawerVisiable(false);
    setSelectedSOI(undefined);
  }

  function onPreventShowDrawer(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onDeleteASOI(record, event) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(`onDeleteASOI: `, record);
    deleteASOIAPI(record.globalId).then(
      () => {
        dispatch(refreshSOIs());
        let msg = formatMessage(messages.deleteSOISuccessful);
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
    console.log(`onClickCancel: `, record);
  }

  function onClickDelete(record, event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(record);
  }

  // if didn't inited before, then need to get data from server side
  if (!inited) {
    getSOIs().then(
      sois => {
        setInited(true);
        // add key to sois
        // sois = sois.map((item, index) => {
        //   item.key = item._id || index;
        //   return item;
        // });
        dispatch(refreshSOIsSuccess(sois));
      },
      err => {
        setInited(true);
        dispatch(refreshSOIsFail(err));
      },
    );
  }
  let content = <SOIsSkeleton />;

  const columns = [
    {
      title: formatMessage(messages.soiName),
      dataIndex: 'name',
    },
    {
      title: formatMessage(messages.baseURL),
      dataIndex: 'baseURL',
    },
    {
      title: formatMessage(messages.status),
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
              onPreventShowDrawer(e);
            }}
          >
            <Popconfirm
              style={{ maxWidth: '300px' }}
              title={formatMessage(messages.deleteSOIDescription)}
              onConfirm={e => {
                onDeleteASOI(record, e);
              }}
              onCancel={e => {
                onClickCancel(record, e);
              }}
              okText={formatMessage(commonMessages.yes)}
              cancelText={formatMessage(commonMessages.no)}
            >
              <span
                onClick={e => {
                  onClickDelete(record, e);
                }}
              >
                <a href="#">
                  <FormattedMessage {...commonMessages.delete} />
                </a>
              </span>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  if (inited) {
    if (!sois || !sois.length) {
      content = (
        <EmptyContainer>
          <Empty
            description={
              <span>
                <FormattedHTMLMessage {...messages.emptySOIs} />
              </span>
            }
          >
            <Button type="primary" onClick={onRegisterSOI}>
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
              <Button onClick={onRegisterSOI} type="primary">
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
              dataSource={sois}
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
      <RegisterSoiForm
        visiable={drawerVisiable}
        onCloseDrawer={onCloseDrawer}
        soi={selectedSOI}
        dispatch={dispatch}
      />
    </Card>
  );
}

export default connect(({sois}) => ({
  sois: sois&&sois.data
}))(Sois);

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
