export default {
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/LandingLayout',
      routes: [{ path: '/', component: './Home' }],
    },
  ],
};
