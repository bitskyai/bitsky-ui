import commonConfig from './commonConfig';
import { defineConfig } from 'umi';

const menuRouters = [
  { path: '/app/', redirect: '/app/tasks' },
  {
    path: '/app/tasks',
    name: 'tasks',
    icon: 'info-circle',
    component: '@/pages/Tasks',
  },
  {
    path: '/app/retailers',
    name: 'retailers',
    icon: 'cloud-server',
    component: '@/pages/Retailers',
  },
  {
    path: '/app/producers',
    name: 'producers',
    icon: 'cluster',
    component: '@/pages/Producers',
  },
  {
    path: '/app/taskshistory',
    name: 'taskshistory',
    icon: 'history',
    component: '@/pages/TasksHistory',
  },
];

export default defineConfig({...commonConfig, ...{
  analytics:{
    ga: "G-CGSNBMEGGW"
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/BlankLayout',
      routes: [
        { path: '/', redirect: '/app/tasks' },
        { path: '/home', redirect: '/app/tasks' },
        {
          path: '/app',
          component: '@/layouts/BasicLayout',
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
}});
