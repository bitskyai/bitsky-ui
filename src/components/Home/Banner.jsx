import React from 'react';
import PropTypes from 'prop-types';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { Link } from 'react-router-dom';
import BannerImage from './component/BannerImage';

function Banner(props) {
  return (
    <div className="banner-wrapper">
      {/* {props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )} */}
      <QueueAnim className="banner-title-wrapper" type={props.isMobile ? 'bottom' : 'right'}>
        <div key="line" className="title-line-wrapper">
          <div className="title-line" style={{ transform: 'translateX(-64px)' }} />
        </div>
        <h1 key="h1">{formatMessage({ id: 'app.common.messages.slogan' })}</h1>
        <p key="content">{formatMessage({ id: 'app.components.Home.content' })}</p>
        <div key="button" className="button-wrapper">
          <Link to="/app">
            <Button style={{ margin: '0 16px' }} type="primary" ghost>
              {formatMessage({ id: 'app.components.Home.getStarted' })}
            </Button>
          </Link>
          <GitHubButton
            key="github-button"
            type="stargazers"
            namespace="munew"
            repo="dia-agents-browserextensions"
          />
        </div>
      </QueueAnim>
      {!props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerImage />
        </TweenOne>
      )}
    </div>
  );
}

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
