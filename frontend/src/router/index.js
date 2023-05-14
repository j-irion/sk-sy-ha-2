import { createWebHistory, createRouter } from "vue-router"
import StartPage from '@/views/StartPage.vue'
import ImpressumTodo from '@/views/ImpressumTodo.vue'
import EditTodo from '@/views/EditTodo.vue'

const routes = [
    {
        path: '/',
        name: 'StartPage',
        component: StartPage
    },
    {
        path: '/impressum',
        name: 'ImpressumTodo',
        component: ImpressumTodo
    },
    {
        path: '/edit',
        name: 'EditTodo',
        component: EditTodo
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router 