import FilterComponent from "../../components/dialogs/FilterDialog/FilterComponent.vue";
import { mapActions } from "vuex";
import { I_Game } from "../../shared/interfaces/I_Game";
import gameService from "../../shared/services/gameService";

const gameComponent: any = {
  name: "GameComponent",
  components: {
    FilterComponent
  },
  data() {
    return {
      list: [] as I_Game[],
      games: [] as I_Game[],
      prevRoute: undefined,
      filter: true,
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
    ...mapActions('gameReducer', ['setGame']),
    gameChoice(game: any) {
      this.setGame(game)
    },
    popularity() {
      this.games.sort((a: any, b: any) => b.favRank - a.favRank)
    },
    score() {
      this.games.sort((a: any, b: any) => b.score - a.score)
    },
    showfilterMethod() {
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
      if (this.selectedOption == "Commented") {
        this.games.sort((a: any, b: any) => b.comments - a.comments)
      }
      else if (this.selectedOption == "Recommended") {
        this.games.sort((a: any, b: any) => b.recommendations - a.recommendations)
      }
    },
    filterMethodResult(obj: any) {
      const result = this.list.filter((game: any) => {
        const lista: Array<Boolean> = []
        lista.push((obj.status.length == 0) ? true : obj.status.some((status: any) => {
          if (game.status.includes(status) == true) {
            return true
          }
        })
        )
        lista.push((obj.plataforms.length == 0 || obj.plataforms.includes("Other")) ? true : obj.plataforms.some((plataforms: any) => {
          if (game.plataforms.includes(plataforms) == true) {
            return true
          }
        })
        )
        lista.push((obj.release.length == 0) ? true : obj.release.some((release: any) => {
          if (game.release.includes(release) == true) {
            return true
          }
        })
        )
        lista.push((obj.perspective.length == 0 || obj.perspective.includes("Other")) ? true : obj.perspective.some((perspective: any) => {
          if (game.perspective.includes(perspective) == true) {
            return true
          }
        })
        )
        lista.push((obj.studios.length == 0 || obj.studios.includes("Other")) ? true : obj.studios.some((studios: any) => {
          if (game.studio.includes(studios) == true) {
            return true
          }
        })
        )
        lista.push((obj.type.length == 0) ? true : obj.type.some((type: any) => {
          if (game.type.includes(type) == true) {
            return true
          }
        })
        )
        return (lista.includes(false)) ? false : true
      })
      this.games = result
    }
  },
  mounted() {
    gameService.listAll().then(
      it => {
        this.games = it
        this.lsit = it
        console.log(it)
      }
    ).catch((error) => {
      console.error(error);
    });      
  },
};

export default gameComponent;
