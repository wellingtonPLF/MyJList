import { ActionContext } from "vuex/types/index.js";
import { I_Game } from "../../interfaces/I_Game";

const GameAction = {
    setGame ({ commit } : ActionContext<string, number>, game: I_Game) {
      commit('gameSelected', game)
    }
}

export default GameAction