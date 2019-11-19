import React, { useEffect } from 'react';

import { Layout } from 'antd';
import PageLoading from '@/components/PageLoading';
import { connect } from 'dva';
// const Layout = ({ children }) => <div>{children}</div>;

const BlankLayout = props => {
  const { dispatch, children, initedApp } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/initApp',
      });
    }
  }, []);
  if (!initedApp) {
    return <PageLoading />;
  }
  return <div>{children}</div>;
};

// export default Layout;
export default connect(({ global }) => ({
  initedApp: global.initedApp,
}))(BlankLayout);
