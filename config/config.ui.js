export default {
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      authority: ['admin', 'user'],
      routes: [
        { path: '/', redirect: '/app/tasks' },
        {
          path: '/home',
          routes: [
            {
              path: '/home',
              component: './Home',
            },
          ],
        },
        {
          path: '/login',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/login',
              component: './Login',
            },
          ],
        },
        {
          path: '/signup',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/signup',
              component: './Signup',
            },
          ],
        },
        {
          path: '/reset',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/reset/:id',
              component: './Reset',
            },
          ],
        },
        {
          path: '/forgot',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/forgot',
              component: './Forgot',
            },
          ],
        },
        {
          path: '/app',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          routes: [
            { path: '/app/', redirect: '/app/tasks' },
            {
              path: '/app/tasks',
              name: 'intelligences',
              icon: 'info-circle',
              component: './Intelligences',
            },
            {
              path: '/app/sois',
              name: 'sois',
              icon: 'cloud-server',
              component: './SOIs',
            },
            {
              path: '/app/agents',
              name: 'agents',
              icon: 'cluster',
              component: './Agents',
            },
            {
              path: '/app/settings',
              name: 'settings',
              icon: 'setting',
              component: './Settings',
            },
          ],
        },
      ],
    },
    {
      component: './404',
    },
  ],
  proxy: {
    '/apis/': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
  },
};
