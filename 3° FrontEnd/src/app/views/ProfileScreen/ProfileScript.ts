import { mapState, mapActions } from "vuex";
import userService from "../../shared/services/userService";

const profileComponent: any = {
  name: "ProfileComponent",
  components: {},
  data() {
    return {
      imgType: {
        male: "https://storage.prompt-hunt.workers.dev/clgrgds4b000qmh08559h5fk1_1",
        female: "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000"
      }
    };
  },
  computed: {
    ...mapState('authReducer', {
      user: (state: any) => state.user
    })
  },
  methods: {
    ...mapActions('gameReducer', ['setGame']),
    ...mapActions('authReducer', ['setUser']),
    gameChoice(game: any) {
      this.setGame(game)
      window.scrollTo(0, 0);
    },
    userChoice(user: any) {
      this.setUser(user)
      window.scrollTo(0, 0);
    },
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        this.$router.back()
      }
    }
  },
  beforeMount() {
    userService.getUser(this.user.id).then(
      it => {
        this.setUser(it)
      }
    ).catch( (error)=> {
      console.log(error)
    })
  },
};

export default profileComponent;
