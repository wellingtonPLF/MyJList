import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"
import { sexualityImg } from "../../shared/enums/sexualityImg.ts";
import userService from "../../shared/services/userService.ts"
import { USER_INITIAL_STATE } from "../../shared/solid/nullObject/_user.ts";

const aboutComponent: any = {
  name: "AboutComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      img_AboutView: `./assets/images/mystic.png`,
      img_Portfolio: `./assets/images/aliens.png`,
      users: [
        USER_INITIAL_STATE,
        USER_INITIAL_STATE,
        USER_INITIAL_STATE
      ] as any[],
      user: USER_INITIAL_STATE,
      imgType: sexualityImg,
    };
  },
  methods: {
    chooseUser(index: number): void {
      this.user = this.users[index], index
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
      it => {
        if (it != undefined) {
          this.users = it.filter((u) => {
            return u.role.some((i) => i.roleName === "ROLE_ADMIN")
          })
          if (this.users.length != 0) {
            this.user = this.users[0]
          }       
        }
      }
    )
  },
};

export default aboutComponent;
