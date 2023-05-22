import { ActionContext } from "vuex";
import { Valores } from "../../types/vuexTypes";

const SumAction = {
  calculateSub({ commit }: ActionContext<string, number>, { a, b }: Valores) {
    const sum: number = a + b;
    commit("soma", sum);
  },
};

export default SumAction;
