import { mapState, mapActions } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import gameService from "../../shared/services/gameService";
import commentService from "../../shared/services/commentService";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"

library.add(faStar);

const singleGameComponent: any = {
  name: "SingleGameComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      recomendations: [] as any[],
      userComment: [] as any[],
      selectedImg: undefined,
      star: true,
      commentToSend: undefined,

      gameStatus: { vote: "Default", registry: "Default" },

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
      }
    };
  },
  computed: {
    ...mapState("gameReducer", {
      game: (state: any) => state.game,
    }),
    ...mapState("authReducer", {
      user: (state: any) => state.user,
    }),
  },
  methods: {
    ...mapActions("gameReducer", ["setGame"]),
    ...mapActions("authReducer", ["setUser"]),
    gameChoice(game: any) {
      gameService.getGame(game.id).then(
        it => {
          this.setGame(it);
          this.selectedImg = it.imgs[0].value
          window.scrollTo(0, 0);
        }
      )
    },
    changeImage(index: number){
      this.selectedImg = this.game.imgs[index].value
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
    sendComment() {
      this.commentToSend = ""
    }
  },
  beforeMount(){
    gameService.getGame(this.game.id).then(
      it => {
        this.setGame(it);
        this.selectedImg = it.imgs[0].value
      }
    )
  },
  mounted() {  
    gameService.getMostRecommended().then(
      it => {
        this.recomendations = it
      }
    )
    .catch((error) => {
      console.log(error)
    })

    commentService.getCommentByGameID(this.game.id).then(
      it => {
        this.userComment = it
      }
    )
    .catch((error) => {
      console.log(error)
    })
  },
};

export default singleGameComponent;
