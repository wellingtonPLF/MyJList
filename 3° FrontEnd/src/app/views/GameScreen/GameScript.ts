import axios, { AxiosResponse } from "axios";
import FilterComponent from "../../components/dialogs/FilterDialog/FilterComponent.vue";

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

const gameComponent: any = {
  name: "GameComponent",
  components: {
    FilterComponent
  },
  data() {
    return {
      games: [] as Game[],
      prevRoute: null
    };
  },
  beforeRouteEnter(_ : any, from: any, next: any) {
    next((vm: any) => {
      vm.prevRoute = from
    })
  },  
  methods: {
    popularity() {
      this.games.sort((a: any, b: any) => b.popularity - a.popularity)
    },
    score() {
      this.games.sort((a: any, b: any) => b.score - a.score)
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
      .then((it: AxiosResponse<Game[]>) => {
        this.games = it.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default gameComponent;
