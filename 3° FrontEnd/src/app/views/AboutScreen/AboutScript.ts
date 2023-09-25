import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"
import userService from "../../shared/services/userService.ts"
import { AUTH_INITIAL_STATE } from "../../shared/vuex/reducer/authReducer.ts";

const aboutComponent: any = {
  name: "AboutComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      users: [] as any[],
      user: AUTH_INITIAL_STATE,
      imgType: {
        male: "https://cdn-uploads.gameblog.fr/img/news/429382_649d8426db22f.jpg",
        female: "https://cdn-uploads.gameblog.fr/img/news/427671_6482d11be2082.jpg"
      },
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
        console.log(it)
        this.users = it.filter((u) => {
          return u.role.some((i) => i.roleName === "ROLE_ADMIN")
        })
        if (this.users.length != 0) {
          this.user = this.users[0]
        }
      }
    )
  },
};

export default aboutComponent;
