import ProfileComponent from "../../components/_main/Profile/ProfileComponent.vue";
import userService from "../../shared/services/userService";
import { mapState, mapActions } from "vuex";
import { AUTH_INITIAL_STATE } from "../../shared/vuex/reducer/authReducer";

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
      auth: AUTH_INITIAL_STATE
    }
  },
  methods: {
    ...mapActions('authReducer', ['setAuth']),
  },
  mounted() {
    userService.getAuthenticatedUser().then(
      it => {
        this.auth = it;
        this.setAuth(it)
      }
    )
  },
};

export default authUserComponent;
