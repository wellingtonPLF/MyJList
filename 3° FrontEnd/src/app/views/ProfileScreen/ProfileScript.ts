import axios, { AxiosResponse } from "axios";
import { mapState, mapActions } from "vuex";
import { I_User } from "../../shared/interfaces/I_User";
import { I_Game } from "../../shared/interfaces/I_Game";

const profileComponent: any = {
  name: "ProfileComponent",
  components: {},
  data() {
    return {
      games: [] as I_Game[],
      friends: [] as I_User[],
      fav: [] as any[],
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
    userChoice(user: any){
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
  mounted() {
    axios
      .get("jsons/games.json")
      .then((it: AxiosResponse<I_Game[]>) => {
        this.games = it.data.slice(0, 4);
        this.fav = it.data.slice(0, 8);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("jsons/users.json")
      .then((it: AxiosResponse<I_User[]>) => {
        this.friends = it.data.slice(0, 6);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default profileComponent;
