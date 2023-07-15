import HeaderComponent from "./../../components/_main/Header/HeaderComponent.vue";
import axios, { AxiosResponse } from "axios";

interface Game {
  id: number;
  img: string;
  name: string;
  plataforms: string[];
}

const homeComponent: any = {
  name: "SignInPage",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      games: [] as Game[],
    };
  },
  mounted() {
    axios
      .get("jsons/games.json")
      .then((it: AxiosResponse<Game[]>) => {
        this.games = it.data;
        console.log(this.games[0].plataforms)
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default homeComponent;
