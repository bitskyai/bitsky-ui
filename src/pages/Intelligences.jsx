import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Intelligences from '@/containers/Intelligences';

export default () => {
  return (
    <PageHeaderWrapper>
      {/* <div>Intelligences Page</div> */}
      <Intelligences />
    </PageHeaderWrapper>
  );
};
