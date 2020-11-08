import { Avatar, Icon, Menu, Spin } from 'antd';

import { Link, connect, FormattedMessage } from 'umi';
import React from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
    }
  };

  render() {
    const { currentUser = {}, menu } = this.props;

    if (!menu) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={
              currentUser.avatar ||
              'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
            }
            alt="avatar"
          />
          <span className={styles.name}>{currentUser.profile.name}</span>
        </span>
      );
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* <Menu.Item key="center">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item> */}
        <Menu.Item key="settings">
          <Link to="/app/settings">
            <Icon type="setting" />
            <FormattedMessage id="app.common.messages.settings" />
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <a href="/apis/logout">
            <Icon type="logout" />
            <FormattedMessage id="app.common.messages.logout" />
          </a>
        </Menu.Item>
      </Menu>
    );
    // console.log('currentUser.profile.name: ', currentUser.profile.name);
    return currentUser && currentUser.profile && currentUser.profile.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={
              currentUser.avatar ||
              'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
            }
            alt="avatar"
          />
          <span className={styles.name}>{currentUser.profile.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
