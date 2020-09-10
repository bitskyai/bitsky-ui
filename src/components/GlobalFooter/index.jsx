import { Layout } from 'antd';
// import { GithubOutlined } from '@ant-design/icons';
// import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import './index.less';

const { Footer } = Layout;

const GlobalFooter = () => (
  <Footer style={{ textAlign: 'center' }}>
    {formatMessage({ id: 'app.common.messages.bitsky' })} -{' '}
    {formatMessage({ id: 'app.common.messages.slogan' })} © 2020 bitsky.ai
  </Footer>
);

export default GlobalFooter;
