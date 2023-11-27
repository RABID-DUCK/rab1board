import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('../views/MainPage.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue')
        },
        {
            path: '/dashboard/:id/:title',
            name: 'dashboard',
            component: () => import('../views/Dashboard.vue'),
            props: (route) => ({ title: route.params.title }),
            beforeEnter: (to, from, next) => {
                if (to.query.dash_id) {
                    this.$store.dispatch('set_dash_id', to.query.dash_id)
                }
                next()
            }
        }
    ]
})

export default router
