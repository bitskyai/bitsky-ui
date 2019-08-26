import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
// const Layout = ({ children }) => <div>{children}</div>;

const BlankLayout = props => {
  const { dispatch, children } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  return <div>{children}</div>;
};

// export default Layout;
export default connect(({}) => ({}))(BlankLayout);
