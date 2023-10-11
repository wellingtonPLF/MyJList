import GoBackComponent from "../../features/GoBack/GoBackComponent.vue"
import { I_User } from "../../../shared/interfaces/I_User";
import { PropType } from "vue";
import { mapState } from "vuex";

const profileComponent: any = {
  name: "ProfileComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      imgType: {
        male: "https://storage.prompt-hunt.workers.dev/clgrgds4b000qmh08559h5fk1_1",
        female: "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000"
      }
    };
  },
  computed: {
    ...mapState('authReducer', {
      auth: (state: any) => state.auth
    })
  },
  props: {
    obj: Object as PropType<I_User>
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
    friendRequest() {
      if (this.obj.user.id != 0) {
        if (this.obj.user.id == this.auth.id){
          console.log("Show Friend Requests")
        }
        else {
          console.log("Making a Request")
        }
      }
    },
    hoursMinutes(playtime: any){
      const hours_minutes_total = Math.round(playtime * 60)
      const hours = Math.floor(playtime)
      const hours_total = hours * 60
      const minutes = hours_minutes_total - hours_total
      return [hours, minutes]
    }
  }
};

export default profileComponent;
