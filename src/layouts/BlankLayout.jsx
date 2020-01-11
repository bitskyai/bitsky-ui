import React, { useEffect } from 'react';
import { connect } from 'dva';
import PageLoading from '@/components/PageLoading';
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
  // return <div style={{ height: '100%' }}>{children}</div>;
  return children;
};

// export default Layout;
export default connect(({ global }) => ({
  initedApp: global.initedApp,
}))(BlankLayout);
