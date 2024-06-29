import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import HelloWorld from '@/components/HelloWorld.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'home/hello',
          name: 'hello',
          component: HelloWorld
        },
        {
          path: 'home/about',
          name: 'about',
          component: AboutView
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  // 检查登录状态
  // if (!to.meta.public && !checkLoginIn()) {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
})

const checkLoginIn = () => {
  return localStorage.getItem('token')
}
export default router
