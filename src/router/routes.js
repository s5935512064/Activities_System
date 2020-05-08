const routes = [{
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [{
      path: '/',
      name: '/adminPage',
      component: () => import('pages/Admin.vue'),
      meta: {
        onlyAdmin: true
      }
    }]
  }, {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
        path: '/',
        name: 'home',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('pages/ShowAct.vue')
      },
      {
        path: '/dashboard',
        name: `manage`,
        component: () => import('pages/Dashboard.vue'),
        meta: {
          requiresAuth: true
        }
      },
    ]
  },


  // {
  //   path: `*`,
  //   redirect: `/`
  // }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
