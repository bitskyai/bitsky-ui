const plugins = [
  [
    'umi-plugin-ga',
    {
      code: 'G-86KRJB7TB7',
    },
  ],
];

export default {
  // umi routes: https://umijs.org/zh/guide/router.html
  plugins,
  routes: [
    {
      path: '/',
      component: '../layouts/LandingLayout',
      routes: [{ path: '/', component: './Home' }],
    },
  ],
};
