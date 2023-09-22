import { PropType, toRaw } from "vue";

const filterComponent: any = {
  name: 'FilterComponent',
  props: {
    filter: Function as PropType<(x: any) => void>,
    openClose: String,
    openClosefilter: Function as PropType<() => void>,
  },
  data() {
    return {
      showFilter: true,
      typeOfGames: [
        "RPG", "SHOOTER", "MMORPG", "RACE", "DANCE",
        "PUZZLE", "OPEN WORLD", "SURVIVAL", "SPORTS", "ADVENTURE",
        "STRATEGY", "PLATAFORM", "FIGHTHING", "MOBA",
        "SIMULATION", "ARCADE", "EDUCATIONAL", "CARD",
        "BATTLE ROYALE", "TURN BASED", "POINT AND CLICK",
        "MUSIC", "STEALTH", "SHOOT 'EM UP", "TEXT", "CASUAL"
      ],
      studios: [
        "Tencent", "Epic Games", "Blizzard", "Nintendo", "Microsoft", "Sony", "Other"
      ],
      plataforms: [
        "Xbox", "PC", "Playstation", "Nintendo", "Mobile", "Other"
      ],
      choose: {
        type: [],
        status: [],
        release: [],
        studios: [],
        plataforms: [],
        perspective: [],
        dateObj: { year: '', month: '', day: ''}
      }
    };
  },
  methods: {
    show() {
      this.openClosefilter()
    },
    apply(){
      this.filter(toRaw(this.choose))
    },
    clear(){
      this.choose = {
        type: [],
        status: [],
        release: [],
        studios: [],
        plataforms: [],
        perspective: [],
        dateObj: { year: '', month: '', day: ''}
      }
    },
    clearIt(param: any) {
      param.splice(0,param.length)
    }
  },
  mounted() { },
};

export default filterComponent;
