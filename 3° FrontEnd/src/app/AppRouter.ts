import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './views/HomeScreen/HomeComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
