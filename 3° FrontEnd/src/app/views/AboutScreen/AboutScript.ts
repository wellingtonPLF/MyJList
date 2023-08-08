import axios, { AxiosResponse } from "axios";

const aboutComponent: any = {
  name: "AboutComponent",
  components: {},
  data() {
    return {
      users: [] as any[],
      user: {} as any,
      imgType: {
        male: "https://storage.prompt-hunt.workers.dev/clgrgds4b000qmh08559h5fk1_1",
        female: "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000"
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
    axios
      .get("jsons/users.json")
      .then((it: AxiosResponse<any[]>) => {
        this.users = it.data.slice(0,6);
        this.user = this.users[0]
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default aboutComponent;
