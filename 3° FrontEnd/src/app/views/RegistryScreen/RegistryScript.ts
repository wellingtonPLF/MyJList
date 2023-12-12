import registryService from "../../shared/services/registryService";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue";
import { mapState } from "vuex";
import { noteEnum } from "../../shared/enums/noteEnum";
import { registryEnum } from "../../shared/enums/registryEnum";
import { colorEnum } from "../../shared/enums/colorEnum";
import tagService from "../../shared/services/tagService";

import { useRoute } from 'vue-router';
import { useQuery } from "vue-query";

const gameListComponent: any = {
  name: "GameListComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      registry: [],
      progressReponsive: "all",
      cssEffect: { obj: undefined, type: undefined},
      emptyList: 'Loading . . .',
      progress: 100
    };
  },
  computed: {
    ...mapState('authReducer', {
      auth: (state: any) => state.auth
    })
  },
  setup() {
    const route = useRoute();

    const { data } = useQuery('registry', async () => {
      const tags = await tagService.listAll()
      return await registryService.getRegistryByUserID(parseInt(`${route.params.id}`)).then(
        it => {
          it.map((registry: any) => {
            registry.tag = tags.filter((tag: any) => {
              return tag.id == registry.tag.id
            })[0]
          })
          it.sort((a:any, b:any) => (a.game.name > b.game.name ? -1 : 1)).reverse()
          return it
        }
      )
    })

    return { data }
  },
  watch: {
    data(value: any) {
      if (value.length == 0){
        this.emptyList = 'Nothing to Render'
      }
      this.registry = this.copyList(value)
    },
    progressReponsive() {
      this.filterBy(this.progressReponsive)
    }
  },
  methods: {
    hoursMinutes(playtime: any){
      const hours_minutes_total = Math.round(playtime * 60)
      const hours = Math.floor(playtime)
      const hours_total = hours * 60
      const minutes = hours_minutes_total - hours_total
      return [hours, minutes]
    },
    colorChoice(value: any){
      const progressKey = Object.keys(registryEnum).filter(key => registryEnum[key] === value)[0]
      return colorEnum[progressKey]
    },
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        this.$router.back()
      }
    },
    filterBy(value: string) {
      if (value == 'all') {
        this.registry = this.data
      }
      else {
        const result = this.data.filter( (item) => {return item.progress == value})
        if (result.length == 0){
          this.registry = undefined
        }
        else{
          this.registry = result
        }
      }
      this.emptyList = 'Nothing to Render'
    },
    copyList(lista: any) {
      return lista.map( (obj) => {
        const result = {...obj}
        result.tag = {...obj.tag}
        return result
      })
    },
    async updateGameCard(item: any, attr: any){
      let referenceRegistry: any = undefined
      const result = this.data.some((registry) => {
        if (registry.id == item.id){
          if (attr == 'tag') {
            return registry[attr].value == item[attr].value
          }
          if (registry[attr] != item[attr]){
            referenceRegistry = registry
          }
          return registry[attr] == item[attr]
        }
      })
      if (!result) {
        this.cssEffect = { obj: item, type: attr}
        const registry = {...item}
        const note = Object.keys(noteEnum).filter(key => noteEnum[key] === item.note)[0]
        const progress = Object.keys(registryEnum).filter(key => registryEnum[key] === item.progress)[0]
        registry.note = (item.note == 'Unknow') ? "" : ((progress === "Plan")? "" : note),
        registry.progress = progress
        
        try{
          const it = await registryService.update(registry)

          if (attr == 'note' || progress == "Plan"){
            referenceRegistry.note = it.note
            item.note = it.note
          }
          else if (attr == 'progress'){
            referenceRegistry.progress = it.progress
            item.progress = it.progress
          }
          else {
            referenceRegistry.tag = it.tag
            item.tag = it.tag
          }
          this.cssEffect = { obj: undefined, type: undefined }
        }
        catch(e) {
          this.cssEffect = { obj: undefined, type: undefined } 
        }
      }
    }
  }
};

export default gameListComponent;
