import GoBackComponent from "../../features/GoBack/GoBackComponent.vue"
import BarChartComponent from "../../features/BarChart/BarChartComponent.vue"
import { I_User } from "../../../shared/interfaces/I_User";
import { PropType } from "vue";
import { mapState } from "vuex";
import userService from "../../../shared/services/userService";
import { colorEnum } from "../../../shared/enums/colorEnum";
import { sexualityImg } from "../../../shared/enums/sexualityImg";

const profileComponent: any = {
  name: "ProfileComponent",
  components: {
    GoBackComponent,
    BarChartComponent
  },
  data() {
    return {
      imgType: sexualityImg,
      listaStatistics: ['Playing', 'Completed', 'OnHold', 'Dropped', 'Planning', 'Replayed'],
      graphicData: [],
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
    obj() {
      const total = this.listaStatistics.reduce((result, item) => {
        const indexAttr = this.listaStatistics.indexOf(item)
        const value = (this.obj[this.findAttr(indexAttr)] == undefined)? 
        0 : this.obj[this.findAttr(indexAttr)]
        return result + value
      }, 0)
      
      for (var i = 0; i < this.listaStatistics.length; i++) {
        const key = this.findAttr(i)
        const attr = (this.obj[key] == undefined)? 0 : this.obj[key]
        this.graphicData[i].value = (attr/total).toFixed(2)
      }
    }
  },
  beforeMount(){
    for (const property in colorEnum) {
      this.graphicData.push({ value: 0, color: colorEnum[property]})
    }
  },
  methods: {
    findAttr(index: number) {
      const result = (this.listaStatistics[index] == "OnHold")? 
      "onHold" : this.listaStatistics[index].toLowerCase()
      return result
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
