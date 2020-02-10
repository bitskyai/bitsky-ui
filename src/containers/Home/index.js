import React, { useEffect } from 'react';

import Home from '@/components/Home';
import { Layout } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

const HomeCtn = props => {
  const { dispatch, currentUser } = props;

  useEffect(() => {}, []);

  return <Home currentUser={currentUser} />;
};

// export default Layout;
export default connect(({ user }) => ({
  currentUser: user && user.currentUser,
}))(HomeCtn);
