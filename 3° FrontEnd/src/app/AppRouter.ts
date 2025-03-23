import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './views/HomeScreen/HomeComponent.vue'
import SupportComponent from './views/SupportScreen/SupportComponent.vue'
import GameComponent from './views/GameScreen/GameComponent.vue';
import AboutComponent from './views/AboutScreen/AboutComponent.vue';
import UserComponent from './views/UserScreen/UserComponent.vue';
import SignInComponent from './views/SignInScreen/SignInComponent.vue';
import SignUpComponent from './views/SignUpScreen/SignUpComponent.vue';
import AuthUserComponent from './views/AuthUserScreen/AuthUserComponent.vue';
import SingleGameComponent from './views/SingleGameScreen/SingleGameComponent.vue';
import RegistryComponent from './views/RegistryScreen/RegistryComponent.vue';
import TestComponent from './views/TestScreen/TestComponent.vue';
import LimitComponent from './views/LimitScreen/LimitComponent.vue';
import SingleUserComponent from './views/SingleUserScreen/SingleUserComponent.vue';
import MaintenanceComponent from './components/_main/Maintenance/MaintenanceComponent.vue';
import AccessComponent from './views/AccessHostname/AccessComponent.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/support',
    name: 'support',
    component: SupportComponent
  },
  {
    path: '/game',
    name: 'game',
    component: GameComponent
  },
  {
    path: '/limit',
    name: 'limit',
    component: LimitComponent
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
    component: AuthUserComponent
  },
  {
    path: '/user/:id',
    name: 'singleUser',
    component: SingleUserComponent
  },
  {
    path: '/singleGame/:id',
    name: 'singleGame',
    component: SingleGameComponent
  },
  {
    path: '/gameList/:id',
    name: 'gameList',
    component: RegistryComponent
  },
  {
    path: '/test',
    name: 'test',
    component: TestComponent
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: MaintenanceComponent
  },
  {
    path: '/access',
    name: 'access',
    component: AccessComponent
  },  
]


const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((_, __, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router
