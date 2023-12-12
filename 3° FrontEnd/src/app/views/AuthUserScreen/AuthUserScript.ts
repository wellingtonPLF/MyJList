import ProfileComponent from "../../components/_main/Profile/ProfileComponent.vue";
import userService from "../../shared/services/userService";
import { mapState, mapActions } from "vuex";
import { USER_INITIAL_STATE } from "../../shared/solid/nullObject/_user";

import { toRaw } from "vue";
import { useQuery } from "vue-query";

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
  setup() {
    const { data } = useQuery('users', async () => {
      return await userService.getAuthenticatedUser()
    }) 

    return { data }
  },
  data() {
    return {
      user: USER_INITIAL_STATE
    }
  },
  methods: {
    ...mapActions('authReducer', ['setAuth']),
  },
  watch: {
    data(value) {
      this.setAuth(toRaw(value))
    }
  }
};

export default authUserComponent;
