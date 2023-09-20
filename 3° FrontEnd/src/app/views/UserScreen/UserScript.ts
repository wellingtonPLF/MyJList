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
        male: "https://storage.prompt-hunt.workers.dev/clgrgds4b000qmh08559h5fk1_1",
        female: "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000"
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
