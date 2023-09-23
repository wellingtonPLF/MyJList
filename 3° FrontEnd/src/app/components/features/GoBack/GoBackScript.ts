
const gameListComponent: any = {
  name: "GameListComponent",
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
    },
    goBackHome() {
      this.$router.push("/")
    }
  },
  mounted() {
    
  },
};

export default gameListComponent;
