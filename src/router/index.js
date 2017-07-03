import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing/Landing'
import Find from '@/components/Find/Find'
import Organize from '@/components/Organize/Organize'
import Success from '@/components/Success/Success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
        path: '/find',
        name: 'Find',
        component: Find
    },
    {
        path: '/organize',
        name: 'Organize',
        component: Organize
    },
    {
        path: '/success',
        name: 'Success',
        component: Success
    }
  ]
})
