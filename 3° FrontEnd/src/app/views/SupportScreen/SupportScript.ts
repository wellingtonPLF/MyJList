import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue";

const supportComponent: any = {
  name: "SupportComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      options: [
        { icon: { type: 'far', value: 'envelope'}, description: 'Email Contact', border: true},
        { icon: { type: 'fas', value: 'comment-slash'}, description: 'Live Chat', border: false},
        { icon: { type: 'fas', value: 'text-slash'}, description: 'FAQ/Ticket', border: false}
      ]
    }
  },
  methods: {
    myFunction(value: number) {
      
    }
  },
  beforeMount() {
  }
};

export default supportComponent;
