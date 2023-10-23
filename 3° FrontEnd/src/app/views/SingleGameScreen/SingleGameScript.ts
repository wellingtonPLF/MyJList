import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import gameService from "../../shared/services/gameService";
import commentService from "../../shared/services/commentService";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"
import BarChartComponent from "../../components/features/BarChart/BarChartComponent.vue"
import { GAME_INITIAL_STATE } from "../../shared/vuex/reducer/gameReducer";
import { mapState } from "vuex";
import { USER_COMMENT_NULLOBJ } from "../../shared/vuex/reducer/authReducer";
import { Comment } from "../../shared/models/Comment";
import registryService from "../../shared/services/registryService";
import { Registry } from "../../shared/models/Registry";
import { Tag } from "../../shared/models/Tag";
import { registryEnum } from "../../shared/enums/registryEnum";
import { noteEnum } from "../../shared/enums/noteEnum";

library.add(faStar);

const singleGameComponent: any = {
  name: "SingleGameComponent",
  components: {
    GoBackComponent,
    BarChartComponent
  },
  computed: {
    ...mapState('authReducer', {
      auth: (state: any) => state.auth
    })
  },
  data() {
    return {
      game: GAME_INITIAL_STATE,
      games: [],
      gameName: { name: undefined },
      recomendations: [] as any[],
      game_registry_id: undefined,
      cssBtnEffect: false,
      graphicData: [
        {value: 0, color: '#39b339'},
        {value: 0, color: '#1f88ff'},
        {value: 0, color: 'yellow'},
        {value: 0, color: '#ff2e2e'},
        {value: 0, color: '#ff46ff'},
        {value: 0, color: '#1ee7be'},
      ],
      userComment: [
        USER_COMMENT_NULLOBJ,
        USER_COMMENT_NULLOBJ,
        USER_COMMENT_NULLOBJ
      ] as any[],
      selectedImg: undefined,
      star: true, 
      commentToSend: undefined,
      registredGame: false,
      gameStatus: { vote: undefined, registry: undefined },
      tag: new Tag(1, 'Undefined'),
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
    async searchGame(event) {
      if (event.keyCode === 8) {
        if (this.gameName.name =='') {
          this.games = []
        }
      }
      if (event.keyCode != 16 && event.keyCode != 36) {
        if (this.gameName.name != undefined && this.gameName.name != "") {
          try {
            this.games = await gameService.searchGame(this.gameName)
          }
          catch(_) {}
        }
      }
    },
    applyBtnAction() {
      if (this.registredGame) {
        const vote = Object.keys(noteEnum).filter(key => noteEnum[key] === this.gameStatus.vote)[0]
        const progress = Object.keys(registryEnum).filter(key => registryEnum[key] === this.gameStatus.registry)[0]
        const updateRegistry = new Registry(
          this.game_registry_id,
          progress,
          (this.gameStatus.vote == 'Unknow') ? "" : ((progress === "PLAN")? "" : vote),
          new Date().toISOString(),
          !this.star,
          false, 
          this.tag, 
          this.auth, 
          this.game
        )
        
        this.cssBtnEffect = true
        registryService.update(updateRegistry).then(
          it => {
            this.game = it.game
            this.cssBtnEffect = false;
            this.gameStatus = { vote: it.note, registry: it.progress }
          }
        ).catch( (e) => {
          console.log(e)
          this.cssBtnEffect = false;
        })
      }
      else {
        const insertRegistry = new Registry(this.auth, this.game, this.tag);
        registryService.insert(insertRegistry).then(
          it => {
            this.game = it.game
            this.gameStatus = { vote: it.note, registry: it.progress }
            this.registredGame = true
            this.game_registry_id = it.id
          }
        )
      }
    },
    hoursMinutes() {
      const hours_minutes_total = Math.round(this.game.playtime * 60)
      const hours = Math.floor(this.game.playtime)
      const hours_total = hours * 60
      const minutes = hours_minutes_total - hours_total
      return `${hours}h ${minutes}m`
    },
    gameChoice(id: number) { 
      this.feedGameData(id)
      
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
      if (this.auth.id != 0 && this.game_registry_id != undefined) {
        const comment = new Comment(this.commentToSend, this.auth, this.game)
        commentService.insert(comment).then(
          it => {
            this.userComment.push(it)

          }
        ).catch((e: any) => {
          console.log(e)
        })
      }

      this.commentToSend = ""
    },
    setGameMethod(id: number) {
      gameService.getGame(id).then(
        it => {
          const lista = ['playing', 'completed', 'onHold', 'dropped', 'planning', 'replayed']
          for (var i = 0; i < lista.length; i++) {
            this.graphicData[i].value = it[lista[i]]/100
          }
          this.graphicData = [...this.graphicData]
          this.game = it
          this.star = !it.favorite
          this.selectedImg = it.imgs[0].value
          this.gameStatus = { vote: it.note, registry: it.progress }
          this.registredGame = false
        }
      )
    },
    feedGameData(id: number) {
      this.games = []
      this.gameName.name = ""
      this.$router.push(`/singleGame/${id}`)
      if (this.auth.id != 0) {
        registryService.getRegistryByUserGame_ID(this.auth.id, id).then(
          it => {
            this.game = it.game
            this.star = !it.favorite
            this.selectedImg = it.game.imgs[0].value
            this.gameStatus = { vote: it.note, registry: it.progress }
            this.registredGame = true
            this.game_registry_id = it.id
            
          }
        ).catch(_ => {
          this.setGameMethod(id)
        })
      }
      else {
        this.setGameMethod(id)
      }
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
  },
  watch: {
    auth() {
      this.feedGameData(this.$route.params.id)
    },
  },
  mounted() {
    this.feedGameData(this.$route.params.id)

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
