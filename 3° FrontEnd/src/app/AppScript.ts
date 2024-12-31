import FooterComponent from "./components/_main/Footer/FooterComponent.vue";
import MaintenanceComponent from "./components/_main/Maintenance/MaintenanceComponent.vue";
import userService from "./shared/services/userService";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    FooterComponent,
    MaintenanceComponent,
  },
  methods: {
    ...mapActions("authReducer", ["setAuth"]),
  },
  beforeMount() {
    userService.getAuthenticatedUser().then(
      it => {
        if (it != undefined) {
          this.setAuth(it);
        }
      }
    )
    .catch((_) => {
        // console.error(error);
    });
  },
};
