let menuRouters = [
  { path: '/app/', redirect: '/app/tasks' },
  {
    path: '/app/tasks',
    name: 'intelligences',
    icon: 'info-circle',
    component: './Intelligences',
  },
  {
    path: '/app/retailers',
    name: 'sois',
    icon: 'cloud-server',
    component: './SOIs',
  },
  {
    path: '/app/producers',
    name: 'agents',
    icon: 'cluster',
    component: './Agents',
  },
  {
    path: '/app/taskshistory',
    name: 'intellgienceshistory',
    icon: 'history',
    component: './IntellgiencesHistory',
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
