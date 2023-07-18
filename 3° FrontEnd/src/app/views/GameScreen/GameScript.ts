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

const gameComponent: any = {
  name: "GameComponent",
  components: {},
  data() {
    return {
      games: [] as Game[]
    };
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
