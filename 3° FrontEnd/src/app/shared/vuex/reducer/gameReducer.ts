import { I_Game } from "../../interfaces/I_Game"
import GameAction from "../action/gameAction"

export const GAME_INITIAL_STATE: I_Game = {
    id: 0,
    img: "https://static.gamevicio.com/imagens_up/big/82/high-on-life-jogo-do-criador-de-rick-and-morty-ganha-25-minutos-de-gameplay-081951.jpg",
    name: "unknow",
    plataforms: ["unknow","unknow","unknow"],
    status: ["unknow"],
    type: ["unknow","unknow","unknow"],
    perspective: ["unknow"],
    studio: "unknow",
    ranked: "unknow",
    languages: "unknow",
    popularity: "unknow",
    achievements: ["unknow","unknow","unknow"],
    release: "unknow",
    date: "unknow",
    score: 0,
    premiede: "unknow",
    producers: ["unknow"],
    recommendations: 0,
    comments: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eveniet quibusdam facere aspernatur similique amet, inventore dolore magni a adipisci veritatis incidunt! Dolorem quis consectetur voluptates vel optio, nam tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eveniet quibusdam facere aspernatur similique amet, inventore dolore magni a adipisci veritatis incidunt! Dolorem quis consectetur voluptates vel optio, nam tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eveniet quibusdam facere aspernatur similique amet, inventore dolore magni a adipisci veritatis incidunt! Dolorem quis consectetur voluptates vel optio, nam tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eveniet quibusdam facere aspernatur similique amet, inventore dolore magni a adipisci veritatis incidunt! Dolorem quis consectetur voluptates vel optio, nam tempora.",
    choice: "unknow",
    network: ["unknow"],
    time: "87m",
    source: "unknow",
    themes: ["medieval", "gacha"],
    systemRequirements: ["unknow"]
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