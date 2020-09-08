const menuRouters = [
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
    path: '/app/headless',
    name: 'defaultHeadless',
    icon: 'global',
    component: './HeadlessAgent',
    electron: true,
  },
  {
    path: '/app/service',
    name: 'defaultService',
    icon: 'thunderbolt',
    component: './ServiceAgent',
    electron: true,
  },
  {
    path: '#defaultsoi',
    name: 'defaultSOI',
    icon: 'cloud-server',
    electron: true,
  },
  {
    path: '/app/taskshistory',
    name: 'intellgienceshistory',
    icon: 'history',
    component: './IntellgiencesHistory',
  },
  {
    path: '#settings',
    name: 'settings',
    icon: 'setting',
    electron: true,
  },
];

export default {
  // umi routes: https://umijs.org/docs/routing
  // 1. relative path is relative to `src/pages`
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
