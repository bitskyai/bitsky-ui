import commonConfig from './commonConfig';
import { defineConfig } from 'umi';

export default defineConfig({...commonConfig, ...{
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/LandingLayout',
      routes: [{ path: '/', component: '@/pages/Home' }],
    },
  ],
}});

