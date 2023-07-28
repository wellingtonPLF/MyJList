import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './views/HomeScreen/HomeComponent.vue'
import GameComponent from './views/GameScreen/GameComponent.vue';
import AboutComponent from './views/AboutScreen/AboutComponent.vue';
import UserComponent from './views/UserScreen/UserComponent.vue';
import SignInComponent from './views/SignInScreen/SignInComponent.vue';
import SignUpComponent from './views/SignUpScreen/SignUpComponent.vue';
import ProfileComponent from './views/ProfileScreen/ProfileComponent.vue';
import SingleGameComponent from './views/SingleGameScreen/SingleGameComponent.vue';
import GameListComponent from './views/GameListScreen/GameListComponent.vue';
import TestComponent from './views/TestScreen/TestComponent.vue';

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
    path: '/signIn',
    name: 'signIn',
    component: SignInComponent
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUpComponent
  },
  {
    path: '/users',
    name: 'users',
    component: UserComponent
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent
  },
  {
    path: '/singleGame',
    name: 'singleGame',
    component: SingleGameComponent
  },
  {
    path: '/gameList',
    name: 'gameList',
    component: GameListComponent
  },
  {
    path: '/test',
    name: 'test',
    component: TestComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
