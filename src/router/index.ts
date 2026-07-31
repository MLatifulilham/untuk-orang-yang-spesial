import { createRouter, createWebHistory } from 'vue-router'

import Page from '@/views/page.vue'
import Page1 from '@/views/Page1.vue'
import Page2 from '@/views/Page2.vue'
import Page3 from '@/views/Page3.vue'
import Page4 from '@/views/Page4.vue'
import Page5 from '@/views/Page5.vue'
import Page6 from '@/views/Page6.vue'
import Page7 from '@/views/Page7.vue'
import Page8 from '@/views/Page8.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Page
    },
    {
      path: '/page1',
      component: Page1
    },
    {
      path: '/page2',
      component: Page2
    },
    {
      path: '/page3',
      component: Page3
    },
    {
      path: '/page4',
      component: Page4
    },
    {
      path: '/page5',
      component: Page5
    },
    {
      path: '/page6',
      component: Page6
    },
    {
      path: '/page7',
      component: Page7
    },
    {
      path: '/page8',
      component: Page8
    }
  ]
})

export default router
