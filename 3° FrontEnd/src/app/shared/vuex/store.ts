import { createStore } from "vuex";
import SumReducer from './reducer/somaReducer'

const store = createStore({
  modules: {
    sumReducer: SumReducer,
  }
});

export default store