import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MonthlyView from '@/views/MonthlyView.vue'

const router = createRouter({
  history: createWebHashHistory(), 
  routes: [
    { path: '/', component: HomeView },
    { path: '/monthly', component: MonthlyView }
  ]
})

export default router