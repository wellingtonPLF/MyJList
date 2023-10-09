import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import gameService from "../../shared/services/gameService";
import commentService from "../../shared/services/commentService";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"
import { GAME_INITIAL_STATE } from "../../shared/vuex/reducer/gameReducer";
import { mapState } from "vuex";
import { USER_COMMENT_NULLOBJ } from "../../shared/vuex/reducer/authReducer";

library.add(faStar);

const singleGameComponent: any = {
  name: "SingleGameComponent",
  components: {
    GoBackComponent
  },
  computed: {
    ...mapState('authReducer', {
      auth: (state: any) => state.auth
    })
  },
  data() {
    return {
      recomendations: [] as any[],
      game: GAME_INITIAL_STATE,
      userComment: [
        USER_COMMENT_NULLOBJ,
        USER_COMMENT_NULLOBJ,
        USER_COMMENT_NULLOBJ
      ] as any[],
      selectedImg: undefined,
      star: true,
      commentToSend: undefined,

      gameStatus: { vote: "Default", registry: "Default" },

      noGame: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg",
      imgType: {
        male: "https://cdn-uploads.gameblog.fr/img/news/429382_649d8426db22f.jpg",
        female:
          "https://cdn-uploads.gameblog.fr/img/news/427671_6482d11be2082.jpg",
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
  methods: {
    hoursMinutes(){
      const hours_minutes_total = Math.round(this.game.playtime * 60)
      const hours = Math.floor(this.game.playtime)
      const hours_total = hours * 60
      const minutes = hours_minutes_total - hours_total
      return `${hours}h ${minutes}m`
    },
    gameChoice(id: number) { 
      gameService.getGame(id).then(
        it => {
          this.game = it
          this.selectedImg = it.imgs[0].value
        }
      )
      
      commentService.getCommentByGameID(id).then(
        it => {
          this.userComment = it
        }
      )
      .catch((error) => {
        console.log(error)
      })
    },
    changeImage(index: number){
      this.selectedImg = this.game.imgs[index].value
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
    fav() {
      this.star = !this.star;
    },
    sendComment() {
      this.commentToSend = ""
    }
  },
  beforeMount(){
    this.selectedImg = this.noGame
    this.recomendations = [
      {game: {gameImage:this.noGame}},
      {game: {gameImage:this.noGame}},
      {game: {gameImage:this.noGame}},
      {game: {gameImage:this.noGame}},
      {game: {gameImage:this.noGame}}
    ]
    gameService.getGame(this.$route.params.id).then(
      it => {
        this.game = it
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

    commentService.getCommentByGameID(this.$route.params.id).then(
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
