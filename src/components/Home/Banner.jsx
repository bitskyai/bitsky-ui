import { Button } from 'antd';
import GitHubButton from 'react-github-button';
import Link from 'umi/link';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import TweenOne from 'rc-tween-one';
import { formatMessage } from 'umi-plugin-react/locale';
import BannerImage from './component/BannerImage';

function Banner(props) {
  const OS = {
    MACOSX: 'Mac OS',
    IOS: 'iOS',
    WINDOWS: 'Windows',
    ANDROID: 'Android',
    LINUX: 'Linux',
  };
  function getOS() {
    const { userAgent } = window.navigator;
    const { platform } = window.navigator;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = OS.MACOSX;
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = OS.IOS;
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = OS.WINDOWS;
    } else if (/Android/.test(userAgent)) {
      os = OS.ANDROID;
    } else if (!os && /Linux/.test(platform)) {
      os = OS.LINUX;
    }

    return os;
  }

  function getDownloadLinkByOS() {
    const os = getOS();
    let downloadLink = 'https://docs.munew.io/how-tos/setup-munew';
    if (os === OS.MACOSX) {
      downloadLink = 'https://github.com/munew/dia/releases/latest/download/Munew-osx.zip';
    } else if (os === OS.WINDOWS) {
      downloadLink = 'https://github.com/munew/dia/releases/latest/download/Munew-wins.exe';
    }
    return downloadLink;
  }

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
          <a target="_blank" rel="noopener noreferrer" href={getDownloadLinkByOS()}>
            <Button style={{ margin: '0 16px' }} type="primary" icon="download">
              {formatMessage({ id: 'app.components.Home.download' })}
            </Button>
          </a>
          <GitHubButton key="github-button" type="stargazers" namespace="munew" repo="dia" />
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
