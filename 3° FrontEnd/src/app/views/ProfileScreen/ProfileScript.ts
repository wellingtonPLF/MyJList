import axios, { AxiosResponse } from "axios";

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

const profileComponent: any = {
  name: "ProfileComponent",
  components: {},
  data() {
    return {
      games: [] as Game[],
      users: [] as any[],
      fav: [] as any[],
      imgType: {
        male: "https://storage.prompt-hunt.workers.dev/clgrgds4b000qmh08559h5fk1_1",
        female: "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000"
      }
    };
  },
  mounted() {
    axios
      .get("jsons/games.json")
      .then((it: AxiosResponse<Game[]>) => {
        this.games = it.data.slice(0,4);
        this.fav = it.data.slice(0,8);
      })
      .catch((error) => {
        console.error(error);
      });

      axios
      .get("jsons/users.json")
      .then((it: AxiosResponse<any[]>) => {
        this.users = it.data.slice(0,6);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default profileComponent;
