import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './views/HomeScreen/HomeComponent.vue'
import GameComponent from './views/GameScreen/GameComponent.vue';
import AboutComponent from './views/AboutScreen/AboutComponent.vue';
import UserComponent from './views/UserScreen/UserComponent.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/game',
    name: 'game',
    component: GameComponent
  },
  {
    path: '/about',
    name: 'about',
    component: AboutComponent
  },
  {
    path: '/users',
    name: 'users',
    component: UserComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
