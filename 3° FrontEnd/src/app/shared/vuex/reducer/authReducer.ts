import { I_User } from "../../interfaces/I_User"
import AuthAction from "../action/authAction"

export const USER_COMMENT_NULLOBJ: any = {
  content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis unde voluptatibus sint velit, rem, illo quam sunt vero dolor quaerat exercitationem quo ratione. Culpa fugit magnam itaque consequuntur, nobis consequatur.",
  game: {id: 0, gameImage: 'https://assets-prd.ignimgs.com/2022/06/14/zelda-br…ld-1655249167687.jpg?width=300&crop=1%3A1%2Csmart'},
  id: 0,
  publication: "xxxx-xx-xx",
  user: {id: 0, nickname: 'Unknow', status: 'off', sexuality: 'M', userImage: "https://as2.ftcdn.net/v2/jpg/05/51/70/53/500_F_551705397_bLnUIG0FP08qgPYSfAkRjVQcylIvwYDg.jpg"},
  vote: "Premiation"
}

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
  favoriteGames: [
    { 
      id: 0, 
      game: { id: 0, gameImage: 'https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg'}
    },
    { 
      id: 0, 
      game: { id: 0, gameImage: 'https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg'}
    },
    { 
      id: 0, 
      game: { id: 0, gameImage: 'https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg'}
    },
    { 
      id: 0, 
      game: { id: 0, gameImage: 'https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg'}
    }
  ],
  lastUpdated: [
    { 
      id: 0, 
      game: { id: 0, gameImage: 'https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg'}
    },
    { 
      id: 0, 
      game: { id: 0, gameImage: 'https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg'}
    },
    { 
      id: 0, 
      game: { id: 0, gameImage: 'https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg'}
    },
    { 
      id: 0, 
      game: { id: 0, gameImage: 'https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg'}
    }
  ],
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