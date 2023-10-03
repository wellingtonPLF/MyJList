import { I_Game } from "../../interfaces/I_Game"
import GameAction from "../action/gameAction"

export const GAME_INITIAL_STATE: I_Game = {
    id: 0,
    score: 0,
    name: "unknow",
    ranked: "",
    release: "unknow",
    premiede: "unknow",
    recommendation: 0,
    description: "Loading. . .",
    popularity: "unknow",
    playTime: 0.0,
    source: "unknow",
    status: ["unknow", "unknow"],
    network: ["unknow"],
    perspective: ["unknow"],
    languages: ["unknow", "unknow", "unknow"],
    gameType: undefined,
    plataform: [{value: undefined}],
    studio: [{value: undefined}],
    theme: [{value: undefined}],
    producer: [{value: undefined}],
    achievements: [{value: undefined}],
    gameImage: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg",
    imgs: [
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"},
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"},
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"},
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"},
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"}
    ]
}

export const RECOMMENDATION_INITIAL_STATE = {
  id: 0,
  publication: 'xxxx-xx-xx',
  content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam iure aut rem delectus sunt accusantium nulla iste suscipit! Alias, dicta? Mollitia, quis necessitatibus consectetur dolor recusandae nihil unde fugiat ab?',
  game: {
    gameImage: 'https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg',
    id: 0
  },
  user: {
    id: 0,
    nickname: 'Unknow',
    sexuality: undefined,
    status: undefined,
    userImage: undefined
  },
  vote: undefined
}

const GameReducer = {
  namespaced: true,
  state: {
    game: GAME_INITIAL_STATE
  },
  mutations: {
    gameSelected (state: any, payload: I_Game) {
      state.game = payload
    }
  },
  actions: GameAction
}

export default GameReducer