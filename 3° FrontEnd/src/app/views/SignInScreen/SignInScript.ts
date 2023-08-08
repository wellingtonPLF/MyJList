
const signInComponent: any = {
    name: "SignInComponent",
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
  
  export default signInComponent;
  