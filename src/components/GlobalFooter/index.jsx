import { Layout } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
import './index.less';

const { Footer } = Layout;

const GlobalFooter = () => {
  const intl = useIntl();
  const { formatMessage } = intl;
  return <Footer style={{ textAlign: 'center' }}>
    {formatMessage({ id: 'app.common.messages.bitsky' })} -{' '}
    {formatMessage({ id: 'app.common.messages.slogan' })} © 2020 bitsky.ai
  </Footer>
};

export default GlobalFooter;
