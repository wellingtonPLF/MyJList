import ProfileComponent from "../../components/_main/Profile/ProfileComponent.vue";
import userService from "../../shared/services/userService";
import { AUTH_INITIAL_STATE } from "../../shared/vuex/reducer/authReducer";

const singleUserComponent: any = {
  name: "SingleUserComponent",
  components: {
    ProfileComponent
  },
  data() {
    return {
      user: AUTH_INITIAL_STATE
    }
  },
  beforeMount() {
    userService.getUser(this.$route.params.id).then(
      it => {
        this.user = it;
      }
    ).catch((error) => {
      console.log(error)
    })
  },
};

export default singleUserComponent;
