import React, { useEffect } from 'react';
import { connect, setLocale } from 'umi';
import PageLoading from '@/components/PageLoading';

const LandingLayout = props => {
  const { dispatch, children, initedApp } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/initLanding',
      });
    }

    // ToDo: default set locale to `en-US`
    setLocale('en-US');
  }, []);
  if (!initedApp) {
    return <PageLoading />;
  }

  return children;
};

// export default Layout;
export default connect(({ global }) => ({
  initedApp: global.initedApp,
}))(LandingLayout);
