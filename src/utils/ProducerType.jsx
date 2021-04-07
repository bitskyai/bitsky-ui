import React from 'react';
import _ from 'lodash';
import { Tag } from 'antd';
import { useIntl } from 'umi';
import { PRODUCER_TYPES } from './constants';

export default function ProducerType(props) {
  const color = 'purple';
  const type = _.toUpper(props.type);
  let text = '';
  const intl = useIntl();
  const { formatMessage } = intl;
  if (type === PRODUCER_TYPES.browserExtension) {
    text = formatMessage({ id: 'app.common.messages.producerTypes.browser' });
  } else if (type === PRODUCER_TYPES.headlessBrowser) {
    text = formatMessage({ id: 'app.common.messages.producerTypes.headless' });
  } else if (type === PRODUCER_TYPES.http) {
    text = formatMessage({ id: 'app.common.messages.producerTypes.http' });
  }
  return <Tag color={color}>{text}</Tag>;
}
