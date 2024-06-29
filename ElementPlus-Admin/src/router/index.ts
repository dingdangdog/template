import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexView from '../views/Index.vue'
import LoginView from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // hidden: true,
      meta: { public: true },
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to', to)
  if (!to.meta.public && !checkLoginIn()) {
    next({ path: '/login' })
  } else {
    next()
  }
})

const checkLoginIn = () => {
  return localStorage.getItem('token')
}

export default router
