import { Col, Icon, Menu, Popover, Row } from 'antd';

import { Link, formatMessage } from 'umi';
import PropTypes from 'prop-types';
import React from 'react';
import { enquireScreen } from 'enquire-js';
import BitSkyUserInfoCmp from '../UserInfoCmp';
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
          <a rel="noopener noreferrer" href="https://docs.bitsky.ai">
            <span>{formatMessage({ id: 'app.components.Home.document' })}</span>
          </a>
        </Menu.Item>
        <Menu.Item key="tutorials">
          <a rel="noopener noreferrer" href="https://docs.bitsky.ai/tutorials">
            {formatMessage({ id: 'app.components.Home.tutorials' })}
          </a>
        </Menu.Item>
        {!this.props.landing && menuMode === 'inline' ? (
          <Menu.Item key="signin">
            <Link to="/login">
              {formatMessage({ id: 'app.components.BitSkyUserInfoCmp.logIn' })}
            </Link>
          </Menu.Item>
        ) : (
          ''
        )}

        {!this.props.landing && menuMode === 'inline' ? (
          <Menu.Item key="signup">
            <Link to="/signup">
              {formatMessage({ id: 'app.components.BitSkyUserInfoCmp.signUp' })}
            </Link>
          </Menu.Item>
        ) : (
          ''
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
              <span>{formatMessage({ id: 'app.common.messages.bitsky' })}</span>
            </div>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              {this.props.landing ? (
                ''
              ) : (
                <div id="preview">
                  <BitSkyUserInfoCmp currentUser={this.props.currentUser} />
                </div>
              )}
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object,
  landing: PropTypes.bool,
};

Header.defaultProps = {
  currentUser: {},
  landing: false,
};

export default Header;
