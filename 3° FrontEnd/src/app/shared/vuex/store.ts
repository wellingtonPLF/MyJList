import { createStore } from 'vuex';
import AuthReducer from './reducer/authReducer';
import GameReducer from './reducer/gameReducer';

const store = createStore({
  modules: {
    authReducer: AuthReducer,
    gameReducer: GameReducer
  }
});

export default store