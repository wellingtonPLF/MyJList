
const signUpComponent: any = {
    name: "SignUpComponent",
    data() {
      return {};
    },
    methods: {
      goBack() {
        if (this.$router.options.history.state.back == null) {
          this.$router.push("/")
        }
        else {
          this.$router.back()
        }
      }
    },
    mounted() {},
  };
  
  export default signUpComponent;
  