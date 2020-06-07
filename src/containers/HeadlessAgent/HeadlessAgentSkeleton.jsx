import React from 'react';
import { Skeleton } from 'antd';

export default function HeadlessAgentSkeleton() {
  return (
    <div style={{ padding: '0 24px' }}>
      <Skeleton title={false} active paragraph={{ width: '100%', rows: 6 }} />
    </div>
  );
}
