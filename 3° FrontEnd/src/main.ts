import { createApp } from 'vue'
import App from './app/App.vue'
import './style.css'
import router from './app/AppRouter'
import store from './app/shared/vuex/store'

const app = createApp(App);

window.Vue = app
window.Vue.router = router

if (import.meta.env.VITE_PROD) {
    app.config.warnHandler = () => {};
    app.config.globalProperties.__VUE_PROD_DEVTOOLS__ = false;
}

app.use(router);
app.use(store);
app.mount('#app');