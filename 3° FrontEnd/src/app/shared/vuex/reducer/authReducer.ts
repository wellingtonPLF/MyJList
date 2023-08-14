import { I_User } from "../../interfaces/I_User"
import AuthAction from "../action/authAction"

export const USER_INITIAL_STATE: I_User = {
  id: 0,
  nickName: "unknow",
  status: "unknow",
  joined: "--/--/--",
  nationality: "unknow",
  sex: "unknow",
  bornDate: "--/--/--",
  auth: 0
}

const AuthReducer = {
  namespaced: true,
  state: {
    user: USER_INITIAL_STATE
  },
  mutations: {
    userLogin (state: any, payload: I_User) {
      state.user = payload
    }
  },
  actions: AuthAction
}

export default AuthReducer