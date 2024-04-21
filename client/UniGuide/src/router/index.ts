// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import Home from '@/views/Home.vue'
// @ts-ignore
import PanoramaView from "@/views/PanoramaView.vue";
// @ts-ignore
import UniversityDetails from "@/views/UniversityDetails.vue";
// @ts-ignore
import ChatView from "@/views/ChatView.vue";
// @ts-ignore
import Profile from "@/views/Profile.vue";

import { useCookies } from "vue3-cookies";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/panorama',
      name: 'panorama',
      component: PanoramaView
    },
    {
      path: '/university/:id',
      name: 'university',
      component: UniversityDetails
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        const { cookies } = useCookies()
        const token = cookies.get('token')
        if (!token) {
          next('/')
          return false
        }
        next()
        return true
      }
    }
  ]
})

export default router
