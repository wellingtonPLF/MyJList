import HeaderComponent from "./../../components/_main/Header/HeaderComponent.vue";
import gameService from "../../shared/services/gameService";

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
      expected: [],
      airing: [],
      releases: [],
      topRated: [],
      recomendations: [] as Game[],
      options: [
        { icon: "gamepad", name: "Games", path: "/game", done: true },
        { icon: "video", name: "Trailers", path: "/", done: false },
        { icon: "user", name: "Users", path: "/users", done: true },
        { icon: "hand-holding-heart", name: "Premium", path: "/", done: false },
        { icon: "building", name: "Industry", path: "/", done: false },
        { icon: "headset", name: "Suport", path: "/", done: false }, //Contact Page
        { icon: "file-lines", name: "About", path: "/about", done: true }, //Staff e sobre Page
      ],
    };
  },
  methods: {
    changeExpected(value: string){
      if (value == 'release'){
        this.expected = this.releases
      }
      else {
        this.expected = this.airing
      }
    }
  },
  mounted() {
    gameService.getAiring().then((it) => {
      this.airing = it;
    })
    .catch((error) => {
      console.error(error);
    });

    gameService.getReleases().then((it) => {
      this.releases = it;
      this.expected = this.releases
    })
    .catch((error) => {
      console.error(error);
    });

    gameService.getTopRated().then((it) => {
      this.topRated = it;
    })
    .catch((error) => {
      console.error(error);
    });

    gameService.getMostRecommended().then((it) => {
      this.recomendations = it;
    })
    .catch((error) => {
      console.error(error);
    });
  },
};

export default homeComponent;
