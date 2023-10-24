import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import gameService from "../../shared/services/gameService";
import commentService from "../../shared/services/commentService";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"
import BarChartComponent from "../../components/features/BarChart/BarChartComponent.vue"
import { mapState } from "vuex";
import { Comment } from "../../shared/models/Comment";
import registryService from "../../shared/services/registryService";
import { Registry } from "../../shared/models/Registry";
import { registryEnum } from "../../shared/enums/registryEnum";
import { noteEnum } from "../../shared/enums/noteEnum";
import { COMMENT_INITIAL_STATE } from "../../shared/solid/nullObject/_comment";
import { RECOMMENDATION_INITIAL_STATE } from "../../shared/solid/nullObject/_recomendation";
import { CAST_INITIAL_STATE } from "../../shared/solid/nullObject/_cast";
import { REQUIREMENT_INITIAL_STATE } from "../../shared/solid/nullObject/_requirement";
import { STAFF_INITIAL_STATE } from "../../shared/solid/nullObject/_staff";
import { TAG_INITIAL_STATE } from "../../shared/solid/nullObject/_tag";
import { colorEnum } from "../../shared/enums/colorEnum";
import { REGISTRY_INITIAL_STATE } from "../../shared/solid/nullObject/_registry";
import { sexualityImg } from "../../shared/enums/sexualityImg";

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
      registry: REGISTRY_INITIAL_STATE,
      tag: TAG_INITIAL_STATE,
      foundGames: [],
      recomendations: [] as any[],
      userComment: [
        COMMENT_INITIAL_STATE,
        COMMENT_INITIAL_STATE,
        COMMENT_INITIAL_STATE ] as any[],
      staffObj: {
        enabled: false,
        staff: [
          STAFF_INITIAL_STATE, 
          STAFF_INITIAL_STATE, 
          STAFF_INITIAL_STATE
        ],
      },
      castObj: {
        enabled: false,
        cast: [
          CAST_INITIAL_STATE,
          CAST_INITIAL_STATE,
          CAST_INITIAL_STATE,
        ],
      },
      requirementsObj: {
        enabled: false,
        requirement: REQUIREMENT_INITIAL_STATE,
      },
      graphicData: [],
      star: true,
      cssUpdateBtnEffect: false,
      cssCommentBtnEffect: false,
      selectedImg: undefined,
      commentToSend: undefined,
      imgType: sexualityImg,
      searchByGameName: { name: undefined },
    };
  },
  methods: {
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
    async searchGame(event) {
      if (event.keyCode === 8) {
        if (this.searchByGameName.name =='') {
          this.foundGames= []
        }
      }
      if (event.keyCode != 16 && event.keyCode != 36) {
        if (this.searchByGameName.name != undefined && this.searchByGameName.name != "") {
          try {
            this.foundGames= await gameService.searchGame(this.searchByGameName)
          }
          catch(_) {}
        }
      }
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
    changeImage(index: number){
      this.selectedImg = this.registry.game.imgs[index].value
    },
    // --------------------------------------------------------------------------------------------------------------
    applyBtnAction() {
      if (this.registry.id != 0) {
        const note = Object.keys(noteEnum).filter(key => noteEnum[key] === this.registry.note)[0]
        const progress = Object.keys(registryEnum).filter(key => registryEnum[key] === this.registry.progress)[0]
        const updateRegistry = new Registry(
          this.registry.id,
          progress,
          (this.registry.note == 'Unknow') ? "" : ((progress === "PLAN")? "" : note),
          new Date().toISOString(),
          !this.star,
          false, 
          this.tag, 
          this.auth, 
          this.registry.game
        )
        
        this.cssUpdateBtnEffect = true
        registryService.update(updateRegistry).then(
          it => {
            this.registry = it
            this.cssUpdateBtnEffect = false;
          }
        ).catch( (e) => {
          console.log(e)
          this.cssUpdateBtnEffect = false;
        })
      }
      else {
        const insertRegistry = new Registry(this.auth, this.registry.game, this.tag);
        registryService.insert(insertRegistry).then(
          it => {
            this.registry = it
          }
        )
      }
    },
    hoursMinutes() {
      const hours_minutes_total = Math.round(this.registry.game.playtime * 60)
      const hours = Math.floor(this.registry.game.playtime)
      const hours_total = hours * 60
      const minutes = hours_minutes_total - hours_total
      return `${hours}h ${minutes}m`
    },
    sendComment() {
      if (this.auth.id != 0 && this.registry.id != 0) {
        const comment = new Comment(this.commentToSend, this.auth, this.registry.game)
        this.cssCommentBtnEffect = true
        commentService.insert(comment).then(
          it => {
            this.cssCommentBtnEffect = false
            this.userComment.push(it)

          }
        ).catch((e: any) => {
          console.log(e)
          this.cssCommentBtnEffect = false
        })
      }
      else {
        this.cssCommentBtnEffect = undefined
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
          this.registry.game = it
          this.graphicData = [...this.graphicData]
          this.star = !it.favorite
          this.selectedImg = it.imgs[0].value
        }
      )
    },
    feedGameData(id: number) {
      this.foundGames= []
      this.searchByGameName.name = ""
      this.$router.push(`/singleGame/${id}`)
      if (this.auth.id != 0) {
        registryService.getRegistryByUserGame_ID(this.auth.id, id).then(
          it => {
            this.registry = it
            this.star = !it.favorite
            this.selectedImg = it.game.imgs[0].value            
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
  watch: {
    auth() {
      this.feedGameData(this.$route.params.id)
    },
  },
  beforeMount(){
    for (const property in colorEnum) {
      this.graphicData.push({ value: 0, color: colorEnum[property]})
    }
    this.selectedImg = this.registry.game.gameImage
    this.recomendations = [
      {game: RECOMMENDATION_INITIAL_STATE.game},
      {game: RECOMMENDATION_INITIAL_STATE.game},
      {game: RECOMMENDATION_INITIAL_STATE.game},
      {game: RECOMMENDATION_INITIAL_STATE.game},
      {game: RECOMMENDATION_INITIAL_STATE.game}
    ]
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
