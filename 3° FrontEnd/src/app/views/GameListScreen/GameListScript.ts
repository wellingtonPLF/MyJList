import registryService from "../../shared/services/registryService";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue";
import { mapState } from "vuex";

const gameListComponent: any = {
  name: "GameListComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      registry: [] as any[],
      registryList: [] as any[],
      emptyList: 'Loading . . .',
      progress: 100,
      colors: [
        { completed: 'rgb(215 17 236)'},
        { playing: 'rgb(50 222 14)'},
        { replaying: '#0ed8d8'},
        { planning: '#878c95'},
        { dropped: '#f00000'},
        { onHold: '#f7d614'}
      ]
    };
  },
  computed: {
    ...mapState('authReducer', {
      auth: (state: any) => state.auth
    })
  },
  methods: {
    hoursMinutes(playtime: any){
      const hours_minutes_total = Math.round(playtime * 60)
      const hours = Math.floor(playtime)
      const hours_total = hours * 60
      const minutes = hours_minutes_total - hours_total
      return [hours, minutes]
    },
    colorChoice(key: any){
      if (key == 'plan to play') {
        return this.colors.find(obj => 'planning' in obj)['planning']
      }
      else if (key == 'on-hold'){
        return this.colors.find(obj => 'onHold' in obj)['onHold']
      }
      else {
        return this.colors.find(obj => `${key}` in obj)[`${key}`]
      }
    },
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        this.$router.back()
      }
    },
    okL(){
      console.log(this.valor)
    },
    filterBy(value: string) {
      if (value == 'all') {
        this.registry = this.registryList
      }
      else {
        this.registry = this.registryList.filter( (item) => {return item.progress == value})
      }
      this.emptyList = 'Nothing to Render'
    }
  },
  mounted() {
    registryService.getRegistryByUserID(this.$route.params.id).then(
      it => {
        this.registry = it
        this.registryList = it
        if (it.length == 0){
          this.emptyList = 'Nothing to Render'
        }
      }
    )
  },
};

export default gameListComponent;
