import axios, { AxiosResponse } from "axios";

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
      users: [] as User[]
    };
  },
  mounted() {
    axios
      .get("jsons/users.json")
      .then((it: AxiosResponse<User[]>) => {
        this.users = it.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default userComponent;
