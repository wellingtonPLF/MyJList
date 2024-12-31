import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import gameService from "../../shared/services/gameService";
import commentService from "../../shared/services/commentService";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"
import BarChartComponent from "../../components/features/BarChart/BarChartComponent.vue"
import SeeMoreComponent from "../../components/features/SeeMore/SeeMoreComponent.vue"
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
import LoaderComponent from "./../../components/features/Loader/LoaderComponent.vue";
import { fullUrl } from "@utils/general.util";

library.add(faStar);

const singleGameComponent: any = {
  name: "SingleGameComponent",
  components: {
    GoBackComponent,
    SeeMoreComponent,
    BarChartComponent,
    LoaderComponent
  },
  computed: {
    ...mapState('authReducer', {
      auth: (state: any) => state.auth
    })
  },
  data() {
    return {
      img_Game: `${fullUrl}/assets/images/fundo.png`,
      registry: REGISTRY_INITIAL_STATE,
      tag: TAG_INITIAL_STATE,
      foundGames: [],
      recomendations: [] as any[],
      commentSize: undefined,
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
      qntComment: 0,
      cssUpdateBtnEffect: false,
      cssCommentBtnEffect: false,
      selectedImg: undefined,
      commentToSend: undefined,
      imgType: sexualityImg,
      searchByGameName: { name: undefined },
    };
  },
  methods: {
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
    typeChoice(value: any){
      return registryEnum[value]
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
            if (it) {
              this.registry = it
              this.cssUpdateBtnEffect = false;   
            }
            
          }
        ).catch( (e) => {
          this.cssUpdateBtnEffect = false;
        })
      }
      else {
        if (this.registry.game.id != 0){
          const insertRegistry = new Registry(this.auth, this.registry.game, this.tag);
          registryService.insert(insertRegistry).then(
            it => {
              if (it) {
                this.registry = it 
              }
              
            }
          )
        }
      }
    },
    gameChoice(id: number) { 
      this.feedGameData(id)
      this.getComments()
    },
    setGameMethod(id: number) {
      this.registry.id = 0
      gameService.getGame(id).then(
        it => {
          if (it) {
            this.graphicUse(it)
            this.registry.game = it
            this.star = it.favorite
            this.selectedImg = it.imgs[0].value 
          }
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
            if (it) {
              this.graphicUse(it.game)
              this.registry = it
              this.star = it.favorite
              this.selectedImg = it.game.imgs[0].value            
            }
          }
        ).catch(_ => {
          this.setGameMethod(id)
        })
      }
      else {
        this.setGameMethod(id)
      }
    },
    // --------------------------------------------------------------------------------------------------------------
    graphicUse(data: any){
      try {
        const lista = { PLAY: 'playing', COMPLETE: 'completed', HOLD: 'onHold', DROP: 'dropped', PLAN: 'planning', REPLAY: 'replayed' }
        let i = 0
        for (const property in registryEnum) {
          this.graphicData[i].value = data[lista[property]]/100
          this.graphicData = [...this.graphicData]
          i++
        } 
      } catch (error) {}
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
            if (it) {
              this.cssCommentBtnEffect = false
              this.userComment.unshift(it);   
            }
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
    getComments() {
      this.qntComment += 5
      const getComment = { id: this.$route.params.id, qnt: this.qntComment}
      commentService.getCommentByGameID(getComment).then(
        it => {
          if (it) {
            this.userComment = it     
          }
          
        }
      )
      .catch((_) => {})
    }
  },
  watch: {
    auth() {
      this.feedGameData(this.$route.params.id)
    },
  },
  beforeMount(){
    for (const property in colorEnum) {
      this.graphicData.push({ value: 0, color: colorEnum[property], type: property})
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
    this.getComments()

    gameService.getMostRecommended().then(
      it => {
        if (it) {
          this.recomendations = it            
        }
        
      }
    )
    .catch((_) => {}) 
    
    commentService.getCommentSize(this.$route.params.id).then(
      it => {
        if (it) {
          this.commentSize = it;
        }
      }
    )
  },
};

export default singleGameComponent;
