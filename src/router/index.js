import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultContent from '@/views/common/DefaultContent';

const routes = [
  {
    path: '/',
    name: 'Default Content',
    component: DefaultContent,
    children: [
      {
        path: '',
        component: () => import(/*webpackChunkName: "PriceEngine"*/ '../views/PriceEngine')
      },
      {
        path: 'price-calculator',
        component: () => import(/*webpackChunkName: "PriceCalculator"*/ '../views/PriceCalculator')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
