// import authService from "../../shared/services/authService";
// import userService from "../../shared/services/userService";
import { mapActions } from "vuex";

const signInComponent: any = {
  name: "SignInComponent",
  data() {
    return {
      auth: {
        email: undefined,
        username: undefined,
        password: undefined
      },
      error: { enabled: false, msg: undefined }
    };
  },
  methods: {
    ...mapActions('authReducer', ['setUser']),
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        this.$router.back()
      }
    },
    login() {
      if (this.auth.username == "Well" && this.auth.password == "123") {
        const user = {
          id: 1,
          nickName: "wellington",
          status: "Online",
          joined: "29/03/1999",
          country: "Brazil",
          sex: "Masculine",
          bornDate: "29/03/1999",
          auth: 1
        }
        this.setUser(user)
        this.$router.push('/');
      }
      else {
        this.error.enabled = true
        this.error.msg = "Wrong Username or Password"
      }
      // authService.authentication(this.auth).then(
      //     () => {
      //         userService.getAuthenticatedUser().then(
      //             (it: any) => {
      //                 this.setResult({ value: it.nickname })
      //                 this.$router.push('/');
      //             }
      //         ).catch(() => {
      //             this.$router.push('/maintenance');
      //         })
      //     }
      // ).catch((msg: any) => {
      //     if(msg.code == "ERR_NETWORK") {
      //       this.$router.push('/maintenance');
      //     }
      //     this.error.enabled = true
      //     this.error.msg = msg.code
      // })
    }
  },
  mounted() { },
};

export default signInComponent;
