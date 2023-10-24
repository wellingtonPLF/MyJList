import { sexualityImg } from "../../shared/enums/sexualityImg";
import userService from "../../shared/services/userService";
import { USER_INITIAL_STATE } from "../../shared/solid/nullObject/_user";
import GoBackComponent from "./../../components/features/GoBack/GoBackComponent.vue";

const userComponent: any = {
  name: "UserComponent",
  components: { GoBackComponent },
  data() {
    return {
      users: [
        USER_INITIAL_STATE,
        USER_INITIAL_STATE,
        USER_INITIAL_STATE
      ] as any[],
      imgType: sexualityImg,
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
