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
    path: '/project/:id',
    name: 'ProjectDetail',
    props: true,
    meta: {
      layout: 'default',
    },
    component: () => import('../views/ProjectDetail.vue'),
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