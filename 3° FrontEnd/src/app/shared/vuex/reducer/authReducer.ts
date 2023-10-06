import { I_User } from "../../interfaces/I_User"
import AuthAction from "../action/authAction"

export const AUTH_INITIAL_STATE: I_User = {
  id: 0,
  note: '',
  nickname: "unknow",
  status: "unknow",
  joined: "--/--/--",
  sexuality: "M",
  friend: [],
  bornDate: "--/--/--",
  auth: 0,
  playing: 0,
  onHold: 0,
  planning: 0,
  dropped: 0,
  completed: 0,
  email: 'unknow',
  replayed: 0,
  hours: 0,
  userImage: 'https://as2.ftcdn.net/v2/jpg/05/51/70/53/500_F_551705397_bLnUIG0FP08qgPYSfAkRjVQcylIvwYDg.jpg',
  role: [{
     id: 0, roleName: ''
  }],
  game: {
    id: 0,
    gameImage: ''
  },
  nationality: { name: "Brazil", cod: "BR"},
  recommendations: 0
}

const AuthReducer = {
  namespaced: true,
  state: {
    auth: AUTH_INITIAL_STATE
  },
  mutations: {
    userLogin (state: any, payload: I_User) {
      state.auth = payload
    }
  },
  actions: AuthAction
}

export default AuthReducer