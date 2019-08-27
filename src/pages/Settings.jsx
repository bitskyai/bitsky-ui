import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Settings from '@/containers/Settings';

export default () => {
  return (
    <PageHeaderWrapper>
      {/* <div>Intelligences Page</div> */}
      <Settings />
    </PageHeaderWrapper>
  );
};
