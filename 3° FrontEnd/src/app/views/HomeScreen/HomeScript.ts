import { mapActions } from "vuex";
import HeaderComponent from "./../../components/_main/Header/HeaderComponent.vue";
import axios, { AxiosResponse } from "axios";

interface Game {
  id: number;
  img: string;
  name: string;
  plataforms: string[];
  user: string;
  date: string;
  description: string;
}

const homeComponent: any = {
  name: "HomeComponent",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      games: [] as Game[],
      recomendations: [] as Game[],
      options: [
        { icon: "gamepad", name: "Games", path: "/game", done: true },
        { icon: "video", name: "Trailers", path: "/", done: false },
        { icon: "user", name: "Users", path: "/users", done: true },
        { icon: "hand-holding-heart", name: "Premium", path: "/", done: false },
        { icon: "building", name: "Industry", path: "/", done: false },
        { icon: "headset", name: "Suport", path: "/", done: false }, //Contact Page
        { icon: "file-lines", name: "About", path: "/about", done: true } //Staff e sobre Page
      ],
    };
  },
  methods: {
    ...mapActions('gameReducer', ['setGame']),
    gameChoice(game: any) {
      this.setGame(game)
      this.$router.push('/singleGame')
    }
  },
  mounted() {
    axios
      .get("jsons/games.json")
      .then((it: AxiosResponse<Game[]>) => {
        this.games = it.data;
        this.recomendations = it.data.slice(6, 10);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default homeComponent;
