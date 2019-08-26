import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Home from '@/components/Home';

const HomeCtn = props => {
  const { dispatch, currentUser } = props;

  useEffect(() => {

  }, []);

  return <Home currentUser={currentUser}/>;
};

// export default Layout;
export default connect(({user}) => ({
  currentUser: user&&user.currentUser
}))(HomeCtn);
