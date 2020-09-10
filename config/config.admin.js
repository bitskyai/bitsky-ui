let menuRouters = [
  { path: '/app/', redirect: '/app/tasks' },
  {
    path: '/app/tasks',
    name: 'tasks',
    icon: 'info-circle',
    component: './Tasks',
  },
  {
    path: '/app/retailers',
    name: 'retailers',
    icon: 'cloud-server',
    component: './Retailers',
  },
  {
    path: '/app/producers',
    name: 'producers',
    icon: 'cluster',
    component: './Producers',
  },
  {
    path: '/app/taskshistory',
    name: 'taskshistory',
    icon: 'history',
    component: './TasksHistory',
  },
];

export default {
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        { path: '/', redirect: '/app/tasks' },
        { path: '/home', redirect: '/app/tasks' },
        {
          path: '/app',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          routes: menuRouters,
        },
      ],
    },
    {
      component: './404',
    },
  ],
  proxy: {
    '/apis/': {
      target: 'http://localhost:9099',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
  },
};
