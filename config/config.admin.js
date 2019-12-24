let menuRouters = [
  { path: '/app/', redirect: '/app/intelligences' },
  {
    path: '/app/intelligences',
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
    path: '/app/intellgienceshistory',
    name: 'intellgienceshistory',
    icon: 'history',
    component: './IntellgiencesHistory',
  },
  {
    path: '/app/settings',
    name: 'settings',
    icon: 'setting',
    component: './Settings',
  },
];

// If build target is electron, then need to add **Default SOI**
if (process.env.BUILD_TARGET_PLATFORM === 'electron') {
  menuRouters.splice(4, 0, {
    path: '#defaultsoi',
    name: 'defaultSOI',
    icon: 'cloud-server',
  });
}

export default {
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        { path: '/', redirect: '/app/intelligences' },
        { path: '/home', redirect: '/app/intelligences' },
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
