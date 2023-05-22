import FilterAction from '../action/somaAction'

const INITIAL_STATE = 10

const SumReducer = {
  namespaced: true,
  state: {
    result: INITIAL_STATE
  },
  mutations: {
    soma (state: any, value: number) {
      state.result = value
    },
  },
  actions: FilterAction
}

export default SumReducer
