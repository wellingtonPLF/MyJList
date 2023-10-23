import userService from "../../shared/services/userService";
import { AUTH_INITIAL_STATE } from "../../shared/vuex/reducer/authReducer";
import GoBackComponent from "./../../components/features/GoBack/GoBackComponent.vue";

const userComponent: any = {
  name: "UserComponent",
  components: { GoBackComponent },
  data() {
    return {
      users: [
        AUTH_INITIAL_STATE,
        AUTH_INITIAL_STATE,
        AUTH_INITIAL_STATE
      ] as any[],
      imgType: {
        male: "https://cdn-uploads.gameblog.fr/img/news/429382_649d8426db22f.jpg",
        female: "https://cdn-uploads.gameblog.fr/img/news/427671_6482d11be2082.jpg"
      },
      userNick: { nickname: undefined}
      
    };
  },
  methods: {
    userListRequest() {
      userService.listAll().then(
        (it: any) => {
          this.users = it
        }
      ).catch((error) => {
        console.error(error);
      });   
    },
    async searchUser(event) {
      if (event.keyCode === 8) {
        if (this.userNick.nickname == '') {
          this.userListRequest()
        }
      }
      if (event.keyCode != 16 && event.keyCode != 36) {
        if (this.userNick.nickname != undefined && this.userNick.nickname != "") {
          try {
            this.users = await userService.searchUser(this.userNick)
          }
          catch(_) {}
        }
      }
      
    }
  },
  mounted() {
    this.userListRequest()
  },
};

export default userComponent;
