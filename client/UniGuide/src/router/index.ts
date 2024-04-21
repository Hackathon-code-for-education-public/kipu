// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PanoramaView from "@/views/PanoramaView.vue";
import UniversityDetails from "@/views/UniversityDetails.vue";

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
      path: '/university/:slug',
      name: 'university',
      component: UniversityDetails
    },
    {
      path: 'profile/:id',
      name: 'profile',
      component: Profile
    }
  ]
})

export default router
