import FilterComponent from "../../components/dialogs/FilterDialog/FilterComponent.vue";
import { I_Game } from "../../shared/interfaces/I_Game";
import gameService from "../../shared/services/gameService";
import { GAME_INITIAL_STATE } from "../../shared/vuex/reducer/gameReducer";
import GoBackComponent from "./../../components/features/GoBack/GoBackComponent.vue"

const gameComponent: any = {
  name: "GameComponent",
  components: {
    FilterComponent,
    GoBackComponent
  },
  data() {
    return {
      list: [] as I_Game[],
      games: [
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE
      ] as I_Game[],
      prevRoute: undefined,
      optionSelected: undefined,
      filter: true,
      loading: "Loading . . .",
      selectedOption: "Default",
      options: ["CUSTOMIZATION", "Most Commented", "Most Recommended"]
    };
  },
  beforeRouteEnter(_: any, from: any, next: any) {
    next((vm: any) => {
      vm.prevRoute = from
    })
  },
  methods: {
    popularity() {
      this.optionSelected = 'popularity'
      const popular = this.games.filter(x => x.popularity == true).sort((a: any, b: any) => b.score - a.score)
      const normal = this.games.filter(x => x.popularity == false).sort((a: any, b: any) => b.score - a.score)
      this.games = popular.concat(normal)
    },
    score() {
      this.optionSelected = 'score'
      this.games.sort((a: any, b: any) => a.ranked - b.ranked)
    },
    showfilterMethod() {
      this.optionSelected = 'filter'
      this.filter = !this.filter
    },
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        this.$router.back()
      }
    },
    handleSelectedOption() {
      this.optionSelected = undefined
      if (this.selectedOption == "Commented") {
        this.games.sort((a: any, b: any) => b.commentTotal - a.commentTotal)
      }
      else if (this.selectedOption == "Recommended") {
        this.games.sort((a: any, b: any) => b.recommendation - a.recommendation)
      }
    },
    filterMethodResult(obj: any) {
      const result = this.list.filter((game: any) => {
        const lista: Array<boolean> = []
        lista.push((obj.status.length == 0) ? true : obj.status.some((status: any) => {
          const findResult = game.status.filter((item) => {
            if (((item.value == 'On')? 'Online': 'Offline') == status) {
              return true
            }
          })
          if (findResult.length != 0) {
            return true
          }
        })
        )

        lista.push((obj.plataforms.length == 0 || obj.plataforms.includes("Other")) ? true : obj.plataforms.some((plataforms: any) => {
          const findResult = game.plataform.filter((item) => {
            if (item.value == plataforms) {
              return true
            }
          })
          if (findResult.length != 0) {
            return true
          }
        })
        )

        const gameTypeFilter = (obj.release === undefined) ? () => { return true; } : (release) => { 
          const currently_date = new Date()
          const year = currently_date.getFullYear();
          const month = String(currently_date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-based
          const day = String(currently_date.getDate()).padStart(2, '0');

          const formattedDate = `${year}-${month}-${day}`;
          if (release == "Other"){
            const result = `${obj.dateObj.year}-${obj.dateObj.month}-${obj.dateObj.day}`
            if (game.release == result) {
              return true
            }
          }
          else if(release == "Released") {
            if (game.release < formattedDate) {
              return true
            }
          }
          else if(release == "Didn't Release Yet") {
            if (game.release > formattedDate) {
              return true
            }
          }          
          return false
        };
        lista.push(gameTypeFilter(obj.release))


        lista.push((obj.studios.length == 0 || obj.studios.includes("Other")) ? true : obj.studios.some((studios: any) => {
          const findResult = game.studio.filter((item) => {
            if (item.value == studios) {
              return true
            }
          })
          if (findResult.length != 0) {
            return true
          }
        })
        )

        lista.push((obj.type.length == 0) ? true : obj.type.some((type: any) => {
          const findResult = game.gameType.filter((item) => {
            if (item.value == type) {
              return true
            }
          })
          if (findResult.length != 0) {
            return true
          }
        })
        )

        // lista.push((obj.perspective.length == 0 || obj.perspective.includes("Other")) ? true : obj.perspective.some((perspective: any) => {
        //   if (game.perspective.includes(perspective) == true) {
        //     return true
        //   }
        // })
        // )
        return (lista.includes(false)) ? false : true
      })
      this.games = result
      this.loading = 'Nothing to Render'
    }
  },
  mounted() {
    gameService.listAll().then(
      it => {
        this.games = it
        this.list = it
        if (it.length == 0){
          this.loading = 'Nothing to Render'
        }
      }
    ).catch((error) => {
      console.error(error);
    });      
  },
};

export default gameComponent;
