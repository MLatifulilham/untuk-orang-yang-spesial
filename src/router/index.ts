import { createRouter, createWebHistory } from 'vue-router'

import page from '@/views/page.vue'
import page1 from '@/views/page1.vue'
import page2 from '@/views/page2.vue'
import page3 from '@/views/page3.vue'
import page4 from '@/views/page4.vue'
import page5 from '@/views/page5.vue'
import page6 from '@/views/page6.vue'
import page7 from '@/views/page7.vue'
import page8 from '@/views/page8.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: page
    },
    {
      path: '/page1',
      component: page1
    },
    {
      path: '/page2',
      component: page2
    },
    {
      path: '/page3',
      component: page3
    },
    {
      path: '/page4',
      component: page4
    },
    {
      path: '/page5',
      component: page5
    },
    {
      path: '/page6',
      component: page6
    },
    {
      path: '/page7',
      component: page7
    },
    {
      path: '/page8',
      component: page8
    }
  ]
})

export default router
