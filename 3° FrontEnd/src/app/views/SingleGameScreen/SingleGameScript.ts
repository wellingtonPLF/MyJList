import axios, { AxiosResponse } from "axios";
import { mapState, mapActions } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { I_Game } from "../../shared/interfaces/I_Game";

library.add(faStar);

const singleGameComponent: any = {
  name: "SingleGameComponent",
  components: {},
  data() {
    return {
      games: [] as I_Game[],
      userComment: [] as any[],
      imgType: {
        male: "https://storage.prompt-hunt.workers.dev/clgrgds4b000qmh08559h5fk1_1",
        female:
          "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000",
      },
      staffObj: {
        enabled: false,
        staff: { Creator: "unknow", Director: "unknow", Composition: "unknow" },
      },
      castObj: {
        enabled: false,
        cast: {
          Character_1: "unknow",
          Character_2: "unknow",
          Character_3: "unknow",
        },
      },
      requirementsObj: {
        enabled: false,
        requirement: {
          Processador: "unknow",
          Memoria: "unknow",
          DirectX: "unknow",
          SO: "unknow",
        },
      },
      star: true,
    };
  },
  computed: {
    ...mapState("gameReducer", {
      game: (state: any) => state.game,
    }),
  },
  methods: {
    ...mapActions("gameReducer", ["setGame"]),
    ...mapActions("authReducer", ["setUser"]),
    gameChoice(game: any) {
      this.setGame(game);
      window.scrollTo(0, 0);
    },
    userChoice(user: any) {
      this.setUser(user);
      window.scrollTo(0, 0);
    },
    showStaff() {
      this.staffObj.enabled = !this.staffObj.enabled;
    },
    showCast() {
      this.castObj.enabled = !this.castObj.enabled;
    },
    showRequirements() {
      this.requirementsObj.enabled = !this.requirementsObj.enabled;
    },
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/");
      } else {
        this.$router.back();
      }
    },
    fav() {
      this.star = !this.star;
    },
  },
  mounted() {
    axios
      .get("jsons/games.json")
      .then((it: AxiosResponse<I_Game[]>) => {
        this.games = it.data.slice(0, 5);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("jsons/users.json")
      .then((it: AxiosResponse<any[]>) => {
        this.userComment = it.data.slice(0, 3);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default singleGameComponent;
