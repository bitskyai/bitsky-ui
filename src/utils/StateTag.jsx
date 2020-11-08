import React from 'react';
import _ from 'lodash';
import { Tag } from 'antd';
import { useIntl } from 'umi';
import { STATES, STATES_COLOR_MAP } from './constants';

export default function StateTag(props) {
  let text = '';
  let color = '';
  const state = _.toUpper(props.state);
  if (state === STATES.draft) {
    text = formatMessage({ id: 'app.common.messages.states.draft' });
    color = STATES_COLOR_MAP.draft;
  } else if (state === STATES.configured) {
    text = formatMessage({ id: 'app.common.messages.states.configured' });
    color = STATES_COLOR_MAP.configured;
  } else if (state === STATES.active) {
    text = formatMessage({ id: 'app.common.messages.states.active' });
    color = STATES_COLOR_MAP.active;
  } else if (state === STATES.running) {
    text = formatMessage({ id: 'app.common.messages.states.running' });
    color = STATES_COLOR_MAP.running;
  } else if (state === STATES.finished) {
    text = formatMessage({ id: 'app.common.messages.states.finished' });
    color = STATES_COLOR_MAP.finished;
  } else if (state === STATES.failed) {
    text = formatMessage({ id: 'app.common.messages.states.failed' });
    color = STATES_COLOR_MAP.failed;
  } else if (state === STATES.timeout) {
    text = formatMessage({ id: 'app.common.messages.states.timeout' });
    color = STATES_COLOR_MAP.timeout;
  } else if (state === STATES.paused) {
    text = formatMessage({ id: 'app.common.messages.states.paused' });
    color = STATES_COLOR_MAP.paused;
  } else if (state === STATES.deleted) {
    text = formatMessage({ id: 'app.common.messages.states.deleted' });
    color = STATES_COLOR_MAP.deleted;
  } else if (state === STATES.noConnection) {
    text = formatMessage({ id: 'app.common.messages.connection.noConnection' });
    color = STATES_COLOR_MAP.noConnection;
  } else if (state === STATES.lostConnection) {
    text = formatMessage({ id: 'app.common.messages.connection.lostConnection' });
    color = STATES_COLOR_MAP.lostConnection;
  } else if (state === STATES.connected) {
    text = formatMessage({ id: 'app.common.messages.connection.connected' });
    color = STATES_COLOR_MAP.connected;
  } else if (state === STATES.connecting) {
    text = formatMessage({ id: 'app.common.messages.connection.connecting' });
    color = STATES_COLOR_MAP.connecting;
  }

  return <Tag color={color}>{text}</Tag>;
}
