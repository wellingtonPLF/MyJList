import { I_User } from "../../interfaces/I_User"
import { USER_INITIAL_STATE } from "../../solid/nullObject/_user"
import AuthAction from "../action/authAction"

const AuthReducer = {
  namespaced: true,
  state: {
    auth: USER_INITIAL_STATE
  },
  mutations: {
    userLogin (state: any, payload: I_User) {
      state.auth = payload
    }
  },
  actions: AuthAction
}

export default AuthReducer