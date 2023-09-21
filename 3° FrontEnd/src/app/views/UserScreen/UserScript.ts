import { mapActions } from "vuex";
import userService from "../../shared/services/userService";

interface User {
  id: number;
  img: string;
  name: string;
}

const userComponent: any = {
  name: "UserComponent",
  components: {},
  data() {
    return {
      users: [] as User[],
      imgType: {
        male: "https://img.freepik.com/fotos-premium/retrato-de-um-steampunk-punk-steampunk-man-the_158863-8544.jpg?w=2000",
        female: "https://i.etsystatic.com/39751258/r/il/aec535/4636273226/il_fullxfull.4636273226_6d7o.jpg"
      }
    };
  },
  
  methods: {
    ...mapActions('authReducer', ['setUser']),
    userChoice(user: any){
      this.setUser(user)
      window.scrollTo(0, 0);
    },
    goBack() {
      if (this.$router.options.history.state.back == null) {
        this.$router.push("/")
      }
      else {
        this.$router.back()
      }
    }
  },
  mounted() {
    userService.listAll().then(
      (it: any) => {
        this.users = it
        console.log(it)
      }
    ).catch((error) => {
      console.error(error);
    });      
  },
};

export default userComponent;
