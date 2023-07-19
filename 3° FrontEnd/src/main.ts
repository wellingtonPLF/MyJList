import { createApp } from 'vue'
import App from './app/App.vue'
import './style.css'
import router from './app/AppRouter'
import store from './app/shared/vuex/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faGamepad, faHandHoldingHeart, faBuilding, faHeadset, faVideo, faUser, faFileLines, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faTwitter, faFacebookSquare, faGithub, faInstagram, faXbox, faPlaystation } from '@fortawesome/free-brands-svg-icons'

const app = createApp(App);

library.add(faGamepad, faUser, faHandHoldingHeart, faBuilding, faHeadset, faFileLines, faVideo, faUsers)
library.add(faYoutube, faTwitter, faFacebookSquare, faGithub, faInstagram, faXbox, faPlaystation)
app.component('font-awesome-icon', FontAwesomeIcon)

window.Vue = app
window.Vue.router = router

if (import.meta.env.VITE_PROD) {
    app.config.warnHandler = () => {};
    app.config.globalProperties.__VUE_PROD_DEVTOOLS__ = false;
}

app.use(router);
app.use(store);
app.mount('#app');
