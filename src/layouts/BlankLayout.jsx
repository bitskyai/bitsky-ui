import React, { useEffect } from 'react';
import { connect, setLocale } from 'umi';
import PageLoading from '@/components/PageLoading';

const BlankLayout = props => {
  const { dispatch, children, initedApp } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/initApp',
      });
    }

    // ToDo: default set locale to `en-US`
    setLocale('en-US');
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
