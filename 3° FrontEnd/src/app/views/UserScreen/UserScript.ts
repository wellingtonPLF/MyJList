import { mapActions } from "vuex";
import userService from "../../shared/services/userService";
import GoBackComponent from "./../../components/features/GoBack/GoBackComponent.vue";

interface User {
  id: number;
  img: string;
  name: string;
}

const userComponent: any = {
  name: "UserComponent",
  components: { GoBackComponent },
  data() {
    return {
      users: [] as User[],
      imgType: {
        male: "https://cdn-uploads.gameblog.fr/img/news/429382_649d8426db22f.jpg",
        female: "https://cdn-uploads.gameblog.fr/img/news/427671_6482d11be2082.jpg"
      }
    };
  },
  
  methods: {
    ...mapActions('authReducer', ['setUser']),
    userChoice(user: any){
      this.setUser(user)
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    userService.listAll().then(
      (it: any) => {
        this.users = it
      }
    ).catch((error) => {
      console.error(error);
    });      
  },
};

export default userComponent;
