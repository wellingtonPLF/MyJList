import HeaderComponent from "./../../components/_main/Header/HeaderComponent.vue";
import gameService from "../../shared/services/gameService";
import { GAME_INITIAL_STATE } from "../../shared/solid/nullObject/_game";
import { RECOMMENDATION_INITIAL_STATE } from "../../shared/solid/nullObject/_recomendation";
import '@splidejs/splide/css';
import Splide from '@splidejs/splide';
import { Grid } from '@splidejs/splide-extension-grid';

interface Game {
  id: number;
  img: string;
  name: string;
  plataforms: string[];
  user: string;
  date: string;
  description: string;
}

const homeComponent: any = {
  name: "HomeComponent",
  components: {
    HeaderComponent
  },
  data() {
    return {
      games: [] as Game[],
      splide: undefined,
      enableSplideChange: true,
      grid: { perPage: 0, gap: 0, rows: 0, columns: 0},
      nullGames: [
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE
      ],
      expected: undefined,
      airing: undefined,
      releases: undefined,
      topRated: [
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE,
        GAME_INITIAL_STATE
      ],
      recomendations: [
        RECOMMENDATION_INITIAL_STATE,
        RECOMMENDATION_INITIAL_STATE,
        RECOMMENDATION_INITIAL_STATE,
        RECOMMENDATION_INITIAL_STATE,
        RECOMMENDATION_INITIAL_STATE
      ],
      options: [
        { icon: "gamepad", name: "Games", path: "/game", done: true },
        { icon: "video", name: "Trailers", path: "/", done: false },
        { icon: "user", name: "Users", path: "/users", done: true },
        { icon: "hand-holding-heart", name: "Premium", path: "/", done: false },
        { icon: "building", name: "Industry", path: "/", done: false },
        { icon: "headset", name: "Suport", path: "/", done: false }, //Contact Page
        { icon: "file-lines", name: "About", path: "/about", done: true }, //Staff e sobre Page
      ],
    };
  },
  methods: {
    changeExpected(value: string){
      if (value == 'release'){
        this.expected = this.releases
      }
      else {
        this.expected = this.airing
      }
    },
    changeSplide() {
      this.splide.destroy()
      this.setSplide()
    },
    setSplide() {
      if (window.innerWidth <= 800) {
        this.grid = { perPage: 2, gap: '2vw', rows: 3, columns: 1}
      }
      else {
        this.grid = { perPage: 7, gap: '1vw', rows: 0, columns: 0}
      }

      this.splide = new Splide('.splide', {
        type: 'loop',
        perPage: this.grid.perPage,
        perMove: 1,
        gap: this.grid.gap,
        grid: {
          rows: this.grid.rows,
          cols: this.grid.columns,
          gap : {
            row: '1rem',
            col: '1.5rem',
          },
        }
      }).mount( { Grid } );
    }
  },
  updated() {
    if (this.splide == undefined) {
      this.setSplide()
    }
    else {
      this.changeSplide()
    }
  },
  beforeMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 800 && this.enableSplideChange) {
        this.changeSplide()
        this.enableSplideChange = false
      }
      else if (window.innerWidth > 800 && !this.enableSplideChange) {
        this.changeSplide()
        this.enableSplideChange = true
      }
    })

    gameService.getAiring().then((it) => {
      this.airing = it;
    })
    .catch((error) => {
      console.error(error);
    });

    gameService.getReleases().then((it) => {
      this.releases = it;
      this.expected = it;      
    })
    .catch((error) => {
      this.expected = this.nullGames
      console.error(error);
    });

    gameService.getTopRated().then((it) => {
      this.topRated = it;
    })
    .catch((error) => {
      console.error(error);
    });

    gameService.getMostRecommended().then((it) => {
      this.recomendations = it;
    })
    .catch((error) => {
      console.error(error);
    });
  },
};

export default homeComponent;
