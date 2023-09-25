import { ActionContext } from "vuex/types/index.js";
import { I_User } from "../../interfaces/I_User";

const AuthAction = {
    setAuth ({ commit } : ActionContext<string, number>, auth: I_User) {
      commit('userLogin', auth)
    }
}

export default AuthAction