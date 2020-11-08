/* eslint-disable @typescript-eslint/camelcase */
import { Button, Result } from 'antd';

import React from 'react';
import { history } from 'umi' // 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  ></Result>
);

export default NoFoundPage;
