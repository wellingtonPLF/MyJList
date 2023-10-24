import { PropType } from "vue";

const seeMoreComponent: any = {
  name: "SeeMoreComponent",
  data() {
    return {};
  },
  props: {
    moreResults: Function as PropType<() => void>
  },
  methods: {
    goToTop(){
      window.scrollTo(0, 0);
    }
  }
};

export default seeMoreComponent;
