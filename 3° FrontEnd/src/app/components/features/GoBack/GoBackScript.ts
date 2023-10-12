import { PropType } from "vue";

const gameListComponent: any = {
  name: "GameListComponent",
  data() {
    return {};
  },
  props: {
    gChoice: Function as PropType<(game: any) => void>,
    userChoice: Function as PropType<(user: any) => void>
  },
  methods: {
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        const pagePath = this.$router.options.history.state.back.split('/')
        if (pagePath[1] == 'singleGame'){
          if (this.$route.name != 'singleUser' && this.$route.name != 'signIn') {
            this.gChoice(pagePath[2])
          }
        }
        else if (pagePath[1] == 'user') {
          if (this.$route.name != 'gameList' && this.$route.name != 'profile' && this.$route.name != 'singleGame') {
            
            this.userChoice(pagePath[2])
          }
        }
        this.$router.back()
      }
    },
    goBackHome() {
      this.$router.push("/")
    }
  },
};

export default gameListComponent;
