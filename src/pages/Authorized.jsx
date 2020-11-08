import Authorized from '@/utils/Authorized';
import React from 'react';
import { Redirect, connect } from 'umi';
import pathToRegexp from 'path-to-regexp';

const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  // const { currentUser } = user;
  // const { routes = [] } = route;
  // const isLogin = currentUser && currentUser.name;
  // return (
  //   <Authorized
  //     authority={getRouteAuthority(location.pathname, routes) || ''}
  //     noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
  //   >
  //     {children}
  //   </Authorized>
  // );

  const { currentUser } = user;
  if (currentUser && currentUser.profile) {
    return <div>{children}</div>;
  }
  return <Redirect to="/login" />;
};

export default connect(({ user }) => ({
  user,
}))(AuthComponent);
