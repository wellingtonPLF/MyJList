import { PropType, toRaw } from "vue";
import gameService from "../../../shared/services/gameService";

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
      typeOfGames: [],
      studios: [],
      plataforms: [],
      choose: {
        type: [],
        status: [],
        release: undefined,
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
        release: undefined,
        studios: [],
        plataforms: [],
        perspective: [],
        dateObj: { year: '', month: '', day: ''}
      }
    },
    clearIt(param: any) {
      if (typeof(param) == typeof([])){
        param.splice(0,param.length)
      }
      else {
        this.choose.dateObj = { year: '', month: '', day: ''}
        this.choose.release = undefined
      }
    }
  },
  beforeMount() {
    gameService.getFilterData().then(
      it => {
        this.studios = it.studios
        this.typeOfGames = it.gameTypes
        this.plataforms = it.plataform
      }
    )
  },
};

export default filterComponent;
