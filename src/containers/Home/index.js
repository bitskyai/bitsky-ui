import React, { useEffect } from 'react';

import Home from '@/components/Home';
import { connect } from 'dva';

const HomeCtn = props => {
  const { currentUser, landing } = props;

  useEffect(() => {}, []);

  return <Home currentUser={currentUser} landing={landing} />;
};

// export default Layout;
export default connect(({ user, global }) => ({
  currentUser: user && user.currentUser,
  landing: global && global.landing,
}))(HomeCtn);
