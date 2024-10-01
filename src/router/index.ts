// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '/',
                name: 'Episodes',
                component: () => import('@/views/Episodes.vue'),
            },
            {
                path: 'characters',
                name: 'Characters',
                component: () => import('@/views/Characters.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
