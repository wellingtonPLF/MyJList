import { createApp } from "vue";
import App from "./app/App.vue";
import "./style.css";
import router from "./app/AppRouter";
import store from "./app/shared/vuex/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { registerRequestInterceptor, registerResponseInterceptor } from './app/AppInterceptor'

import {
  faGamepad,
  faHandHoldingHeart,
  faBuilding,
  faHeadset,
  faVideo,
  faUser,
  faFileLines,
  faUsers,
  faLink,
  faPaperPlane,
  faGift,
  faXmark,
  faUserPlus,
  faUserSlash,
  faChevronRight,
  faReply,
  faBroom,
  faArrowsRotate,
  faHouse,
  faPowerOff,
  faArrowTurnDown,
  faDoorOpen,
  faBan,
  faUserGroup,
  faSquareCheck,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faTwitter,
  faFacebookSquare,
  faGithub,
  faInstagram,
  faXbox,
  faPlaystation,
  faTwitch,
  faYoutubeSquare
} from "@fortawesome/free-brands-svg-icons";
import { faStar, faBell } from "@fortawesome/free-regular-svg-icons";


const app = createApp(App);

library.add(
  faGamepad,
  faSearch,
  faUserGroup,
  faSquareCheck,
  faUser,
  faHouse,
  faArrowTurnDown,
  faHandHoldingHeart,
  faBuilding,
  faHeadset,
  faFileLines,
  faVideo,
  faUsers,
  faStar,
  faLink,
  faPaperPlane,
  faGift,
  faUserPlus,
  faUserSlash,
  faChevronRight,
  faReply,
  faXmark,
  faBroom,
  faBell,
  faArrowsRotate,
  faPowerOff,
  faDoorOpen,
  faBan
);
library.add(
  faYoutube,
  faTwitter,
  faFacebookSquare,
  faGithub,
  faInstagram,
  faXbox,
  faPlaystation,
  faTwitch,
  faYoutubeSquare
);
app.component("font-awesome-icon", FontAwesomeIcon);

window.Vue = app;
window.Vue.router = router;

if (import.meta.env.VITE_PROD) {
  app.config.warnHandler = () => {};
  app.config.globalProperties.__VUE_PROD_DEVTOOLS__ = false;
}

registerRequestInterceptor();
registerResponseInterceptor();

app.use(router);
app.use(store);
app.mount("#app");

