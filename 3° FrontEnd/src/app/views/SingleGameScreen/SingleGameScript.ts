import axios, { AxiosResponse } from "axios";
import { mapState } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faStar)

interface Game {
  id: number;
  img: string;
  name: string;
  plataforms: string[];
  user: string;
  date: string;
  score: string;
  description: string;
}

const singleGameComponent: any = {
  name: "SingleGameComponent",
  components: {},
  data() {
    return {
      games: [] as Game[],
      userComment: [] as any[],
      imgType: {
        male: "https://storage.prompt-hunt.workers.dev/clgrgds4b000qmh08559h5fk1_1",
        female: "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000"
      },
      star: true
    };
  },
  computed: {
    ...mapState('gameReducer', {
      game: (state: any) => state.game
    })
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
    fav(){
      this.star = !this.star
    }
  },
  mounted() {
    axios
      .get("jsons/games.json")
      .then((it: AxiosResponse<Game[]>) => {
        this.games = it.data.slice(0,5);
      })
      .catch((error) => {
        console.error(error);
      });

      axios
      .get("jsons/users.json")
      .then((it: AxiosResponse<any[]>) => {
        this.userComment = it.data.slice(0,3);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default singleGameComponent;
