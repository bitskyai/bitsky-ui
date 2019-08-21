/**
 *
 * DiaHeaderCmp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Typography, Row, Col } from 'antd';
const { Text } = Typography;
import { formatMessage } from 'umi-plugin-react/locale';
import UserAvatar from './UserAvatar';

function DiaUserInfoCmp(props) {
  let userInfo = (
    <div style={{ display: 'inline-block' }}>
      <Link to="/login">
        <Button type="link" style={{ padding: 0 }}>
          {formatMessage({ id: 'app.components.DiaUserInfoCmp.logIn' })}
        </Button>
      </Link>
      <Text style={{ margin: '0 10px' }}>
        {formatMessage({ id: 'app.components.DiaUserInfoCmp.or' })}
      </Text>
      <Link to="/signup">
        <Button type="primary">
          {formatMessage({ id: 'app.components.DiaUserInfoCmp.signUp' })}
        </Button>
      </Link>
    </div>
  );

  if (props.user && props.user.email) {
    // userInfo = getUserAvatar(props.user.profile);
    userInfo = <UserAvatar profile={props.user.profile} />;
  }
  return <div>{userInfo}</div>;
}

DiaUserInfoCmp.propTypes = {
  user: PropTypes.object,
};

export default DiaUserInfoCmp;
