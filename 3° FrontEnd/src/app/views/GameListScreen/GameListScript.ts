import registryService from "../../shared/services/registryService";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue";

const gameListComponent: any = {
  name: "GameListComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      registry: [] as any[],
      registryList: [] as any[],
      emptyList: 'Loading. . .',
      progress: 75
    };
  },
  methods: {
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
    registryService.listAll().then(
      it => {
        this.registry = it
        this.registryList = it
      }
    )
  },
};

export default gameListComponent;
