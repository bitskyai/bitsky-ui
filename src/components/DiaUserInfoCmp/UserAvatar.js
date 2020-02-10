import { Avatar, Dropdown, Menu } from 'antd';

import PropTypes from 'prop-types';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

function UserAvatar({ profile }) {
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        {formatMessage({ id: 'app.components.DiaUserInfoCmp.profile' })}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="signOut">
        <a href="/apis/logout">{formatMessage({ id: 'app.components.DiaUserInfoCmp.signOut' })}</a>
      </Menu.Item>
    </Menu>
  );

  const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  let name;
  if (profile && profile.name) {
    name = profile.name[0].toUpperCase();
  }

  const avatarStyle = {
    margin: '0 20px',
    backgroundColor: '#f56a00',
    verticalAlign: 'middle',
  };

  let avatar = <Avatar style={avatarStyle} size="large" icon="user" />;

  if (name) {
    avatar = (
      <Avatar style={avatarStyle} size="large">
        {name}
      </Avatar>
    );
  }

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" href="#">
        {avatar}
      </a>
    </Dropdown>
  );
}

UserAvatar.propTypes = {
  profile: PropTypes.object,
};

export default UserAvatar;
