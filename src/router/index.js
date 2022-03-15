import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Blogs.vue'),
      },
      {
        path: 'blog/:articleId',
        component: () => import('../views/Blog.vue'),
      },
      {
        path: 'collections',
        component: () => import('../views/Collections.vue'),
      },
      {
        path: 'painting/:paintingId',
        component: () => import('../views/Painting.vue'),
      },
      {
        path: 'login',
        component: () => import('../views/Login.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/admin/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/admin/Paintings.vue'),
      },
      {
        path: 'collections',
        component: () => import('../views/admin/Collections.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/Coupons.vue'),
      },
      {
        path: 'posts',
        component: () => import('../views/admin/Posts.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
