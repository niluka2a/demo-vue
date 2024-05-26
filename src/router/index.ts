import {createRouter, createWebHistory} from 'vue-router'
import type {Router, NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from "@/views/ProfileView.vue";
import {useAuthStore} from "@/stores/auth";

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: HomeView
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
    const authStore = useAuthStore()
    await authStore.verifyToken()

    // login page,redirect to profile logged-in users.
    if (to.name === 'login') {
        if (authStore.isLoggedIn) {
            next({name: 'profile'})
        }
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!authStore.isLoggedIn) {
            next({name: 'login'})
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
