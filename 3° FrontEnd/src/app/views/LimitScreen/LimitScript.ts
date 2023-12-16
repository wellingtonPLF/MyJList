
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue";

const limitComponent: any = {
  name: "LimitComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      request: true
    };
  },
  methods: {
    sendRequest() {
      this.request = false
    }
  },
  mounted() {
  },
};

export default limitComponent;
