import GoBackComponent from "../../features/GoBack/GoBackComponent.vue"
import BarChartComponent from "../../features/BarChart/BarChartComponent.vue"
import LoaderComponent from "../../features/Loader/LoaderComponent.vue"
import { I_User } from "../../../shared/interfaces/I_User";
import { PropType } from "vue";
import { mapState } from "vuex";
import userService from "../../../shared/services/userService";
import { colorEnum } from "../../../shared/enums/colorEnum";
import { registryEnum } from "../../../shared/enums/registryEnum";
import { sexualityImg } from "../../../shared/enums/sexualityImg";
import { assetUser } from "../../../shared/solid/nullObject/_user";

const profileComponent: any = {
  name: "ProfileComponent",
  components: {
    GoBackComponent,
    BarChartComponent,
    LoaderComponent
  },
  data() {
    return {
      img_Profile: `${import.meta.env.VITE_HTTP}/assets/images/userBackground.png`,
      imgType: sexualityImg,
      graphicData: [],
      noUserImage: assetUser,
      total: 0,
      noteCapture: undefined
    };
  },
  computed: {
    ...mapState('authReducer', {
      auth: (state: any) => state.auth
    })
  },
  props: {
    obj: Object as PropType<I_User>,
    changeUserData: Function as PropType<(id: number) => void>
  },
  watch: {
    auth() {
      this.noteCapture = `${this.auth.note}`
    },
    obj(value) {
      this.graphicUse(value)
    }
  },
  beforeMount(){
    for (const property in colorEnum) {
      this.graphicData.push({ value: 0, color: colorEnum[property], type: property})
    }
    if (this.auth.id != 0) {
      this.graphicUse(this.auth)
    }
  },
  methods: {
    graphicUse(data: any){
      const lista = { PLAY: 'playing', COMPLETE: 'completed', HOLD: 'onHold', DROP: 'dropped', PLAN: 'planning', REPLAY: 'replayed' }
      const values: number[] = []
      let i = 0
      for (const property in registryEnum) {
        values.push(data[lista[property]])
      }
      this.total = values.reduce((a,b) => a + b)
      for (const value of values) {
        this.graphicData[i].value = value/this.total
        this.graphicData = [...this.graphicData]
        i++
      }
    },
    typeChoice(value: any){
      return registryEnum[value]
    },
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        this.$router.back()
      }
    },
    updateUser() {
      if (this.noteCapture != this.auth.note){
        this.obj.note = this.noteCapture
        userService.update(this.obj).then(
          _ => {
            console.log("Update Request (OK)!")
          }
        )
      }
    },
    friendRequest() {
      if (this.obj.id != 0) {
        if (this.obj.id == this.auth.id){
          console.log("Show Friend Requests")
        }
        else {
          this.auth.friend.push({id: this.obj.id})
            userService.update(this.auth).then(
              _ => {
                console.log("Friend Request (OK)!")
              }
          ).catch((e) => {
            console.log(e)
          })
        }
      }
    },
    hoursMinutes(playtime: any){
      const hours_minutes_total = Math.round(playtime * 60)
      const hours = Math.floor(playtime)
      const hours_total = hours * 60
      const minutes = hours_minutes_total - hours_total
      return [hours, minutes]
    },
    showFriend(id: number){
      this.$router.push(`/user/${id}/`)
      
      if (this.$route.name != 'profile'){
        this.changeUserData(id)
      }
    }
  }
};

export default profileComponent;
