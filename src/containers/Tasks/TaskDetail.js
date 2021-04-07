import { Drawer } from 'antd';
import * as _ from 'lodash';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/github.css';
import { useIntl } from 'umi';
import React, { useEffect } from 'react';

hljs.registerLanguage('json', json);

export default function TaskDetail(props) {
  const intl = useIntl();
  const { formatMessage } = intl;
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block);
      });
    }, 1000);
  });

  function formatTask(task) {
    if (!task) {
      return '';
    }
    if (_.get(task, 'system.failuresReason')) {
      // try to refmat to json
      try {
        task.system.failuresReason = JSON.parse(_.get(task, 'system.failuresReason'));
      } catch (err) {
        // keep it
      }
    }

    try {
      return JSON.stringify(task, null, 2);
    } catch (err) {
      return task;
    }
  }

  return (
    <div>
      <Drawer
        destroyOnClose
        title={formatMessage({ id: 'app.containers.Tasks.task.detail' })}
        width={720}
        onClose={props.onCloseDrawer}
        visible={props.visiable}
      >
        <pre>
          <code className="json">{formatTask(_.get(props, 'task'))}</code>
        </pre>
      </Drawer>
    </div>
  );
}
