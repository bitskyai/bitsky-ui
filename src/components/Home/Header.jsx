import React from 'react';
import { Row, Col, Icon, Menu, Button, Popover } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { enquireScreen } from 'enquire-js';
import DiaUserInfoCmp from '../DiaUserInfoCmp';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: 'horizontal',
  };

  componentDidMount() {
    enquireScreen(b => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' });
    });
  }

  render() {
    const { menuMode, menuVisible } = this.state;

    const menu = (
      <Menu mode={menuMode} id="nav" key="nav">
        <Menu.Item key="home">
          <a>{formatMessage({ id: 'app.components.Home.home' })}</a>
        </Menu.Item>
        <Menu.Item key="docs">
          <a target="_blank" href="https://docs.munew.io">
            <span>{formatMessage({ id: 'app.components.Home.document' })}</span>
          </a>
        </Menu.Item>
        <Menu.Item key="examples">
          <a target="_blank" href="https://docs.munew.io/examples">
            {formatMessage({ id: 'app.components.Home.examples' })}
          </a>
        </Menu.Item>
        {menuMode === 'inline' && (
          <Menu.Item key="signin">
            <Link to="/signin">{formatMessage({ id: 'app.common.messages.signin' })}</Link>
          </Menu.Item>
        )}
        {menuMode === 'inline' && (
          <Menu.Item key="signup">
            <Link to="/signup">{formatMessage({ id: 'app.common.messages.signin' })}</Link>
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon className="nav-phone-icon" type="menu" onClick={this.handleShowMenu} />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <div id="logo" to="/">
              <img src={logo} alt="logo" />
              <span>{formatMessage({ id: 'app.common.messages.munew' })}</span>
            </div>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              <div id="preview">
                <DiaUserInfoCmp />
              </div>
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
