import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Menu, Dropdown, Avatar } from 'antd';

import messages from './messages';

function UserAvatar({ profile }) {
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <FormattedMessage {...messages.profile} />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="signOut">
        <a href="/apis/logout">
          <FormattedMessage {...messages.signOut} />
        </a>
      </Menu.Item>
    </Menu>
  );

  const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  let name = undefined;
  if (profile && profile.name) {
    name = profile.name[0].toUpperCase();
  }

  let avatarStyle = {
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
