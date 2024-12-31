import { PropType, toRaw } from "vue";
import gameService from "../../../shared/services/gameService";

import { useQuery } from "vue-query";

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
      data: undefined,
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
    const result = useQuery('releases', async () => {
      return await gameService.getFilterData()
    }) 

    if (result) {
      const { data } = result
      this.data = data; 
    }
  },
};

export default filterComponent;
