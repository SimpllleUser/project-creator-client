export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'default',
    },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      layout: 'empty',
    },
    component: () => import('../views/About.vue'),
  }
];