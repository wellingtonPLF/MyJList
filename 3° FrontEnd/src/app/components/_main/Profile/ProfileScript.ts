import GoBackComponent from "../../features/GoBack/GoBackComponent.vue"
import { I_User } from "../../../shared/interfaces/I_User";
import { PropType } from "vue";

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
  props: {
    obj: Object as PropType<I_User>
  },
  methods: {
    show(){
      console.log(this.user, "asdasdasdad")
      console.log(this.obj.user)
    },  
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        this.$router.back()
      }
    }
  }
};

export default profileComponent;
