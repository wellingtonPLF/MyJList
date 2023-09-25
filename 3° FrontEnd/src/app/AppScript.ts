import FooterComponent from "./components/_main/Footer/FooterComponent.vue";
import MaintenanceComponent from "./components/_main/Maintenance/MaintenanceComponent.vue";
// import userService from "./shared/services/userService";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    FooterComponent,
    MaintenanceComponent,
  },
  methods: {
    ...mapActions("authReducer", ["setUser"]),
  },
  beforeMount() {
    // userService.getAuthenticatedUser().then((it: any) => {
    //     this.setUser(it);
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
  },
};
