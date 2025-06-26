import { createRouter, createWebHistory } from 'vue-router'
import ProductViewer2 from '@/pages/ProductViewer2.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/product-viewer-2',
      name: 'ProductViewer2',
      component: ProductViewer2
    },
    // ...other routes
  ]
})