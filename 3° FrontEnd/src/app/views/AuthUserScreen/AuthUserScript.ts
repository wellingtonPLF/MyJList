import ProfileComponent from "../../components/_main/Profile/ProfileComponent.vue";
import userService from "../../shared/services/userService";
import { mapState, mapActions } from "vuex";
import { USER_INITIAL_STATE } from "../../shared/solid/nullObject/_user";

const authUserComponent: any = {
  name: "AuthComponent",
  components: {
    ProfileComponent
  },
  computed: {
    ...mapState('authReducer', {
      auth: (state: any) => state.auth
    })
  },
  data() {
    return {
      user: USER_INITIAL_STATE
    }
  },
  methods: {
    ...mapActions('authReducer', ['setAuth']),
  },
  mounted() {
    userService.getAuthenticatedUser().then(
      it => {
        this.user = it;
        this.setAuth(it)
      }
    )
  },
};

export default authUserComponent;
