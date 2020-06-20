import React from 'react';
import _ from 'lodash';
import { Tag } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { AGENT_TYPES } from './constants';

export default function AgentType(props) {
  const color = 'purple';
  const type = _.toUpper(props.type);
  let text = '';
  if (type === AGENT_TYPES.browserExtension) {
    text = formatMessage({ id: 'app.common.messages.agentTypes.browser' });
  } else if (type === AGENT_TYPES.headlessBrowser) {
    text = formatMessage({ id: 'app.common.messages.agentTypes.headless' });
  } else if (type === AGENT_TYPES.service) {
    text = formatMessage({ id: 'app.common.messages.agentTypes.service' });
  }
  return <Tag color={color}>{text}</Tag>;
}
