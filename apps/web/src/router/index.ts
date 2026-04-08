import { createRouter, createWebHistory } from 'vue-router';
import HealthPage from '../pages/HealthPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: HealthPage }],
});

export default router;
