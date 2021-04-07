import commonConfig from './commonConfig';
import { defineConfig } from 'umi';

export default defineConfig({...commonConfig, ...{
  analytics:{
    ga: "G-86KRJB7TB7"
  },
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

