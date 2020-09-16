import { getMenuData, getPageTitle } from '@ant-design/pro-layout';

// import GlobalFooter from '@/components/GlobalFooter';
import BitSkyFooter from '@/components/Footer';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/home">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>
                  {formatMessage({ id: 'app.common.messages.bitsky' })}
                </span>
              </Link>
            </div>
            <div className={styles.desc}>{formatMessage({ id: 'app.common.messages.slogan' })}</div>
          </div>
          {children}
        </div>
        <BitSkyFooter />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
