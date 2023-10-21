import GoBackComponent from "../../features/GoBack/GoBackComponent.vue"
import BarChartComponent from "../../features/BarChart/BarChartComponent.vue"
import { I_User } from "../../../shared/interfaces/I_User";
import { PropType } from "vue";
import { mapState } from "vuex";
import userService from "../../../shared/services/userService";

const profileComponent: any = {
  name: "ProfileComponent",
  components: {
    GoBackComponent,
    BarChartComponent
  },
  data() {
    return {
      imgType: {
        male: "https://cdn-uploads.gameblog.fr/img/news/429382_649d8426db22f.jpg",
        female: "https://cdn-uploads.gameblog.fr/img/news/427671_6482d11be2082.jpg"
      },
      graphicData: [
        {value: 0, color: '#39b339'},
        {value: 0, color: '#1f88ff'},
        {value: 0, color: 'yellow'},
        {value: 0, color: '#ff2e2e'},
        {value: 0, color: '#ff46ff'},
        {value: 0, color: '#1ee7be'},
      ],
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
      const lista = ['playing', 'completed', 'onHold', 'dropped', 'planning', 'replayed']
      const total = lista.reduce((result, item) => {
        return result + this.obj[item]
      }, 0)
      
      for (var i = 0; i < lista.length; i++) {
        this.graphicData[i].value = (this.obj[lista[i]]/total).toFixed(2)
      }
    }
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
