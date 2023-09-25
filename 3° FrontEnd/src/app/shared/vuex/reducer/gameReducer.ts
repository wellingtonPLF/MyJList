import { I_Game } from "../../interfaces/I_Game"
import GameAction from "../action/gameAction"

export const GAME_INITIAL_STATE: I_Game = {
    id: 0,
    score: 0,
    name: "unknow",
    ranked: "unknow",
    release: "unknow",
    premiede: "unknow",
    recommendations: 0,
    description: "...",
    popularity: "unknow",
    playTime: 0.0,
    source: "unknow",
    status: ["unknow", "unknow"],
    network: ["unknow"],
    producers: ["unknow"],
    perspective: ["unknow"],
    studios: ["unknow", "unknow"],
    themes: ["medieval", "gacha"],
    gameType: ["unknow","unknow","unknow"],
    plataforms: ["unknow","unknow","unknow"],
    languages: ["unknow", "unknow", "unknow"],
    achievements: ["unknow","unknow","unknow"],
    gameImage: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg",
    imgs: [
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"},
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"},
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"},
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"},
      {value: "https://img.freepik.com/fotos-premium/ilustracao-do-joystick-do-gamepad-do-controlador-de-jogos-cyberpunk_691560-5812.jpg"}
    ]
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