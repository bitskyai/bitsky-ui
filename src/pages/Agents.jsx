import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Agents from '@/containers/Agents';

export default () => {
  return (
    <PageHeaderWrapper>
      {/* <div>Agents Page</div> */}
      <Agents />
    </PageHeaderWrapper>
  );
};
