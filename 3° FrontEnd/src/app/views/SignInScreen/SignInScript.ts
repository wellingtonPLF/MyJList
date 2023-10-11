import authService from "../../shared/services/authService";
import userService from "../../shared/services/userService";
import { mapActions } from "vuex";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"

const signInComponent: any = {
  name: "SignInComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      auth: {
        email: undefined,
        username: undefined,
        password: undefined
      },
      error: { enabled: false, msg: undefined, count: 1 }
    };
  },
  methods: {
    ...mapActions('authReducer', ['setAuth']),
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        this.$router.back()
      }
    },
    login() {
      // if (this.username == undefined || this.password == undefined) 
      authService.authentication(this.auth).then(
        _ => {
          userService.getAuthenticatedUser().then(
            (it: any) => {
              this.setAuth(it)
              this.$router.push('/');
            }
          ).catch( __ => {
            this.$router.push('/maintenance');
          })
        }
      ).catch((msg: any) => {
        if (msg.code == "ERR_NETWORK") {
          this.$router.push('/maintenance');
        }
        this.error.enabled = true
        this.error.msg = msg.detail
        this.error.count += 1;
        this.auth.password = '';
      })
    }
  }
};

export default signInComponent;
