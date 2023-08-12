import { ActionContext } from "vuex/types/index.js";
import { I_User } from "../../interfaces/I_User";

const AuthAction = {
    setUser ({ commit } : ActionContext<string, number>, user: I_User) {
      commit('userLogin', user)
    }
}

export default AuthAction